'use strict';

require('dotenv').config();
const webServer = require('./app/webserver');
const mysqlPool = require('./app/database/mysql-pool');

const httpListeningPort = process.env.PORT;

async function initApp() {
  try {
    await mysqlPool.connect();
    await webServer.listen(httpListeningPort);
    console.log(`server running at: ${httpListeningPort}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

initApp();
