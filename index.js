require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
app.use(cors());

require('./routes/auth')(app);

app.listen(process.env.SERVER_PORT, () => 
    console.log(`Server started at port ${process.env.SERVER_PORT}`));

