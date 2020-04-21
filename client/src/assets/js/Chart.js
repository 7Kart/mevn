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
            intervalStep: 1
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
            const filteredData = rowData.filter(flat => {
                if (line.filter.hasOwnProperty("projectsIds")) {
                    if (line.filter.projectsIds.indexOf(flat.projectId) === -1)
                        return false;
                }
                return true
            })
            const data = ChartDataBuilder[line.action](chartsLabels, filteredData)
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
            flatsCountRange: [],
            projectsIds: [],
            isWhiteBox: [],
            isDesign: []
        };
        this.lines.forEach(line => {
            const linesFilters = line.filter;
            for (let key in linesFilters) {
                if (key == "isWhiteBox" || key == "isDesign") {
                    if (filter[key].indexOf(linesFilters[key]) == -1) {
                        filter[key].push(linesFilters[key])
                    }
                } else if (key == "flatsCountRange") {
                    for (let i = linesFilters[key][0]; i <= linesFilters[key][1]; i++) {
                        if (filter[key].indexOf(i) == -1) {
                            filter[key].push(i);
                        }
                    }
                } else if (key == "projectsIds") {
                    for (let id of linesFilters[key]) {
                        if (filter[key].indexOf(id) == -1) {
                            filter[key].push(id)
                        }
                    }
                }
            }
        });

        console.log('redy filter', filter);
        return filter;
    }

    getDefaultLine() {
        return new ChartLine("Цена за квадрат",
            "#1565c057",
            "#123242c0",
            2,
            "#1565c0",
            false,
            true,
            [],
            "GetMeanValue")
    }

}