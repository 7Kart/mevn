const pickAPI = require('../Source/PickApiGetters'),
    Developer = require("../../../../models/developer"),
    Flat = require("../../../../models/flat"),
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

    return Developer.findOne({ name: "ПИК" }, { projects: 1 }).populate({
        path: "projects.locationId",
        model: "locations",
        match: location => ({
            code: "MSC"
        })
    }).exec((err, developer) => {
        if (err) throw err;
        if (developer) {

            dbProjects = developer.projects.filter((project) => {
                return project.locationId.code == "MSC"
            });

            location = dbProjects[0].locationId.DeveloperLocationIds.find(devLocation => {
                return devLocation.developerId.toString() == developer._id.toString()
            });

            if (location) {
                pickAPI.getPickBlocks({ locations: location.id })
                    .then(webProjects => {
                        let newBdProjects = []                        
                        webProjects.body.forEach(webProject => {                            
                            if (dbProjects.find(dbProject => {
                                return dbProject.idOrigin == webProject.id
                            }) == null) {                                   
                                newBdProjects.push({
                                    name: webProject.name,
                                    idOrigin: webProject.id,                           
                                    locationId: dbProjects[0].locationId._id,
                                });                                
                            } 
                        });

                        console.log('newBdProjects', newBdProjects)

                        developer.projects.push(...newBdProjects);
                        developer.save();
                        // console.log('developer', developer);
                    })
                    .catch(err => {
                        throw err;
                    })
            } else {
                throw new Error("there is no location");
            }
        } else {
            throw new Error("there is no project");
        }
    })
}