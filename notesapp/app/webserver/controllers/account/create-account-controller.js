'use strict';

const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const Joi = require('@hapi/joi');
const uuidV4 = require('uuid/v4');
const sendgridMail = require('@sendgrid/mail');
const mysqlPool = require('../../../database/mysql-pool');

const httpServerDomain = process.env.HTTP_SERVER_DOMAIN;

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function validateSchema(payload) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  });

  Joi.assert(payload, schema);
}

async function addVerificationCode(userId) {
  const verificationCode = cryptoRandomString({ length: 64 });

  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
  const sqlQuery = 'INSERT INTO users_activation SET ?';
  const connection = await mysqlPool.getConnection();

  await connection.query(sqlQuery, {
    id: uuidV4(),
    user_id: userId,
    verification_code: verificationCode,
    created_at: createdAt,
  });

  connection.release();

  return verificationCode;
}

async function sendEmailRegistration(userEmail, verificationCode) {
  const linkActivacion = `${httpServerDomain}/api/account/activation?verification_code=${verificationCode}`;
  const msg = {
    to: userEmail,
    from: {
      email: 'notesapp@yopmail.com',
      name: 'Notes App :)',
    },
    subject: 'Welcome to Hack Notes App',
    text: 'Start taking notes of your favourites topics',
    html: `To confirm the account <a href="${linkActivacion}">activate it here</a>`,
  };

  const data = await sendgridMail.send(msg);

  return data;
}

async function createAccount(req, res, next) {
  const accountData = req.body;

  try {
    await validateSchema(accountData);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }

  const now = new Date();
  const securePassword = await bcrypt.hash(accountData.password, 10);
  const userId = uuidV4();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');

  const connection = await mysqlPool.getConnection();

  const sqlInsercion = 'INSERT INTO users SET ?';

  try {
    await connection.query(sqlInsercion, {
      id: userId,
      email: accountData.email,
      password: securePassword,
      created_at: createdAt,
    });
    connection.release();

    const verificationCode = await addVerificationCode(userId);

    await sendEmailRegistration(accountData.email, verificationCode);

    return res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(409).send({
        message: e.message,
      });
    }

    console.error(e);
    return res.status(500).send(e.message);
  }
}

module.exports = createAccount;
