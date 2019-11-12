const A101Parser = require("../Source/A101Parser"),
    Developer = require("../../../../models/developer")

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

exports.getFilterParams = function (query) {
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
