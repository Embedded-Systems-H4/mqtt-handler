import { Device } from "../models/Device"
import { database } from "./index"
export const updateDevice = async ({
    id: deviceId,
    name: deviceName,
    type: deviceType
}: Device) => {
    const db = database("MAIN")
    const deviceCollection = db.collection("devices")

    try {
        const query = await deviceCollection.updateOne({ "id": deviceId },
            {
                $set: {
                    "id": deviceId,
                    ...(typeof deviceName === "string" && { "name": deviceName }),
                    ...(typeof deviceType === "string" && { "type": deviceType }),
                    "lastUpdatedAt": new Date()
                }
            },
            {
                upsert: true
            }
        )

        console.log(query)
    } catch (error) {
        console.log(error)
    }
}