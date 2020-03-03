const Flat = require('./Flat');

module.exports = class PickFlat extends Flat{
    constructor(flat, projectId){
        super();   
        this.href = `https://www.pik.ru/${flat.block.url}/flats/${flat.id}`  
        this.imgSrc = flat.layout.flat_plan_png;
        this.roomsCount = flat.rooms == "studio" ? 1 : flat.rooms;
        this.floor = flat.floor;
        this.block = (flat.status === "free") ? false : true;
        this.idOrigin = flat.id;
        this.coast = flat.price;
        this.area = flat.area;
        this.whitebox = flat.finish.whiteBox;
        this.design = flat.finish.isFinish;
        this.fursnishing = flat.furniture;
        this.district = flat.block.name;
        this.pavilion = flat.bulk.name;
        this.dateFinished = new Date(1*flat.bulk.settlement_year, 0, 1);
        this.prisePerMeter = flat.price / flat.area;
        this.projectId = projectId;
    }
}
