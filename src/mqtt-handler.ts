import { config } from "dotenv";
import { IClientOptions, connect } from "mqtt";
import { topicHandler } from "./topicHandler";
config();


const options: IClientOptions = {
  host: process.env.MQTT_HOST,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  port: parseInt(process.env.MQTT_PORT as string),
  protocol: "mqtt",
  clean: true,
};

console.log(options)

const client = connect(options);

client.on('error', (error) => {
  console.error('MQTT error:', error);
});

client.on("connect", () => {
  console.log('Connected to MQTT broker');
  client.subscribe('#', function (err) {
    if (!err) {
      console.log('Subscribed to all topics');
    } else {
      console.error('Subscription error:', err);
    }
  });
})

client.on('message', function (topic, message) {
  topicHandler({
    topic,
    message: message.toString()
  })
});