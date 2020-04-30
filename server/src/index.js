const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cron = require('./cron/shedule.js');
const path = require('path');

require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, dbName: "hives" });

mongoose.connection.on("connected", () => {

    const app = express();
    app.use(cors());


    // if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "./public/")));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/index.html'))
    })
    // }

    app.use(morgan('dev'));
    app.use(require('./routers'));
    app.use('/developers', require('./routers/developers'));
    app.use('/flats', require('./routers/flats'));
    app.use('/statistics', require('./routers/statistics'));


    app.use(bodyParser.json());
    app.use((err, req, res, next) => {
        console.log("err", err);
        res.status(400).send({ mesage: "test" })
    })

    app.listen(process.env.PORT || process.env.PORT, () => {
        console.log(`server start on port ${process.env.PORT}`);
        // cron.initCronJobs();
    });
})

if (process.env.NODE_ENV === "development") {
    mongoose.set('debug', true);
}

mongoose.connection.error("error", err => {
    console.log("mongoose connection error", err);
})

mongoose.connection.on("disconect", ref => {
    console.log("disconect", ref);
})
