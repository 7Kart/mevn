import axios from 'axios';
import statisticBuilder from '../assets/js/statisticBuilder'

export default {
    state: {
        statistic: []
    },
    mutations: {
        getStatistic(state, statistic) {
            statistic.forEach(element => {
                JSON.dateParser(element)
            });
            state.statistic = statistic;
        }
    },

    actions: {
        getStatistic({ commit }, payload) {
            axios.get(`${process.env.VUE_APP_HOST}/statistics/GetStatistics`, {
                params: {
                    dtStart: new Date(2020, 1, 1),
                    dtEnd: new Date(),
                }
            })
                .then(res => {
                    commit('getStatistic', res.data);
                })
                .catch(err => {
                    console.log('statistic error', err);
                })
        }
    },

    getters: {
        GetMeanValue: state => (startDate, endDate, stap) => {
            return statisticBuilder(state.statistic, startDate, endDate, stap)
        }
    }
}