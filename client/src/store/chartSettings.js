import axios from "axios";
import statisticBuilder from '../assets/js/statisticBuilder'

export default {
    state: {
        charts: [{
            id: 1,
            name: "test",
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                fill: false
            },
            filter: {
                dtStart: new Date(2020, 1, 1),
                dtEnd: new Date(),
                intervalStep: 5
            },
            data: []
        },
        {
            id: 2,
            name: "test2",
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                fill: false
            },
            filter: {
                dtStart: new Date(2020, 3, 1),
                dtEnd: new Date(),
                intervalStep: 5
            },
            data: []
        }]
    },

    mutations: {
        GetAllCrartsData(state, payload) {
            const chart = state.charts.find(chart => chart.id == payload.chartId)
            if (chart) {
                payload.chartData.forEach(data => {
                    JSON.dateParser(data)
                });
                chart.data = payload.chartData
             }
        }
    },

    actions: {

        GetAllCrartsData({ state, commit }) {
            for (let chart of state.charts) {
                axios.get(`${process.env.VUE_APP_HOST}/statistics/GetStatistics`, {
                    params: {
                        dtStart: chart.filter.dtStart,
                        dtEnd: chart.filter.dtEnd,
                    }
                }).then(res => {
                    commit('GetAllCrartsData', {
                        chartData: res.data,
                        chartId: chart.id
                    });
                }).catch(err => {
                    console.log('query error', err);
                });
            };
        }
    },

    getters: {
        getCharts: (state) => {
            return state.charts;
        },

        getChartsDatasets: state => idChart => {
            const chart = state.charts.find(chart => chart.id == idChart)
            if (chart) {
                const meanValue = statisticBuilder(chart.data, chart.filter.dtStart, chart.filter.dtEnd, chart.filter.intervalStep)
                return {
                    labels: meanValue.map(
                        state =>
                            `${state.date.getDate()}. ${state.date.getMonth() +
                            1}. ${state.date.getFullYear()}`
                    ), datasets: [
                        {
                            label: "Цена за квадрат",
                            backgroundColor: "#1565c057",
                            borderColor: "#1565c0",
                            borderWidth: 1,
                            pointBorderColor: "#07519a",
                            data: meanValue.map(state => state.meanValue)
                        }
                    ]
                }
            }
        }
    }

}