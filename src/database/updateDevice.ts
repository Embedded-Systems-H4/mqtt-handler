import { Device } from "../models/Device"
import { database } from "./index"
export const updateDevice = async ({
    id,
    name,
    type
}: Device) => {
    const db = database("MAIN")
    const deviceCollection = db.collection("devices")
    const deviceId = id

    try {
        await deviceCollection.updateOne({ "id": deviceId },
            {
                $set: {
                    "id": deviceId,
                    ...(typeof name === "string" && { "name": name }),
                    ...(typeof type === "string" && { "type": type }),
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