const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv').config();
require('./config/environment');
require('./database');

const routes = require('./routes/index');
const assetFolder = path.resolve(__dirname, '../dist');
const port = process.env.PORT;
const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(express.static(assetFolder));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('combined'));

app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
