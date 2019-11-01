const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DevelopersSchema = new Schema({
    name: String,
    projects: [{
        originId: Number,
        name: String,
        flatIds:Array
    }]
});


module.exports = mongoose.model('developers', DevelopersSchema);