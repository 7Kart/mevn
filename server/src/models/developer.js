const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DevelopersSchema = new Schema({
    name: String,
    projects: [{
        originId: Number,
        name: String,
        flatIds: [{ type: Schema.Types.ObjectId, ref: 'flats' }]        
    }]
});


module.exports = mongoose.model('developers', DevelopersSchema);