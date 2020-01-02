const mongoose = require("mongoose");

var Scheme = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

const LocationSchema = new Scheme({
    _id: Schema.Types.ObjectId,
    name: String,
    DeveloperLocationIds:[{
        developerId: ObjectId,
        id: String
    }]
})

module.exports = mongoose.model('locations', LocationSchema);