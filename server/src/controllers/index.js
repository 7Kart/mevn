const A101Parser = require("../js/A101Parser");

exports.GetA101Flats = function (req, res) {
    A101Parser.getRoomsData().then(flats => {
        res.send(flats);
    });
}

exports.getA101FilterParams = function (req, res) {
    
    console.log("req.params",req.query)
    
    A101Parser.getFilterParams(req.query).then(params => {
        res.send(params);
    }, function(err){
        res.send({err:err})
    });
}
