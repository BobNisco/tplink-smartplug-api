const bufferpack = require('bufferpack');

/**
 * TP-Link uses an XOR Autokey Cipher with 171 being the starting key
 * @see https://github.com/softScheck/tplink-smartplug/blob/master/tplink-smartplug.py#L50
 * @see https://en.wikipedia.org/wiki/Autokey_cipher
 * @type {Number}
 */
const startingKey = 171;

/**
 * XOR Autokey Cipher encrypt function written with newer TP-Link Device Compatibility in mind
 * @see https://github.com/softScheck/tplink-smartplug/pull/27/files
 * @see https://github.com/softScheck/tplink-smartplug/pull/23/files
 * @param  {[type]} string The string to encrypt
 * @return {[type]}        The encrypted string
 */
const encrypt = string => {
  let key = startingKey;
  let result = bufferpack.pack('>I', string.length);

  for (let i in string) {
    const a = key ^ string.charCodeAt(i);
    key = a;
    result += String.fromCharCode(a);
  }

  return result;
};

/**
 * XOR Autokey Cipher decrypt function
 * @param  {[type]} string The encrypted string to decrypt
 * @return {[type]}        The decrypted string
 */
const decrypt = string => {
  let key = startingKey;
  let result = '';

  for (let i in string) {
    const a = key ^ string.charCodeAt(i);
    key = string.charCodeAt(i);
    result += String.fromCharCode(a);
  }

  return result;
};

module.exports = { encrypt, decrypt };
