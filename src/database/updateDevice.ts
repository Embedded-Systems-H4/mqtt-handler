import { Device } from "../models/Device"
import { database } from "./index"
export const updateDevice = async ({
    id,
    name,
    type,
    user
}: Device) => {
    const db = database("MAIN")
    const deviceCollection = db.collection("devices")
    const deviceId = id

    try {
        await deviceCollection.updateOne({ "deviceId": deviceId },
            {
                $set: {
                    "deviceId": deviceId,
                    ...(typeof name === "string" && { "name": name }),
                    ...(typeof type === "string" && { "type": type }),
                    ...(typeof user === "object" && { "user": user }),
                    "lastUpdatedAt": new Date()
                }
            },
            {
                upsert: true
            }
        )
    } catch (error) {
        console.log(error)
    }
}