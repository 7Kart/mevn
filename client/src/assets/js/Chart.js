import ChartDataBuilder from './ChartDataBuilder'

export default class {
    constructor(id, name = 'default chart', chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        fill: false
    }, filter = {
        dtStart: new Date(2020, 1, 1),
        dtEnd: new Date(),
        intervalStep: 5
    }, lines = [{
        label: "Цена за квадрат",
        backgroundColor: "#1565c057",
        borderColor: "#1565c0",
        borderWidth: 1,
        pointBorderColor: "#07519a",
        action: "GetMeanValue"
    }]) {
        this.id = id;
        this.name = name;
        this.chartOptions = chartOptions;
        this.filter = filter;
        this.rowData = [];
        this.data = [];
        this.chartData = [];
        this.chartLabels = [];
        this.lines = lines;
    }

    assemblyChartData(rowData) {

        const chartsLabels = ChartDataBuilder.GetDateRange(this.filter);
        const datasets = []
        this.lines.forEach(line => {
            const data = ChartDataBuilder[line.action](chartsLabels, rowData)
            datasets.push({
                ...line,
                data: data
            })

        });

        return {
            labels: chartsLabels.map(
                date => `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
            ),
            datasets: datasets
        }
    }

}


