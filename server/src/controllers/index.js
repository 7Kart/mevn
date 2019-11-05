const A101Parser = require("../js/A101Parser");
const Developer = require("../models/developer")
const Flat = require("../models/flat")


exports.GetA101Flats = function (req, res) {
    A101Parser.getRoomsData(req.query).then(flats => {
        res.send(flats);
    });
}

//moove to A101.js
exports.ParceAllA101Flats = function (req, res) {

    let ParamPromise = A101FilterParams = A101Parser.getFilterParams()
    const skipCount = 100;
    ParamPromise.then(async(params) => {
        if (params) {
            let totalFlatsCount = params.count;
            let offset = 0;
            var allFlats = []
            var promises = []

            while (offset < totalFlatsCount) {
                promises.push(A101Parser.getRoomsData({
                    group: 0,
                    limit: skipCount,
                    offset: offset
                }));
                offset += skipCount
            }

            await Promise.all(promises).then(flats => {
                flats.forEach((flat) => {
                    var flatId = flat.map((item)=>{
                        return item.idOrigin;
                    })
                    console.log('flatId', flatId);
                    allFlats.push(...flat)
                });                
                res.send({ data: allFlats, total: allFlats.length })
            });

        }
    }, err => {
        throw err;
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
    Developer
        .find()
        .populate('projects.flatIds')
        .exec((err, developers) => {
            res.send({
                data: developers
            })
        })
}


