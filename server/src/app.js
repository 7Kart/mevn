const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// make app use dependencies
app.use(morgan('dev'))
app.use(require('./routers'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 8081) // client is already running on 8080