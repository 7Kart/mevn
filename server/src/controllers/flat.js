const Flat = require("../models/flat"),
    Developers = require("../models/developer"),
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

    const dbFlats = await Flat.find({ projectId: "5e249bd51335fa000067e080" })
        .skip(0)
        .limit(50);

    let promiseArray = []

    dbFlats.forEach(flat => {
        promiseArray.push(a1010Parser.getSaleStatus(flat))
    });

    var result = await Promise.all(promiseArray);

    res.send({
        status: result
    });

}