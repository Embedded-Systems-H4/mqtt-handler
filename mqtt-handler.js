// mqtt-client.js
require('dotenv').config();

const mqtt = require('mqtt');

const mqttHost = 'mqtt-broker'; // Replace with your MQTT broker's hostname or IP address
const mqttPort = process.env.SECURE_PORT;
const mqttUsername = process.env.USERNAME;
const mqttPassword = process.env.PASSWORD;

const client = mqtt.connect(`mqtt://${mqttHost}`, {
  port: mqttPort,
  username: mqttUsername,
  password: mqttPassword
});

// Example: Subscribe to a topic
client.subscribe('test/topic', function (err) {
  if (!err) {
    console.log('Connected to MQTT broker and subscribed to "test/topic"');
  }
});

// Handle incoming messages
client.on('message', function (topic, message) {
  console.log(`Received message on topic "${topic}": ${message.toString()}`);
});
