const Flat = require("../models/flat"),
    Developers = require("../models/developer"),
    CommonRepository = require('../core/DataProviders/Common'),
    a1010Parser = require("../core/DataProviders/A101/Source/A101Parser");



exports.UpdateMongoFlats = async (req, res) => {
    res.send({
        status: "ok"
    })
}

exports.GetFlats = async (req, res, next) => {
    const { developerFilter, projectFilter, areaRange, roomCountRange, page } = req.query;
    let query = {};
    if (areaRange !== undefined)
        query["area"] = { $gte: areaRange[0], $lte: areaRange[1] };
    if (roomCountRange)
        query["roomsCount"] = { $gte: roomCountRange[0], $lte: roomCountRange[1] };
    if (projectFilter !== undefined)
        query["projectId"] = { $in: projectFilter };
    if (developerFilter && projectFilter === undefined) {
        const projects = await Developers.getProjectsIds(developerFilter);
        if (projects.length > 0) {
            query["projectId"] = { $in: projects };
        }
    }
    try {
        const flats = await Flat.getFlatWithPag(query, page);
        res.send({
            flats
        });
    }
    catch (e) {
        next(e);
    }
}

//find flats which was sold
exports.FindDeletedFlats = async (req, res, next) => {

    CommonRepository.checkSoldFlats().then((data)=>{
        console.log(`data`,data);        
    })
    .catch((err)=>{
        console.log(`err ${err}`);
        
    })

    res.send({
        status: 200
    });

}