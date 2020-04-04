const Flats = require("../models/flat"),
    Developer = require("../models/developer"),
    to = require('await-to-js').default;



exports.GetStatisctics = async (req, res) => {

    let err = null, allPrice = [];

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    let limit = 20, skip = 0;

    do {

        [err, flats] = await to(Flats.getFlatsCoastByDate(startDate, skip, limit));

        console.log('flags', flats);

        flats.forEach(flat => {
            if (flat.lastChange != null) {
                if (flat.dtCheck == null || flat.dtCheck.setHours(0, 0, 0, 0) > startDate) {
                    allPrice.push(flat.lastChange.prisePerMeter);
                } else {
                    allPrice.push(flat.prisePerMeter);
                }
            } else {
                allPrice.push(flat.prisePerMeter)
            }
        });

        skip += limit;
    } while (false)
    // } while (flats && flats.length > 0)

    console.log('flats', allPrice);

    res.send({
        code: 200
    })

}

// dateFinished