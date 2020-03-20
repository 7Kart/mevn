const mongoose = require('mongoose')
const A101Parser = require("../Source/A101Parser"),
    Developer = require("../../../../models/developer"),
    to = require('await-to-js').default,
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
    let err, dbDeveloper = null;

    [err, dbDeveloper] = await to(Developer.findOne({ "name": "A101" }, { "projects": true }));
    if (err) throw new Error("can not get A101 developer");

    const requestDate = new Date();

    let stats = {
        update: 0,
        add: 0,
        date: requestDate
    };

    for (project of dbDeveloper.projects) {
        let projectFilters = null;

        [err, projectFilters] = await to(getFilterParams({ complex: project.idOrigin }));
        if (err) throw new Error('get site filter error');

        const projectFlatCount = projectFilters.count;
        const limit = 20;
        let offset = 0;

        for (offset; offset <= projectFlatCount; offset += limit) {
            let flats = [];

            [err, flats] = await to(A101Parser.getRoomsData({
                group: 0,
                limit: limit,
                offset: offset,
                complex: project.idOrigin
            }));
            if (err) throw new Error('error until get flats from website')

            webFlatsIds = flats.map(flat => flat.idOrigin);

            [err, dbFlats] = await to(Flat.getFlatsByIdOrigAndProjectId(webFlatsIds, project._id));


            let newFlats = [];//inserted flats
            let updateDtCheckIds = [];

            for (let webFlat of flats) {
                let dbFlat = dbFlats.find(dbFlat => {
                    return dbFlat.idOrigin == webFlat.idOrigin;
                });

                if (dbFlat != undefined) {
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
                    webFlat.projectId = project._id;
                    newFlats.push(webFlat);
                }
            }

            if (newFlats.length > 0) {
                [err, insertedFlats] = await to(Flat.insertMany(newFlats));
                if (err) console.log('err when insert flats');
                stats.add += insertedFlats.length
            }

            if (updateDtCheckIds.length > 0) {
                Flat.updateDtCheck(updateDtCheckIds, requestDate).exec((err) => {
                    if (err) console.log('err when updatre unchange flat', err);
                });
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