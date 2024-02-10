const mysql = require('mysql');
const mqtt = require('mqtt');

const MYSQL_HOST = 'db';
const MYSQL_USER = 'mysqlitto';
const MYSQL_PSWD = 'osa00NET';
const MYSQL_DB = 'mysqlitto';

const LOOKUP_TABLE = 'devices';
const LOOKUP_FIELD = 'device';
const LOOKUP_RESULT = 'id';
const DATA_TABLE = 'measures';
const DATA_FIELD = 'device';

const MQTT_HOST = 'mqtt';
const MQTT_PORT = 1883;
const MQTT_CLIENT = 'mysqlitto';
const MQTT_USER = 'mysqlitto';
const MQTT_PSWD = 'osa00NET';
const MQTT_SUB = '/devices/+/state';

let db = mysql.createPool({
  connectionLimit: 2,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PSWD,
  database: MYSQL_DB
});

function objIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function db_insert(device, payload) {
  try {
    const obj = JSON.parse(payload);

    if (! objIsEmpty(obj)) {
      db.query('SELECT ?? FROM ?? WHERE ??=?', [LOOKUP_RESULT, LOOKUP_TABLE, LOOKUP_FIELD, device], (err, results) => {
        if (err) {
          console.log(err.name + ': ' + err.message);
          return;
        }
        if (results.length) {
          const lookup_id = results[0][LOOKUP_RESULT];
          let ins = {};

          db.query('SHOW COLUMNS FROM ??', DATA_TABLE, (err, results) => {
            if (err) {
              console.log(err.name + ': ' + err.message);
	      return;
            }
            for (let i = 0; i < results.length; ++i) {
              const row = results[i];

              if (row['Field'] in obj) {
                ins[row['Field']] = obj[row['Field']];
              }
    	    }
            if (! objIsEmpty(ins)) {
    	      ins[DATA_FIELD] = lookup_id;
              db.query('INSERT INTO ?? SET ?', [DATA_TABLE, ins], (err, results) => {
                if (err) {
                  console.log(err.name + ': ' + err.message);
                  return;
                }
                console.log('MQTT data stored to MySQL');
              });
    	    }
          });
        }
      });
    }
  } catch(e) {
    console.log(e.name + ': ' + e.message);
  }
}

let client = mqtt.connect({
    host: MQTT_HOST,
    port: MQTT_PORT,
    clientId: MQTT_CLIENT,
    username: MQTT_USER,
    password: MQTT_PSWD
});

client.on('connect', () => {
    client.subscribe(MQTT_SUB, (err) => {
        if (err) {
            console.log(err.name + ': ' + err.message);
        }
        console.log('MySQLitto connected to MQTT broker');
    });
});

client.on('message', (topic, message) => {
    db_insert(topic.slice(-12, -6).toUpperCase(), message);
});

/*
client.on('error', (err) => {
    console.log(err.name + ': ' + err.message);
});
*/

console.log('MySQLitto started');
