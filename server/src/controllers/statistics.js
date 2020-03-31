const Flats = require("../models/flat"),
    Developer = require("../models/developer"),
    Types = require("mongoose").Types,
    to = require('await-to-js').default;



exports.GetStatisctics = async (req, res) => {

    let err = null, flats = null;

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    // const dateFinish = new Date(startDate);
    // dateFinish.setDate(dateFinish.getDate() - 1);

    [err, flats] = await to(Flats.aggregate([
        {
            $match: {
                projectId: new Types.ObjectId("5e249cc11335fa000067e083"),
                dateInsert: { $lte: startDate },
                changes: { $not: { $size: 0 } },
                $or: [{
                    dtCheck: { $gte: startDate }
                }, {
                    $and: [{
                        dtCheck: null
                    }, {
                        changes: {
                            $elemMatch: {
                                dtChanges: { $gte: startDate }
                            }
                        }
                    }]
                }]
            }
        }, {
            $project: {
                _id: 1,
                coast: 1,
                prisePerMeter: 1,
                dateInsert: 1,
                dtCheck: 1,
                changes: {
                    $filter: {
                        input: '$changes',
                        as: 'item',
                        cond: { $exists: ['$$item.prisePerMeter', 1] }
                    }
                }
            }
         
        }
        



        // }, {
        //     $limit: 5
        // }
    ]));

    console.log('err, flats', err, flats, flats.length);

    res.send({
        code: 200
    })

}

// dateFinished