'use strict';

const account = require('./account-router');
const auth = require('./auth-router');
const notes = require('./notes-router');
const tag = require('./tag-router');
const user = require('./user-router');

module.exports = {
  account,
  auth,
  notes,
  tag,
  user,
};
