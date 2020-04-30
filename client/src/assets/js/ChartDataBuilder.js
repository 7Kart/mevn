export default class ChartDataBuilder {

    static GetDateRange({ dtStart, dtEnd, intervalStep }) {
        let dates = [];
        let curDate = new Date(dtStart);
        dtEnd.setHours(0, 0, 0, 0);
        while (curDate <= dtEnd) {
            dates.push(new Date(curDate));
            curDate.setDate(curDate.getDate() + intervalStep)
        }

        if (curDate.getTime() > dtEnd.getTime() && dates[dates.length - 1].getTime() != dtEnd.getTime()) {
            dates.push(new Date(dtEnd));
        }
        return dates
    }

    static GetMeanValue(dates, flats) {
        let meanValues = [];

        for (let date of dates) {

            let coasts = [];
            flats.forEach(flat => {
                let changes = [...flat.changes];

                changes.push({
                    prisePerMeter: flat.prisePerMeter,
                    coast: flat.coast,
                    dtChanges: flat.dtCheck
                });

                if (flat.dateInsert <= date && date <= flat.dtCheck) {
                    let currentFlatCoast = changes[0].prisePerMeter;
                    for (let changeInd = 1; changeInd < changes.length; changeInd++) {
                        if (changes[changeInd].dtChanges < date) {
                            currentFlatCoast = changes[changeInd].prisePerMeter;
                        }
                    }
                    coasts.push(currentFlatCoast)
                }
            });
            const meanValue = coasts.reduce((sum, coast) => sum + coast, 0) / coasts.length
            meanValues.push(meanValue.toFixed(2));
        }
        return meanValues;
    }
} 