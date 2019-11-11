const A101Parser = require("../Source/A101Parser"),
    Developer = require("../../../../models/developer")

exports.getNewDevelopersProject = function () {
    return new Promise(async (resolve, reject) => {
        let a101DevelopersProject = null;
        try{
            a101DevelopersProject = await A101Parser.getFilterParams();
            Developer.findOne({"name": "A101"}, (err, developers) => {
                if(err) reject(err);
                console.log('a101DevelopersProject', a101DevelopersProject.facets.complexNames);
                
                const newProject = a101DevelopersProject.facets.complexNames.filter(siteProject => {
                    return !(developers.projects.find(project=>{}))
                    // developers.projects.forEach(dbProject => {
                    //     return !(siteProject.id == dbProject.id && siteProject.name == dbProject.name)
                    // });
                    // if()
                });

                console.log('test', newProject);

                resolve(a101DevelopersProject);

            })
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
