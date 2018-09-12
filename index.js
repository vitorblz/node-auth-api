require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

require('./routes/auth')(app);

app.listen(process.env.SERVER_PORT, () => 
    console.log(`Server started at port ${process.env.SERVER_PORT}`));

