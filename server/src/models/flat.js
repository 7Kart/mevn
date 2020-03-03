const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DevelopersSchema = new Schema({
    _id: Schema.Types.ObjectId,
    imgSrc: String,
    roomsCount: Number,
    district: String,
    pavilion: String,
    maxFloor: Number,
    area: Number,
    dateFinished: Date,
    dateFinishedStr: String,
    prisePerMeterStr: String,
    prisePerMeter: Number,
    oldCoastStr: String,
    coastStr: String,
    oldCoast: Number,
    coast: Number,
    whitebox: Boolean,
    mortgagershb: Boolean,
    ignore: Boolean,
    idOrigin: Number,
    href: String,
    fursnishing: Boolean,
    floor: Number,
    design: Boolean,
    business: Boolean,
    projectId: Schema.Types.ObjectId,
    changes: [Object],
    block: {
        type: Boolean,
        default: false
    },
    dateInsert: {
        type: Date,
        default: Date.now
    },
});

DevelopersSchema.static('getFlatWithPag', function(query, page){
    return this.find(query)
    .skip(page * 20)
    .limit(20);
})

module.exports = mongoose.model('flats', DevelopersSchema);