export default class {
    constructor(label, backgroundColor, borderColor, borderWidth, pointBorderColor, isFinished, isWhiteBox, projectsIds, action) {
        this.label = label || "Цена за квадрат";
        this.backgroundColor = backgroundColor || "#1565c057";
        this.borderColor = borderColor || "#1565c0";
        this.borderWidth = borderWidth || 2;
        this.pointBorderColor = pointBorderColor || "#1565c0";

        this.action = action || "GetMeanValue";
        this.filter = {
            isWhiteBox: typeof isWhiteBox === undefined ? true : isWhiteBox,
            isFinished: typeof isFinished === undefined ? true : isFinished,
            projectsIds: projectsIds || []
        }
    }

    getActiveFilter() {
        console.log('getActiveFilter', this);
        // for(let key in this.filter){
        //     console.log('typeof this.filter[key]',key , typeof this.filter[key]);  
        // }
    }

    getCopy() {
        return new this.constructor(this.label,
            this.backgroundColor,
            this.borderColor,
            this.borderWidth,
            this.pointBorderColor,
            this.filter.isFinished,
            this.filter.isWhiteBox,
            this.filter.projectsIds,
            this.action)
    }

    updateLine(newLine) {
        for (let key in this) {
            this[key] = newLine[key]
        }
    }

}
