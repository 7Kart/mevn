const A101Parser = require("../js/A101Parser");
const Developer = require("../models/developer")
const Flat = require("../models/flat")


exports.GetA101Flats = function (req, res) {
    A101Parser.getRoomsData(req.query).then(flats => {
        res.send(flats);
    });
}

exports.getA101FilterParams = function (req, res) {
    A101Parser.getFilterParams(req.query).then(params => {
        res.send(params);
    }, function (err) {
        res.send({ err: err })
    });
}

exports.GetA101FlatsHistory = function (req, res) {
    Developer.find((err, developers) => {
        if (err) throw err;
        console.log(`developers, ${developers}`);
    });
}

exports.test = function (req, res) {
    var test = {
        "href": "/kvartiry/5741/",
        "id": 5741,
        "imgSrc": "https://a101.ru//media/images/render/flats/11-21-43_small.jpg",
        "roomsCount": "1",
        "district": "Москва А101",
        "pavilion": "21",
        "floor": 12,
        "maxFloor": 15,
        "area": "34,8 м2",
        "dateFinished": "2019-07-31T21:00:00.000Z",
        "dateFinishedStr": "Август 2019 г.",
        "prisePerMeterStr": "158 046 ₽/м",
        "prisePerMeter": 158046,
        "coastStr": "5 500 000 ₽",
        "coast": 5500000,
        "mortgage-rshb": false,
        "business": false,
        "ignore": true,
        "design": false,
        "whitebox": false,
        "fursnishing": false
    }

    var flat = new Flat(test);
    flat.save((err, newFlat) => {
        res.send({ data: newFlat });
    })
}