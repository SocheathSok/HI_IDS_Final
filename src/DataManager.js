import { BleManager } from 'react-native-ble-plx'
import { PermissionsAndroid } from 'react-native'

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

        this.bluetoothManager.onStateChange((newState) => {
            console.log(newState)
        })
        this.scanNearbyDevice()
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