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
    isSold: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    dateInsert: {
        type: Date,
        default: Date.now
    },
});

FlatSchema.static('getFlatWithPag', function (query, page) {
    return this.find(query)
        .skip(page * 20)
        .limit(20);
});

FlatSchema.static('updateDtCheck', function (flatIds, dtCheck) {
    return this.updateMany({ _id: { $in: flatIds } }, { dtCheck: dtCheck })
});

FlatSchema.static('getLastCheckDate', function (projectId) {
    return this.find({ dtCheck: { $ne: null }, projectId:projectId }, { _id: 0, dtCheck: 1 }).sort({ dtCheck: -1 }).limit(1)
});

FlatSchema.static('changeSaleStatus', function (saleFlatIds) {
    return this.updateMany({ _id: { $in: saleFlatIds } }, { isSold: true })
})

FlatSchema.static('getNotCheckedFlats', function (projectId, date) {
    return this.find({
        $or: [{
            dtCheck: { $lt: date }
        }, {
            dtCheck: null
        }],
        projectId: projectId,
        isSold: false
    }, {
        dtCheck: 1,
        district: 1,
        href: 1,
        idOrigin: 1,
        projectId: 1,
        isSold: 1
    })
});

FlatSchema.static("getFlatsByIdOrigAndProjectId", function (originIds, projectId) {
    return this.find({
        idOrigin: { $in: webFlatsIds },
        projectId: project._id
    });
})


module.exports = mongoose.model('flats', FlatSchema);