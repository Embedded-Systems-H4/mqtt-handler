import { updateDevice } from "./database/updateDevice";
import { Device } from "./models/Device";

export const topicHandler = async ({ topic, message }: { topic: string, message: string }) => {
    const action = {
        "devices/register": async () => {
            const { id, name, type }: Device = JSON.parse(message)
            return await updateDevice({
                id,
                name,
                type
            });
        }
        
        // "devices/link": async () => {
        //     const { id, name, type, user }: Device = JSON.parse(message)
        //     await updateDevice({
        //         id,
        //         name,
        //         type,
        //         user
        //     });
        // },

        // "devices/suspend": async () => {
        //     const { id, status }: Device = JSON.parse(message)
        //     await updateDevice({
        //         id,
        //         status
        //     });
        // },

        // "devices/status": async () => {
        //     const { id, name, type }: Device = JSON.parse(message)
        //     await updateDevice({
        //         id,
        //         name,
        //         type
        //     });
        // },
    }[topic];

    action();
};
