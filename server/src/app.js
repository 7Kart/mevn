const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('config');

mongoose.connect(config.get("app.dbConfig.connectionString"), { useNewUrlParser: true, dbName:"hives" });

mongoose.connection.on("connected", () => {
    
    const app = express();
    app.use(morgan('dev'));
    app.use(require('./routers'));
    app.use(bodyParser.json());
    app.use(cors());

    app.listen(process.env.PORT || config.get("app.port"), ()=>{
        console.log(`server start on port ${config.get("app.port")}`);
    });
})

mongoose.set('debug', true);

mongoose.connection.error("error", err => {
    console.log("mongoose connection error", err);
})

mongoose.connection.on("disconect", ref => {
    console.log("disconect", ref);
})