const A101Repository = require("../core/DataProviders/A101/Repository")

exports.getA101FilterParams = function (req, res) {
   
    A101Repository.getFilterParams(req.query).then(params => {
        res.send(params);
    }, function (err) {
        res.send({ err: err })
    });
}

exports.GetA101Flats = function (req, res) {
    A101Repository.findNewFlats().then(flats => {
        // res.send(flats);
    }).catch(err => {
        console.log(`err ${err}`);

        res.send({
            status: 500
        })
    });
    res.send('task run');

}

//moove to A101.js
exports.ParceAllA101Flats = function (req, res) {
    A101Repository.getAllFlats()
        .then((flats) => {
            res.send(flats);
        })
}

exports.ParceAllA101FlatsAsync = function (req, res) {
    A101Repository.getAsyncAllFlats()
        .then((flats) => {
            res.send(flats);
        }).catch((err) => {
            console.log('err', err);
            res.send({ status: 403 })
        })
}

exports.getNewDevelopersProjects = function (req, res) {
    A101Repository.getNewDevelopersProject()
        .then((developerData) => {
            res.send(developerData.facets.complexNames);
        })
        .catch(err => {
            res.send(err)
        })
}

exports.GetFlats = function (req, res) {
    A101Repository.getFlatsByParams(req.query).then((result) => {
        res.send(result);
    })
        .catch((e) => {
            res.send(e);
        })
}