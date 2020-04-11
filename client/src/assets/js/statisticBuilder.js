export default function (flats, dateStart, dateEnd, stap) {
    const res = [];

    while (dateStart < dateEnd) {
        dateStart.setDate(dateStart.getDate() + stap)

        let statistic = {
            date: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()),
            meanValue: 0
        }

        let coasts = [];

        flats.forEach(flat => {
            if (dateStart <= flat.dtCheck && dateStart >= flat.dateInsert) {

                let changes = [...flat.changes];

                changes.push({
                    prisePerMeter: flat.prisePerMeter,
                    coast: flat.coast,
                    dtChanges: flat.dtCheck
                });

                let currentFlatCoast = changes[0].prisePerMeter;

                for (let changeInd = 1; changeInd < changes.length; changeInd++) {
                    if (changes[changeInd].dtChanges < dateStart) {
                        currentFlatCoast = changes[changeInd].prisePerMeter;
                    }
                }
                coasts.push(currentFlatCoast)
            }
        });

        statistic.meanValue = coasts.reduce((sum, curCoast) => {
            return sum + curCoast;
        }, 0) / coasts.length;
        if (statistic.meanValue)
            res.push(statistic)
    }
    return res;
}