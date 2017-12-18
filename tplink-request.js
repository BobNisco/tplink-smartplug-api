const net = require('net');

const { encrypt, decrypt } = require('./encryption');

const defaultPort = 9999;
const defaultTimeoutMs = 3000;

const tplinkRequest = async ({
  ip,
  payload,
  port = defaultPort,
  timeoutMs = defaultTimeoutMs
} = {}) => {
  const resultFromSocket = await new Promise((resolve, reject) => {
    try {
      let result = '';

      const client = net.createConnection({ port, host: ip });
      client.setTimeout(timeoutMs);

      client
        .on('connect', () => client.write(Buffer.from(encrypt(payload), 'ascii')))
        .on('error', err => reject(err))
        .on('data', data => (result += decrypt(data.toString('ascii').slice(4))))
        .on('end', () => resolve(result))
        .on('timeout', () => {
          reject(`${ip} timed out after ${timeoutMs}ms`);
          client.destroy();
        });
    } catch (e) {
      reject(e);
    }
  });

  return resultFromSocket;
};

module.exports = tplinkRequest;
