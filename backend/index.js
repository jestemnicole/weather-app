const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes.js');
const app = express();
const {PORT} = require('../config/config.js');

app.use(express.json());

app.use('/api/weather', weatherRoutes);

app.listen(PORT || 3000, () => {
    console.log("listening on " + (PORT ? PORT : 3000));
});