const Flats = require("../models/flat"),
    Developer = require("../models/developer"),
    to = require('await-to-js').default;



exports.GetStatisctics = async (req, res) => {

    let err = null, prices = [];

    const startDate = new Date(2020, 1, 1);
    const endDate = new Date()

    endDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    skip = 0;
    limit = 50;

    do {
        [err, flats] = await to(Flats.getFlatsCoastByPeriod(startDate, endDate, skip, limit));

        prices.push(...flats)
        skip += limit
    } while (flats && flats.length > 0)


    res.json({
        prices
    })

}

// dateFinished