const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

const LocationSchema = new Schema({
    _id: ObjectId,
    name: String,
    code: String,
    DeveloperLocationIds:[{
        developerId: {type: ObjectId, ref: 'developers'},
        id: String
    }]
})

module.exports = mongoose.model('locations', LocationSchema);