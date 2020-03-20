const Flat = require("../../../models/flat"),
    Developer = require("../../../models/developer"),
    A101Parser = require("../A101/Source/A101Parser"),
    PickAPI = require("../Pick/Source/PickApiGetters"),
    to = require('await-to-js').default;

exports.checkSoldFlats = () => {
    return new Promise(async (resolve, reject) => {
        let err, developerCount, developers;
        // get all developers
        [err, developerCount] = await to(Developer.count());
        if (err) reject(err)

        for (var dInd = 0; dInd < developerCount; dInd++) {
            [err, developers] = await to(Developer.find().skip(dInd).limit(1))
            if (developers.length > 0) {
                for (let project of developers[0].projects) {
                    [err, lastCheckDate] = await to(Flat.getLastCheckDate(project._id).exec());
                    if (err) { reject(err) };
                    if (lastCheckDate.length > 0) {
                        const date = lastCheckDate[0].dtCheck;
                        let flats, skip = 0, limit = 5;
                        do {
                            [err, flats] = await to(Flat.getNotCheckedFlats(project._id, date)
                                .sort({ _id: 1 })
                                .skip(skip)
                                .limit(limit));


                            let flatsPromise = flats.map(async (flat) => {
                                [err, status] = await to(checkSoldStatus(developers[0].code, flat))
                                return status;
                            });

                            [err, soldStatus] = await to(Promise.all(flatsPromise))
                            if (err) console.log("ERR", err)

                            if (soldStatus) {
                                var soldFlatIds = soldStatus.reduce((curItem, item) => {
                                    if (item.status == true) {
                                        curItem.push(item.idFlat);
                                    }
                                    return curItem;
                                }, []);

                                if (soldFlatIds.length > 0) {
                                    Flat.changeSaleStatus(soldFlatIds).exec();
                                }
                            }

                            skip += limit;
                        } while (flats && flats.length > 0)
                        if (err) reject(err);
                    }
                }
            }
        }
    });
}

function checkSoldStatus(code, flat) {
    if (code === "a101") {
        return A101Parser.getSaleStatus(flat);
    } else if (code === "pick") {
        return PickAPI.GetSaleStatus(flat)
    }
    return Promise.resolve([null, null])
}