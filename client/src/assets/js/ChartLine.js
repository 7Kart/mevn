export default class {
    constructor(label, backgroundColor, borderColor, borderWidth, pointBorderColor, isFinished, isWhiteBox, projectsIds, action) {
        this.label = label || "Цена за квадрат";
        this.backgroundColor = backgroundColor || "#1565c057";
        this.borderColor = borderColor || "#1565c0";
        this.borderWidth = borderWidth || 2;
        this.pointBorderColor = pointBorderColor || "#1565c0";
        this.isWhiteBox = typeof isWhiteBox === undefined ? true : false;
        this.isFinished = typeof isFinished === undefined ? true : false;
        this.projectsIds = projectsIds || [];
        this.action = action || "GetMeanValue";
    }

}
