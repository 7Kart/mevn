Flat = require("../models/flat");

exports.UpdateMongoFlats = async (req, res) => {
    res.send({
        status: "ok"
    })
}

exports.GetFlats = async (req, res, next) => {
    
    console.log("req.query", req.query);
    
    const{developerFilter, projectFilter, areaRange, roomCountRange, page} = req.query;

    console.log('page: ', page);
    console.log('developerFilter: ', developerFilter);
    console.log('projectFilter: ', projectFilter);
    console.log('areaRange: ', areaRange);
    console.log('roomCountRange: ', roomCountRange);


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
