import { Device } from "../models/Device"
import { database } from "./index"
export const saveDevice = async ({
    id,
    name,
    type
}: Device) => {
    const db = database("MAIN")
    const deviceCollection = db.collection("devices")
    const deviceId = id
    try {
        await deviceCollection.updateOne({deviceId: deviceId}, {
            "deviceId": deviceId,
            "name": name,
            "type": type
        })
    } catch (error) {
        console.log(error)
    }
}