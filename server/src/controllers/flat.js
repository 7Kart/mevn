const Flat = require("../models/flat"),
    Developers = require("../models/developer");


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


exports.FindDeletedFlats = async (req, res, next) => {
    console.log('here');


    Flat.updateMany({
        'dtCheck': {
            '$exists': 0
        }
    }, {$set : {"dtCheck":null}}).exec()

    res.send({
        status: 200
    })

}