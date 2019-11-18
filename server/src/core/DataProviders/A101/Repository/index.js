const mongoose = require('mongoose')
const A101Parser = require("../Source/A101Parser"),
    Developer = require("../../../../models/developer"),
    Flat = require("../../../../models/flat")

// filter params: 
// complex,
// floor_0, 
// floor_1, 
// room=, 
// building, 
// price_0, 
// price_1, 
// area_0, 
// area_1

exports.getFilterParams = getFilterParams;

// find new projects on site a101
exports.getNewDevelopersProject = function () {
    return new Promise(async (resolve, reject) => {
        let a101DevelopersProject = null;
        try {
            a101DevelopersProject = await A101Parser.getFilterParams();
            Developer.findOne({ "name": "A101" }, (err, developers) => {
                if (err) reject(err);
                const newProjects = []
                a101DevelopersProject.facets.complexNames.forEach((projectFromeSite) => {
                    const existProject = developers.projects.find((dbProject) => {
                        return dbProject.originId == projectFromeSite.id && dbProject.name == projectFromeSite.name
                    });
                    if (!existProject)
                        newProjects.push(projectFromeSite)
                });
                resolve(newProjects);
            });
        }
        catch (err) {
            reject(err)
        }
    });
}


exports.findNewFlats = async function () {
    //get from db all developers
    let dbProjects = null;
    try {
        dbProjects = await Developer.findOne({ "name": "A101" }, { "projects": true })
    }
    catch (err) {
        throw new Error('get db project error');
    }
    for (const project of dbProjects.projects) {
        let projectFilters = null;
        try {
            projectFilters = await getFilterParams({ complex: project.originId });
        } catch (err) {
            throw new Error('get site filter error');
        }
        const projectFlatCount = projectFilters.count;

        const skipCount = 20;
        let queryParams = [];
        let offset = 0

        // while (offset < projectFlatCount) {
        //     queryParams.push({
        //         group: 0,
        //         limit: skipCount,
        //         offset: offset,
        //         complex: project.originId
        //     });
        //     offset += skipCount;
        // }

        ////////for test
        queryParams.push({
            group: 0,
            limit: skipCount,
            offset: offset,
            complex: project.idOrigin
        });
        //////


        for (const param of queryParams) {
            let flats = null;
            try {
                //get all flats frome site    
                flats = await A101Parser.getRoomsData(param);

                // //add new flats to db
                // Flat.collection.insert(flats, function (err, flat) {
                //     if (err) {
                //         throw err;
                //     } else {
                //         console.log(`new dbs added`);
                //     }
                // });



                Flat.find({}, { _id: 1, instock: { $slice: -1 } }, (err, flatsId) => {
                    // Developer.findOne({ '_id': mongoose.Types.ObjectId('5dd13c9c1c9d44000002ebb0')  }, (err, developer) => {
                    //     console.log(`developer ${developer}`);
                    // });
                    const toSave = flatsId.map((flat) => flat._id)

                    console.log(`toSave`, toSave);

                    Developer.findOneAndUpdate({
                        '_id': mongoose.Types.ObjectId('5dd13c9c1c9d44000002ebb0'),
                        'projects.name': 'Скандинавия'
                    }, {
                        $push: { "projects.$.flatIds": { $each: toSave } }
                    }, (err, update) => {
                        console.log(`err ${err}`);
                        console.log(`update ${update}`);
                    });

                });


                // const flatIds = flats.map((flat)=>{
                //     return flat.idOrigin;
                // });

                //serching flats in db
                // let dbFlats = [];
                // try{
                //     dbFlats = await Developer.find({"idOrigin":{$in : flatIds}})
                // }
                // catch(e)
                // {
                //     throw e;
                // }
            } catch (e) {
                throw e;
            }

        }
    }
    return dbProjects;

    //get every developers and loop all there projects

    //get frome site query params (flats count)

    //by limit get project flats find them in db and add them to it if there aren't

}

//get parallel all A101 flats
exports.getAsyncAllFlats = function () {
    return new Promise(async (resolve, reject) => {
        let queryParams = null;
        try {
            queryParams = await A101Parser.getFilterParams()
        }
        catch (err) {
            reject(err)
        }
        const skipCount = 100;
        if (queryParams) {
            let totalFlatsCount = queryParams.count;
            let offset = 0;
            var allFlats = []
            var promises = []

            while (offset < totalFlatsCount) {
                promises.push(A101Parser.getRoomsData({
                    group: 0,
                    limit: skipCount,
                    offset: offset
                }));
                offset += skipCount
            }

            await Promise.all(promises).then(flats => {
                flats.forEach((flat) => {
                    var flatId = flat.map((item) => {
                        return item.idOrigin;
                    })
                    allFlats.push(...flat)
                });
            });
            resolve(allFlats)
        }
    })
}

exports.getAllFlats = function () {
    return new Promise(async (resolve, reject) => {
        const skipCount = 20;
        let queryParams = await A101Parser.getFilterParams();

        if (queryParams) {
            let totalFlatsCount = queryParams.count;
            let offset = 0;
            var allFlats = [];
            var params = [];

            while (offset < totalFlatsCount) {
                params.push({
                    group: 0,
                    limit: skipCount,
                    offset: offset
                });
                offset += skipCount
            }

            for (const param of params) {
                let flats = await A101Parser.getRoomsData(param);
                allFlats.push(...flats);
            }
            resolve(allFlats);
        }
    })
}


function getFilterParams(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const queryParams = await A101Parser.getFilterParams(query)
            resolve(queryParams);
        }
        catch (err) {
            reject(err)
        }
    });
}