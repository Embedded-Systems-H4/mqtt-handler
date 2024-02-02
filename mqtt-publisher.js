require('dotenv').config();

const mqtt = require('mqtt');

const mqttHost = 'mqtt-broker';
const mqttPort = process.env.SECURE_PORT;
const mqttUsername = process.env.USERNAME;
const mqttPassword = process.env.PASSWORD;

const client = mqtt.connect(`mqtt://${mqttHost}`, {
  port: mqttPort,
  username: mqttUsername,
  password: mqttPassword
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  setInterval(() => {
    const message = 'TEST DOCKER';
    client.publish('test/topic', message);
    console.log(`Published: ${message}`);
  }, 1000);
});

client.on('error', (error) => {
  console.error('MQTT Error:', error);
});

process.on('SIGINT', () => {
  client.end();
  console.log('MQTT Publisher stopped');
  process.exit();
});
