'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/account', routes.account);
app.use('/api/auth', routes.auth);
app.use('/api/notes', routes.notes);
app.use('/api/tags', routes.tag);
app.use('/api/users', routes.user);

app.get('/', (req, res, next) => {
  res.send('base url: /api');
});

app.use((req, res) => {
  return res.status(404).send({
    message: 'No hay ná pa ti',
  });
});

app.use((err, req, res, next) => {
  return res.status(500).send({
    message: err.message,
  });
});

let server = null;
async function listen(port) {
  try {
    if (server) {
      return server;
    }

    server = await app.listen(port);
    return server;
  } catch (e) {
    console.error("Can't listen", e);
    throw e;
  }
}

async function close() {
  if (server) {
    await server.close();
    server = null;
  } else {
    console.error("Can't close a non started server");
  }
}

module.exports = {
  listen,
  close,
};
