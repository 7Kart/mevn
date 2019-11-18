module.exports = class Flat {
    constructor() {
        this.imgSrc = null;
        this.imgSrc = null;
        this.roomsCount = null;
        this.district = null;
        this.pavilion = null;
        this.maxFloor = null;
        this.area = null;
        this.dateFinished = null;
        this.dateFinishedStr = null;
        this.prisePerMeterStr = null;
        this.prisePerMeter = null;
        this.oldCoastStr = null;
        this.coastStr = null;
        this.oldCoast = null;
        this.coast = null;
        this.whitebox = null;
        this.mortgagershb = null;
        this.ignore = null;
        this.idOrigin = null;
        this.href = null;
        this.fursnishing = null;
        this.floor = null;
        this.design = null;
        this.business = null;
    }

    compareWithDbEntity(dbFlat) {
        var difference = {};
        for (let [key, flat] in this) {
            if (this.hasOwnProperty(key)) {
                if (flat instanceof Date) {
                    if (flat.getTime() != dbFlat[key].getTime()) {
                        difference[key] = dbFlat[key];
                    }
                } else {
                    if (flat != dbFlat[key]) {
                        difference[key] = dbFlat[key];
                    }
                }
            }
        }

        return difference;
    }
};