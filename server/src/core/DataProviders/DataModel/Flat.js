module.exports = class Flat {
    constructor() {
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
        this.block = false;
        this.projectId = null;
        this.dtCheck = null;
    }

    compareWithDbEntity(dbFlat) {
      
        const ignorFields = ["projectId", "district", "dtCheck"];
        
        var difference = {
            new: {},
            old: {}
        };

        for (let key in this) {
            if (this.hasOwnProperty(key) && ignorFields.indexOf(key) < 0) {
                if (this[key] instanceof Date) {
                    if (this[key].getTime() != dbFlat[key].getTime()) {
                        difference.new[key] = this[key];
                        difference.old[key] = dbFlat[key];
                    }
                } else {    
                    if (this[key] != dbFlat[key]) {
                        difference.new[key] = this[key];
                        difference.old[key] = dbFlat[key];
                    }
                }
            }
        }
        
        return difference;
    }
};