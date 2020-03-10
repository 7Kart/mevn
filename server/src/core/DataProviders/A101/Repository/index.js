const mongoose = require('mongoose')
const A101Parser = require("../Source/A101Parser"),
    Developer = require("../../../../models/developer"),
    Flat = require("../../../../models/flat");

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

exports.getFlatsByParams = function (queryParams) {
    return A101Parser.getRoomsData(queryParams);
}

//get all A101's flats by offset chunk
exports.findNewFlats = async function () {
    let dbDeveloper = null;

    try {
        dbDeveloper = await Developer.findOne({ "name": "A101" }, { "projects": true })
    }
    catch (err) {
        throw new Error('get db project error');
    }

    const requestDate = new Date();

    let stats = {
        update: 0,
        add: 0,
        date: requestDate
    };

    for (project of dbDeveloper.projects) {
        let projectFilters = null;
        try {
            projectFilters = await getFilterParams({ complex: project.idOrigin });
        } catch (err) {
            throw new Error('get site filter error');
        }

        const projectFlatCount = projectFilters.count;
        const limit = 20;
        let offset = 0;
        let queryParams = [];

        // while (offset < projectFlatCount) {
        for (offset; offset <= projectFlatCount; offset += limit) {
            queryParams.push({
                group: 0,
                limit: limit,
                offset: offset,
                complex: project.idOrigin
            });
        }

        for (const param of queryParams) {

            let flats = null

            try {
                flats = await A101Parser.getRoomsData(param);
            } catch (e) {
                throw new Error('error until get flats from website')
            }

            if (flats && flats.length > 0) {
                
                var newFlatsToAdd = [];
                var updateDtCheckIds = [];
                
                webFlatsIds = flats.map(flat => {
                    return flat.idOrigin;
                });
           
                try {
                    var dbFlats = await Flat.find({ idOrigin: { $in: webFlatsIds }, projectId: project._id });
                } catch (e) {
                    console.log("can't get flats from db");
                }

                flats.forEach(webFlat => {
                    let dbFlat = dbFlats.find(dbFlat => {
                        return dbFlat.idOrigin == webFlat.idOrigin;
                    });
                    if (dbFlat) {
                        
                        const changes = webFlat.compareWithDbEntity(dbFlat);
   
                        if (Object.keys(changes.new).length !== 0 || changes.new.constructor !== Object) {
                            for (key in changes.new) {
                                dbFlat[key] = changes.new[key]
                            }
                            changes.old['dtChanges'] = requestDate; //date of request start.   
                            dbFlat.changes.push(changes.old);
                            dbFlat.dtCheck = requestDate
                            dbFlat.save(err => {
                                if (!err) {
                                    stats.update++;
                                }
                            });
                        } else {
                            updateDtCheckIds.push(dbFlat._id);
                        }
                    } else {
                        webFlat.dtCheck = requestDate;
                        newFlatsToAdd.push(webFlat)
                    }
                });

                Flat.updateDtCheck(updateDtCheckIds, requestDate).exec((err) => {
                    if (err) console.log('err when updatre unchange flat', err);
                });

                if (newFlatsToAdd.length > 0) {
                    Flat.insertMany(newFlatsToAdd, (err, insertedFlats) => {
                        if (err) throw err;
                        else
                            stats.add += insertedFlats.length
                    });
                }

            }
        }
    }
    console.log('stats', stats);
    return stats;
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