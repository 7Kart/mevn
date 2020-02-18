Flat = require("../models/flat");

exports.UpdateMongoFlats = async (req, res) => {
    res.send({
        status: "ok"
    })
}

exports.GetFlats = async (req, res, next) => {
    
    console.log("req.query", req.query);
    
    try {
        const flats = await Flat.find({})
            .skip(req.query.page*20)
            .limit(20);
        res.send({
            flats
        });
    }
    catch (e) {
        next(e);
    }

} 
