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
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    setInterval(() => {
        const message = 'TEST DOCKER';
        client.publish('test/topic', message);
        console.log(`Published: ${message}`);
    }, 4000);
});
client.on('error', (error) => {
    console.error('MQTT Error:', error);
});
process.on('SIGINT', () => {
    client.end();
    console.log('MQTT Publisher stopped');
    process.exit();
});
