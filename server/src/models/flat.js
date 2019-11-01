const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DevelopersSchema = new Schema({
    imgSrc: String,
    roomsCount: Number,
    district: String,
    pavilion: String,
    floors: Number,
    maxFloor: Number,
    area: String,
    dateFinished: Date,
    dateFinishedStr: String,
    prisePerMeterStr: String,
    prisePerMeter: Number,
    oldCoastStr:String,
    oldCoast: Number,
    coast: Number
});


module.exports = mongoose.model('flats', DevelopersSchema);