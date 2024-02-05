import { config } from "dotenv";
import {topicHandler} from "./topicHandler"
import { IClientOptions, connect } from "mqtt";
config();


const options: IClientOptions = {
  host: "127.0.0.1",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT as string),
  protocol: "mqtt",
  clean: true,
};

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