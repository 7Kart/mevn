const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DevelopersSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    projects: [{
        idOrigin: Number,
        name: String,
        locationId: { type: Schema.Types.ObjectId, ref: 'locations'},
        flatIds: [{ type: Schema.Types.ObjectId, ref: 'flats' }],        
    }]
});


module.exports = mongoose.model('developers', DevelopersSchema);