import { saveDevice } from "./database/saveDevice";
import { Device } from "./models/Device";

export const topicHandler = async ({ topic, message }: { topic: string, message: string }) => {
    const action = {
        "devices/register": async () => {
            console.log(JSON.parse(message))
            // const device: Device = JSON.parse();
            // return await saveDevice({
            //     id: device?.id,
            //     name: device?.name,
            //     type: device?.type
            // });
        }
    }[topic];

    const result = await action()

    console.log(result)
};
