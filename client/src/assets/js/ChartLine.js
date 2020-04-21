export default class {
    constructor(label, backgroundColor, borderColor, borderWidth, pointBorderColor, isDesign = true, isWhiteBox = true, projectsIds, action, roomsCount, flatsCountRange) {
        this.label = label || "Цена за квадрат";
        this.backgroundColor = backgroundColor || "#1565c057";
        this.borderColor = borderColor || "#1565c0";
        this.borderWidth = borderWidth || 2;
        this.pointBorderColor = pointBorderColor || "#1565c0";
        this.action = action || "GetMeanValue";
        this.filter = {
            isWhiteBox: isWhiteBox,
            isDesign: isDesign,
            projectsIds: projectsIds || ["5e249cc11335fa000067e083"],
            flatsCountRange: flatsCountRange || [1, 6]
        }
        this.roomsCount = roomsCount || 0
    }

    getActiveFilter() {
        let filter = {};
        for (let key in this.filter) {
            if (typeof this.filter[key] == "boolean") {
                if (this.filter[key] === true)
                    filter[key] = this.filter[key];
            } else if (this.filter[key] instanceof Array && this.filter[key].length > 0) {
                filter[key] = this.filter[key];
            }
        }
        return filter;
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
