const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DevelopersSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    projects: {
        type: [{
            _id: mongoose.Types.ObjectId,
            idOrigin: Number,
            name: String,
            locationId: { type: Schema.Types.ObjectId, ref: 'locations' },
        }],
        default: undefined,
        required: false
    }
});

//find developer by name and filter projects by location's id
DevelopersSchema.static('findAndFilterProjects', function (devName, locationId) {
    return this.aggregate([{
        $match: {
            $or: [{
                $and: [{ name: devName, "projects.locationId": { $exists: 0 } }]
            }, {
                $and: [{ "projects.locationId": { $exists: 1 }, name: devName, projects: { $elemMatch: { "locationId": locationId } } }]
            }]
        }
    }, {
        $project: {
            projects: {
                $filter: {
                    input: "$projects",
                    as: "projects",
                    cond: { $eq: ['$$projects.locationId', locationId] }
                }
            }
        }
    }
    ]);
});

DevelopersSchema.static('getAllDevelopersName', function () {
    return this.find({}, { _id: 1, name: 1 });
});

DevelopersSchema.static('getDevelopersProjects', function (developersIds) {

    developersIds = developersIds.map(el => {
        return new mongoose.Types.ObjectId(el);
    });

    return this.aggregate([
        { "$match": { _id: { $in: developersIds } } },
        { "$unwind": "$projects" },
        {
            "$group": {
                "_id": 0,
                "allProjects": { "$push": "$projects" }
            }
        },
        { "$project": { "_id": 0, "projects": "$allProjects" } }
    ])
});

DevelopersSchema.static('addNewProjects', function (developerId, newProjects) {
    return this.updateOne(
        { "_id": mongoose.Types.ObjectId(developerId) },
        {
            "$push": {
                "projects": {
                    "$each": newProjects
                }
            }
        }
    );
});

module.exports = mongoose.model('developers', DevelopersSchema);