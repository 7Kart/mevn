const pickAPI = require('../Source/PickApiGetters'),
    Developer = require("../../../../models/developer"),
    PickFlat = require("../../DataModel/PickFlat"),
    mongoose = require("mongoose"),
    Location = require("../../../../models/location"),
    DbFlat = require("../../../../models/flat")

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
    const requestDate = new Date();

    try {
        developer = await Developer.findOne({ name: "ПИК" }, {})
        let status = {
            update: 0,
            add: 0,
            date: requestDate
        }
        if (developer) {
            for (let dbProject of developer.projects) {
                try {
                    let startPage = 0;
                    let webQueryFinishFlag = false;
                    do {
                        let webFlats = null;
                        const httpResult = await pickAPI.getPickFlats({
                            page: startPage,
                            block_id: dbProject.idOrigin
                        })
                        webFlats = httpResult.body;
                        if (webFlats.flats !== undefined && webFlats.flats.length > 0) {

                            var flatsIdOrigin = webFlats.flats.map((flat) => {
                                return flat.id;
                            });
                            const dbFlats = await DbFlat.find({ idOrigin: { $in: flatsIdOrigin }, projectId: dbProject._id })

                            let newFlatsToAdd = [];
                            let updateDtCheckIds = [];

                            webFlats.flats.forEach((flat) => {
                                let webFlat = new PickFlat(flat, dbProject._id);
                                webFlat.dtCheck = requestDate;

                                let dbFlat = dbFlats.find((dbFlat) => {
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
                                        dbFlat.save(err=>{
                                            if(!err){
                                                status.update++;
                                            }
                                        })

                                    } else {
                                        updateDtCheckIds.push(dbFlat._id);
                                    }
                                } else {
                                    newFlatsToAdd.push(webFlat);
                                }
                            });

                            DbFlat.updateDtCheck(updateDtCheckIds, requestDate).exec((err) => {
                                if (err) {
                                    console.log("update dtCheck error!")
                                }
                            });

                            if (newFlatsToAdd.length > 0) {
                                DbFlat.insertMany(newFlatsToAdd, (err, insertedFlats) => {
                                    if (err) throw err;
                                    else
                                        status.add += insertedFlats.length
                                });
                            }

                            startPage++;
                        } else {
                            webQueryFinishFlag = true;
                        }
                    } while (!webQueryFinishFlag)
                } catch (e) {
                    throw e;
                }
            }

            return status
        } else {
            throw new Error("developer is not found")
        }
    } catch (e) {
        throw e;
    }
}