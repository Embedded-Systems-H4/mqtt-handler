import { config } from "dotenv";
import { IClientOptions, connect } from "mqtt";
config();

export const publishToMQTT = ({ topic, message }: { topic: string; message: string; }) => {
  const options: IClientOptions = {
    host: process.env.MQTT_HOST,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: "handler-publish",
    port: parseInt(process.env.MQTT_PORT as string),
    protocol: "mqtt"
  };

  const client = connect(options);

  client.on('error', (error) => {
    console.log(options);
    console.log('MQTT error:', error);
  });

  client.on("connect", () => {
    console.log('Connected to MQTT broker');

    client.publish(topic, message, (err) => {
      if (err) {
        console.error('Publish error:', err);
      } else {
        console.log(`Published to ${topic}: ${message}`);
      }

      client.end();
    });
  });
}
