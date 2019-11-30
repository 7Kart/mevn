const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DevelopersSchema = new Schema({
    imgSrc: String,
    roomsCount: Number,
    district: String,
    pavilion: String,
    maxFloor: Number,
    area: String,
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
    changes: [Object],
    dateInsert: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('flats', DevelopersSchema);