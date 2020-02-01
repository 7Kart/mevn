const Flat = require('./Flat');

module.exports = class A101Flat extends Flat {
    //сравнивает все поля с полями в базе и возвращает поля значения 
    compareWithDbEntity(dbFlat) {
        var difference = {
            new: {},
            old: {}
        };
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                if (this[key] instanceof Date) {
                    if (this[key].getTime() != dbFlat[key].getTime()) {
                        difference[key] = dbFlat[key];
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
}
