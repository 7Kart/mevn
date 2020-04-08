export default function extandJson() {
    if (window.JSON && !window.JSON.dateParser) {
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

        JSON.dateParser = function (object) {
            for (let key in object) {
                if (typeof object[key] === 'string') {
                    let isDate = reISO.exec(object[key]);
                    if (isDate)
                        object[key] = new Date(object[key])
                    else {
                        isDate = reMsAjax.exec(object[key]);
                        if (isDate) {
                            let dateArr = isDate[1].split(/[-+,.]/);
                            object[key] = new Date(dateArr[0] ? +dateArr[0] : 0 - +dateArr[1]);
                        }
                    }

                } else if (object[key] instanceof Array) {
                    object[key].forEach(element => {
                        this.dateParser(element)
                    });
                }
            }
        };
    }
}
