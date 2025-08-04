

const mqtt = require('mqtt');
const crypto = require('crypto');

const MQTT_BROKER_URL = 'mqtts://otplai.com:8883';
const MQTT_OPTIONS = {
    username: 'oyt',
    password: '123456789',
};

// const DEVICE_IDS = ["A085E3F17FF0", "348518941934"];
// const API_URL = 'http://otplai.com:4004/api/create_data';
const Api_data = `https://temperature-humidity-datalogger-api.otplai.com/api/getDevice`
const API_URL = `https://temperature-humidity-datalogger-api.otplai.com/api/add_Info`;

const Main_fun = () => {

    // Connect to MQTT broker once
    const client = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);

    // On connect, subscribe to all device topics
    client.on('connect', async () => {
        console.log(' Connected to MQTT broker');

        const url = await fetch(Api_data, {
            method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                devicename: "all"
            })
        })

        const DEVICE_IDS = await url.json();

        DEVICE_IDS.forEach((id) => {
            // console.log(id)
            const topic = `am_sensor/${id.deviceid}/RX`;
            client.subscribe(topic, (err) => {
                if (err) {
                    console.error(` Subscription error for ${topic}:`, err);
                } else {
                    console.log(` Subscribed to topic: ${topic}`);
                }
            });
        });
    });

    // On receiving a message
    client.on('message', async (topic, message) => {
        try {
            const data = JSON.parse(message.toString());
            const deviceId = topic.split('/')[1]; // Extract device ID from topic

            const payload = {
                id: crypto.randomUUID(),
                devicename: '',
                device_id: deviceId,
                Temp: data.temperature || '098098',
                hume: data.humidity || '098098',
                pm: '098098',
            };

            console.log(' Received MQTT data:', payload);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.text();
            console.log(' API response:', result);
        } catch (error) {
            console.error(' Error processing MQTT message or API call:', error);
        }
    });

    client.on('error', (err) => {
        console.error('âŒ MQTT error:', err);
    });

    client.on('close', () => {
        console.log(' Disconnected from MQTT broker');
    });


}

Main_fun();
setInterval(() => {
    Main_fun();
}, 1000 * 60 * 2)