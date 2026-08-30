const express = require('express');
const app = express();

app.use(express.json());

const registerRoute = require('./controller/register');
app.post('/api/register', registerRoute.register);

module.exports = app;