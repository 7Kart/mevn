const pickAPI = require('../Source/PickApiGetters'),
    Developer = require("../../../../models/developer"),
    Flat = require("../../../../models/flat"),
    mongoose = require("mongoose");
Location = require("../../../../models/location");


exports.getPickChanges = async () => {
    return Developer.findOne({ name: "ПИК" }, { projects: 1 }).populate({
        path: "projects.locationId",
        model: "locations",
        match: location => ({
            code: "MSC"
        })
    }).exec((err, developers) => {
        if (err) throw err;
        if (developers) {
            projects = developers.projects.filter((project) => {
                return project.locationId.code == "MSC"
            });

            console.log('projects', projects);
        } else {
            throw new Error("there is no project")
        }
    })
}

//find new pick projects in MSC
exports.findNewProjects = async () => {

    let location = null;

    try {
        location = await Location.findOne({ code: "MSC" }, {});
        if (location) {
            let developer = null;
            try {
                developer = await Developer.findAndFilterProjects("ПИК", location._id);

                if (developer && developer[0]) {
                    let originLocationId = location.DeveloperLocationIds.find((devLoc) => {
                        return devLoc.developerId.toString() == developer[0]._id.toString();
                    });

                    let webPickProjects = null;

                    try {
                        webPickProjects = await pickAPI.getPickBlocks({ locations: originLocationId })
                        newProjects = [];

                        webPickProjects.body.forEach((pickProject) => {
                            let projectInDb = developer[0].projects.find((dbProject) => {
                                return dbProject.idOrigin == pickProject.id && dbProject.name == pickProject.name
                            })

                            if (!projectInDb) {
                                newProjects.push({
                                    _id: mongoose.Types.ObjectId(),
                                    name: pickProject.name,
                                    locationId: location._id,
                                    idOrigin: pickProject.id
                                });
                            }
                        });
                        console.log('here');
                        let update = null;
                        try {
                            update = await Developer.addNewProjects(developer[0]._id, newProjects);
                        } catch (e) {
                            throw e;
                        }
                        return update;
                    } catch (e) {
                        throw e;
                    }
                } else {
                    throw new Error("developer is not found")
                }
            } catch (e) {
                throw e;
            }
        } else {
            throw new Error("location is not found")
        }
    }
    catch (e) {
        throw e;
    }
}

exports.getNewPickFlats = async () => {
    console.log('init find new flats');
    let developer = null;
    try {
        developer = await Developer.findOne({ name: "ПИК" }, {})

        if (developer) {
            for (let dbProject of developer.projects) {
                // let dbProject = developer.projects[1]
                let startPage = 0;
                try {
                    console.log('dbProject.idOrigin', dbProject.idOrigin);
                    let webFlats = null;
                    do {
                        webFlats = await pickAPI.getPickFlats({
                            page: startPage,
                            block_id: dbProject.idOrigin
                        });
                        startPage++;
                    } while (webFlats.body.flats && webFlats.body.flats.length > 0)
                } catch (e) {
                    throw e;
                }
            }
        } else {
            throw new Error("developer is not found")
        }

    } catch (e) {
        throw e;
    }
}