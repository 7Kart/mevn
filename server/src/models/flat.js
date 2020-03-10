const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FlatSchema = new Schema({
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
    dtCheck: Date,
    block: {
        type: Boolean,
        default: false
    },
    dateInsert: {
        type: Date,
        default: Date.now
    },
});

FlatSchema.static('getFlatWithPag', function(query, page){
    return this.find(query)
    .skip(page * 20)
    .limit(20);
});

FlatSchema.static('updateDtCheck', function(flatIds, dtCheck){
    return this.updateMany({_id:{$in:flatIds}}, {dtCheck:dtCheck})
})

module.exports = mongoose.model('flats', FlatSchema);