import { BleManager } from 'react-native-ble-plx'
import { PermissionsAndroid } from 'react-native'
global.Buffer = global.Buffer || require('buffer').Buffer

export default class DataManager {
    static instance = null
    static getInstance() {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager()
        }
        return DataManager.instance
    }

    constructor() {
        this.bluetoothManager = new BleManager();
        this.storage = [0, 1]
        const stateReactor = this.bluetoothManager.onStateChange((state) => {
            if (state == "PoweredOn") {
                this.scanAndConnect()
            } else {
                this.bluetoothManager.stopDeviceScan()
            }
        }, true)

    }

    scanAndConnect() {
        this.requestBluetoothPermission().then(permission => {
            if (permission) {
                console.log("Scanning for compatible device...")
                this.bluetoothManager.startDeviceScan(null, null, (error, device) => {
                    if (error) {
                        console.log(error)
                        return
                    }
                    ///Check for specific device and connect
                    if (device.id == "E5:EB:28:02:B7:85") {

                        console.log("Compatible device found.")
                        this.bluetoothManager.stopDeviceScan()

                        device.onDisconnected((err, device) => {
                            console.log("Device disconnected.")
                            device.cancelConnection()
                            this.scanAndConnect()

                        })
                        device.connect()
                            .then((device) => {
                                if (device) {
                                    console.log('Succesfully connected to compatible device.')
                                    return device.discoverAllServicesAndCharacteristics()
                                }
                            })
                            .then(device => {
                                if (device)
                                    return device.services()
                            })
                            .then(services => {
                                if (services)
                                    return services[services.length - 1]
                            })
                            .then(service => {
                                if (service)
                                    return service.characteristics()
                            })
                            .then(characteristics => {
                                if (characteristics)
                                    characteristics[characteristics.length - 1].monitor((err, characteristic) => {
                                        if (characteristic && characteristic.value) {
                                            const buf = Buffer.from(characteristic.value, 'base64')
                                            this.storage.push(buf.readInt8())
                                        }

                                    })
                            }).catch(err => {
                                console.log("Connecting problem...")
                                device.cancelConnection()
                            })
                    }

                })
            }
        })

    }

    requestBluetoothPermission() {
        console.log("Checking Permission...")
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
            title: "HI-IDS Coarse Location Permission",
            message: "HI-IDS requires coarse location to access bluetooth device",
            buttonNegative: 'Cancel',
            buttonNeutral: "Ask Me Later",
            buttonPositive: "OK"
        }).then(permissionStatus => {
            if (permissionStatus == 'granted') {
                console.log("Permission granted.")
                return true
            } else {
                console.log("Permission denied.")
                return false
            }
        }).catch(err => {
            console.error(err)
        })

    }

}