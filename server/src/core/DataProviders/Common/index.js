const Flat = require("../../../models/flat"),
    Developer = require("../../../models/developer"),
    A101Parser = require("../A101/Source/A101Parser")
to = require('await-to-js').default;

exports.checkSoldFlats = () => {
    return new Promise(async (resolve, reject) => {
        let err, developerCount, developers;
        //get all developers
        [err, developerCount] = await to(Developer.count());
        if (err) reject(err)

        for (var dInd = 0; dInd < developerCount; dInd++) {
            [err, developers] = await to(Developer.find().skip(dInd).limit(1))
            if (err) reject(err);
            if (developers.length > 0) {

                const devPromise = developers[0].projects.map(async (project) => {

                    let flats = []
                    let skip = 0;
                    let limit = 100
                    do {
                        [err, flats] = await to(Flat.find({ projectId: project._id },
                            { _id: 1, district: 1, idOrigin: 1, projectId: 1 })
                            .skip(skip)
                            .limit(limit));
                        if (err) {
                            console.log('flats find error')
                            flats = [];
                        } else {
                            skip += limit;
                            flats.forEach(async (flat) => {
                                // var test = await checkSoldStatus(developers[0].code, flat)
                                var test = checkSoldStatus(developers[0].code, flat)

                                console.log('test', test);

                            });
                        }
                    } while (flats && flats.length != 0)
                });

                result = await Promise.all(devPromise)

            }
        }

    });
}

function checkSoldStatus(code, flat) {
    console.log(code, flat) 
    // if (code === "a101") {
    //     return A101Parser.getSaleStatus(flat);
    // }
    return null

}