const express = require('express');
const bodyParser = require('body-parser');

const commands = require('./commands');
const tplinkRequest = require('./tplink-request');

// To define your TP-Link plugs, create a file called `my-plugs.js` and have it look something like:
// module.exports = ['192.168.1.100', '192.168.1.101'];
let MY_PLUGS = [];
try {
  // eslint-disable-next-line node/no-unpublished-require
  MY_PLUGS = require('./my-plugs');
} catch (e) {
  console.error(`Can't find a file called 'my-plugs.js', some features may be limited`);
}

const app = express();
const argv = require('yargs').argv;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const { apiPort = 8600 } = argv;

app.get('/', (req, res) => {
  res.send('Hack the planet');
});

app.post('/', async (req, res) => {
  const { command, json, ip, all } = req.body;

  let payload;
  if (command) {
    payload = commands[command];
  } else if (json) {
    payload = json;
  }

  if (!(payload || json)) {
    return res.status(422).send('No command or json given');
  }

  // TODO: Safety checks. This is meant to ensure an ip was given when 'all' isn't provided
  if (!all && !ip) {
    return res.status(422).send('No IP given');
  }

  try {
    if (all) {
      const results = await Promise.all(MY_PLUGS.map(ip => tplinkRequest({ ip, payload })));
      res.send(results.join('\n'));
    } else {
      const result = await tplinkRequest({ ip, payload });
      res.send(result);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

console.log(`Listening on port ${apiPort}`);
app.listen(apiPort);
