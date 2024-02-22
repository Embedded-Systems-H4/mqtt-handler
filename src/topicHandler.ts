import { saveLog } from "./database/saveLog";
import { updateDevice } from "./database/updateDevice";
import { verifyAccess } from "./database/verifyAccess";
import { publishToMQTT } from "./mqttPublishHandler";

export const topicHandler = async ({ topic, message }: { topic: string, message: string }) => {
    (async () => {
        switch (topic) {
            case "devices/register": {
                const { deviceId, deviceName, deviceType } = JSON.parse(message);
                const log = await saveLog({
                    type: "device_register",
                    deviceId: deviceId,
                    timestamp: new Date()
                })
                return updateDevice({ id: deviceId, name: deviceName, type: deviceType });
            }
            case "devices/access": {
                const { deviceId, cardId } = JSON.parse(message);
                const profileHasAccess = await verifyAccess({
                    cardId,
                    deviceId
                })
                await saveLog({
                    type: "device_access_update",
                    cardId: cardId,
                    deviceId: deviceId,
                    access: profileHasAccess ? "approved" : "denied",
                    timestamp: new Date()
                })
                return publishToMQTT(
                    {
                        topic: "devices/accessupdate",
                        message: `${deviceId},${cardId},${profileHasAccess}`
                    }
                )
            }
        }
    })();
};
