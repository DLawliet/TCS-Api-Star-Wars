const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const endpoints = require('./api/endpoints');
const { createPlanet, getAllPlanets, findPlanetById, updatePlanet, deletePlanet } = require('./api/planets');

const app = express();

app.use(bodyParser.json({ strict: false, limit: '5mb' }));

app.get('/', endpoints);
app.get('/planetas', getAllPlanets);
app.get('/planetas/:id', findPlanetById);
app.post('/planetas', createPlanet);
app.put('/planetas/:id', updatePlanet);
app.delete('/planetas/:id', deletePlanet);


module.exports.app = serverless(app);
module.exports.server = app;
