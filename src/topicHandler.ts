import { updateDevice } from "./database/updateDevice";

export const topicHandler = async ({ topic, message }: { topic: string, message: string }) => {
    (() => {
        switch (topic) {
            case "devices/register": {
                const { id, name, type } = JSON.parse(message);
                return updateDevice({ id, name, type });
            }
            case "devices/heartbeat": {
                console.log(message);
                break;
            }
            // Add more cases as needed for other topics
            default:
                console.log("Unknown topic");
        }
    })();
};
