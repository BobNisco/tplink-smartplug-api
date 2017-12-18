const net = require('net');

const { encrypt, decrypt } = require('./encryption');

/**
 * The default port used by TP-Link Smartplugs
 * @type {Number}
 */
const defaultPort = 9999;

/**
 * The default timeout in milliseconds
 * @type {Number}
 */
const defaultTimeoutMs = 3000;

/**
 * Makes a request to a TP-Link Smartplug
 * @param  {String}  ip
 * @param  {String}  payload
 * @param  {Number}  [port=defaultPort]
 * @param  {Number}  [timeoutMs=defaultTimeoutMs}]
 * @return {Promise}
 */
const tplinkRequest = async ({
  ip,
  payload,
  port = defaultPort,
  timeoutMs = defaultTimeoutMs
} = {}) => {
  const resultFromSocket = await new Promise((resolve, reject) => {
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
  });

  return resultFromSocket;
};

module.exports = tplinkRequest;
