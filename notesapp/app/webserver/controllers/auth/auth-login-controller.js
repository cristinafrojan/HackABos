'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const mysqlPool = require('../../../database/mysql-pool');

async function validateSchema(payload) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  });

  Joi.assert(payload, schema);
}

async function login(req, res, next) {
  const authData = { ...req.body };

  try {
    await validateSchema(authData);
  } catch (e) {
    return res.status(400).send(e);
  }

  try {
    const sqlQuery = `SELECT id, email, password, avatar_url
      FROM users
      WHERE email = '${authData.email}'`;
    const connection = await mysqlPool.getConnection();
    const [result] = await connection.query(sqlQuery);
    connection.release();
    
    if (result.length !== 1) {
      return res.status(401).send();
    }

    const userData = result[0];
    const isPassworkOk = await bcrypt.compare(authData.password, userData.password);
    if (!isPassworkOk) {
      return res.status(401).send();
    }

    const payloadJwt = {
      userId: userData.id,
      role: 'admin',
    };

    const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);
    const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { 
      expiresIn: jwtExpiresIn,
     });

    const response = {
      accessToken: token,
      expiresIn: jwtExpiresIn,
      avatarUrl: userData.avatar_url,
    };

    return res.status(200).send(response);
  } catch(e) {
    console.error(e);
    return res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = login;
