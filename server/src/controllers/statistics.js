const Flats = require("../models/flat"),
    Developer = require("../models/developer"),
    to = require('await-to-js').default;



exports.GetStatisctics = async (req, res) => {

    let err = null, prices = [];

    const startDate = new Date(req.query.dtStart);
    const endDate = new Date(req.query.dtEnd)

    endDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    limit = 100;

    let projId = "5e249cc11335fa000067e083"

    const count = await Flats.count({
        projectId: projId,
        dateInsert: { $lte: endDate },
        dtCheck: { $gte: startDate }
    })

    let promises = []

    for (skip = 0; skip < count; skip += limit) {
        promises.push(Flats.getFlatsCoastByPeriod(startDate, endDate, skip, limit))
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
    )

}

// dateFinished