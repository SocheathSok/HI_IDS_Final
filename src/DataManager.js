import { BleManager, Characteristic } from 'react-native-ble-plx'
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
        this.storage = []
        this.scanAndConnect()
    }

    scanAndConnect() {
        const permission = this.requestBluetoothPermission()
        if (permission) {
            this.bluetoothManager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    console.log(error)
                    return
                }
                ///Check for specific device and connect
                if (device.id == "E5:EB:28:02:B7:85") {
                    this.bluetoothManager.stopDeviceScan()
                    device.connect().then((device) => {
                        console.log("Connecting to device...")
                        return device.discoverAllServicesAndCharacteristics()
                    }).then(device => {
                        return device.services()
                    }).then(services => {
                        return services[services.length - 1]
                    }).then(service => {
                        return service.characteristics()
                    }).then(characteristics => {
                        characteristics[characteristics.length - 1].monitor((err, characteristic) => {
                            const buf = Buffer.from(characteristic.value, 'base64')
                            this.storage.push(buf.readInt8())
                        })
                    })
                }

            })
        }
    }

    

    async requestBluetoothPermission() {
        try {
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
                title: "Location Permission for bluetooth scanning",
                message: "*Insert Message here*",
                buttonNegative: 'Bug me later',
                buttonNeutral: "Hell nah",
                buttonPositive: "My soul is your"
            })

            if (permission == PermissionsAndroid.RESULTS.GRANTED) {
                console.log("We got in boyz")
                return true
            } else {
                console.log("LET US IN!!!!")
                return false
            }
        } catch (error) {
            Console.log(error)
            return false
        }

    }


}