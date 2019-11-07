const Developer = require("../models/developer");
const Flat = require("../models/flat");
const async = require("async");
const A101Repository = require("../core/DataProviders/A101/Repository")

exports.GetA101Flats = function (req, res) {
    // A101Parser.getRoomsData(req.query).then(flats => {
    //     res.send(flats);
    // });
}


//moove to A101.js
exports.ParceAllA101Flats = function (req, res) {
    A101Repository.getAllFlats()
    .then((flats)=>{
        res.send(flats);
    })
}

exports.ParceAllA101FlatsAsync = function (req, res) {
    A101Repository.getAsyncAllFlats()
    .then((flats)=>{
        res.send(flats);
    })
}


exports.getA101FilterParams = function (req, res) {
    // A101Parser.getFilterParams(req.query).then(params => {
    //     res.send(params);
    // }, function (err) {
    //     res.send({ err: err })
    // });
}

exports.GetA101FlatsHistory = function (req, res) {
    // Developer
    //     .find()
    //     .populate('projects.flatIds')
    //     .exec((err, developers) => {
    //         res.send({
    //             data: developers
    //         })
    //     })
}


