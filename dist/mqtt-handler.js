"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt = require("mqtt");
const mqttHost = 'mqtt-broker';
const mqttPort = process.env.PORT;
const mqttUsername = process.env.USERNAME;
const mqttPassword = process.env.PASSWORD;
const client = mqtt.connect(`mqtt://${mqttHost}`, {
    port: parseInt(mqttPort),
    username: mqttUsername,
    password: mqttPassword
});
client.subscribe('test/topic', function (err) {
    if (!err) {
        console.log('Connected to MQTT broker and subscribed to "test/topic"');
    }
});
client.on('message', function (topic, message) {
    console.log(`Received message on topic "${topic}": ${message.toString()}`);
});
