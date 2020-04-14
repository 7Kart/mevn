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
                chart.data = chart.assemblyChartData(payload.chartData);
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