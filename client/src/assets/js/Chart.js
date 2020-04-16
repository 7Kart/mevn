import ChartDataBuilder from './ChartDataBuilder';
import ChartLine from './ChartLine';

export default class {
    constructor(id, name, chartOptions, filter, lines = []) {
        this.id = id;
        this.name = name || 'default chart';
        this.chartOptions = chartOptions || {
            responsive: true,
            maintainAspectRatio: false,
            fill: false
        };
        this.filter = filter || {
            dtStart: new Date(2020, 1, 1),
            dtEnd: new Date(),
            intervalStep: 5
        };
        this.rowData = [];
        this.data = [];
        this.chartData = [];
        this.chartLabels = [];
        this.lines = lines.length == 0 ? [new ChartLine()] : lines;
    }

    assemblyChartData(rowData) {
        const chartsLabels = ChartDataBuilder.GetDateRange(this.filter);
        const datasets = []
        this.lines.forEach(line => {
            const data = ChartDataBuilder[line.action](chartsLabels, rowData)
            datasets.push({
                ...line,
                data: data
            });
        });

        return {
            labels: chartsLabels.map(
                date => `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
            ),
            datasets: datasets
        }
    }

    addNewLine(line) {
        this.lines.push(line)
    }

    getCommonFilter() {
        let filter = {
            dtStart: this.filter.dtStart,
            dtEnd: this.filter.dtEnd,
        };
        this.lines.forEach(line => {
            // for (let key in line) {
            //     if (filter.hasOwnProperty(key)) {

            //     }
            // }
            console.log('line in chart', line);
            line.getActiveFilter()
        });
    }

    getDefaultLine() {
        const defaultLine = new ChartLine("Цена за квадрат",
        "#1565c057",
        "#1565c0",
        2,
        "#1565c0",
        false,
        true,
        [],
        "GetMeanValue")
        
        console.log('create line', defaultLine);

        return defaultLine
    }

}


