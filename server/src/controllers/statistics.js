const Flats = require("../models/flat"),
    ObjectId = require("mongoose").Types.ObjectId,
    to = require('await-to-js').default;



exports.GetStatisctics = async (req, res) => {

    let err = null, prices = [];

    const dtStart = new Date(req.query.dtStart)
    const dtEnd = new Date(req.query.dtEnd)
    dtStart.setHours(0, 0, 0, 0);
    dtEnd.setHours(0, 0, 0, 0);

    let queryFilter = {
        dateInsert: { "$lte": dtEnd },
        dtCheck: { "$gte": dtStart }
    }

    limit = 100;
    console.log('req.query.projectsIds', req.query.projectsIds);
    if (req.query.projectsIds != undefined && req.query.projectsIds.length > 0) {
        const projectsIds = req.query.projectsIds.map((id) => {
            return new ObjectId(id);
        })
        queryFilter["projectId"] = {
            "$in": projectsIds
        }
    }

    const count = await Flats.count(queryFilter)

    let promises = []

    for (let skip = 0; skip < count; skip += limit) {
        promises.push(Flats.getFlatsCoastByPeriod(queryFilter, dtStart, dtEnd, skip, limit))
    }

    [err, results] = await to(Promise.all(promises))

    if (!err) {
        prices = results.reduce((arr, result) => {
            arr.push(...result);
            return arr;
        }, [])
    }

    res.send(
        prices
    );

}
