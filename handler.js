const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const endpoints = require('./api/endpoints');
const { getAllUsers } = require('./api/users');

const app = express();

app.use(bodyParser.json({ strict: false, limit: '10mb' }));

app.get('/', endpoints);
app.get('/users', getAllUsers);


module.exports.app = serverless(app);
module.exports.server = app;
