export default class {
    constructor(id, name = 'default chart', chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        fill: false
    }, filter = {
        dtStart: new Date(2020, 1, 1),
        dtEnd: new Date(),
        intervalStep: 5
    }) {
        this.id = id;
        this.name = name;
        this.chartOptions = chartOptions;
        this.filter = filter;
        this.data = [];
        this.lines = [{
            label: "Цена за квадрат",
            backgroundColor: "#1565c057",
            borderColor: "#1565c0",
            borderWidth: 1,
            pointBorderColor: "#07519a",
            data:[]
        }];
    }
}


