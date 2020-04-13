import axios from "axios";
import statisticBuilder from '../assets/js/statisticBuilder'
import Chart from '../assets/js/Chart'

export default {
    state: {
        charts: []
    },

    mutations: {
        GetChartData(state, payload) {
            const chart = state.charts.find(chart => chart.id == payload.chartId)
            if (chart) {
                payload.chartData.forEach(data => {
                    JSON.dateParser(data)
                });

                const meanValue = statisticBuilder(payload.chartData, chart.filter.dtStart, chart.filter.dtEnd, chart.filter.intervalStep)
                chart.data = {
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
        },
        GetLocalChart(state, charts) {
            state.charts.push(...charts);
        }
    },

    actions: {
        GetLocalChart({ commit }) {
            let chart = new Chart(1);
            let chart1 = new Chart(2);
            commit("GetLocalChart", [chart]);
        },
        GetChartData({ commit, state }, idChart) {
            const chart = state.charts.find(chart => {
                return chart.id == idChart;
            });

            axios.get(`${process.env.VUE_APP_HOST}/statistics/GetStatistics`, {
                params: {
                    dtStart: chart.filter.dtStart,
                    dtEnd: chart.filter.dtEnd,
                }
            }).then(res => {
                commit('GetChartData', {
                    chartData: res.data,
                    chartId: idChart
                });
            }).catch(err => {
                console.log('query error', err);
            });
        }
    },

    getters: {
        getCharts: (state) => {
            return state.charts;
        }
    }

}