const Flats = require("../models/flat"),
    Developer = require("../models/developer"),
    to = require('await-to-js').default;



exports.GetStatisctics = async (req, res) => {

    let err = null, flats = null;




    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    // const dateFinish = new Date(startDate);
    // dateFinish.setDate(dateFinish.getDate() - 1);



    [err, flats] = await to(Flats.find({
        projectId: "5e249cc11335fa000067e083",
        $or: [{
            $and: [{
                dateInsert: { $lte: startDate }
            }, {
                dtCheck: { $gte: startDate }
            }]
        }, {
            $and: [{
                dtCheck: null
            }, {
                changes: {
                    $elemMatch: {
                        
                    }
                }
            }]
        }]
    }, {
        prisePerMeter: 1,
        dtCheck: 1
    }));

    console.log(`flats`, flats);
    console.log(`flats`, flats.length);


    res.json({
        status: 200
    })
}