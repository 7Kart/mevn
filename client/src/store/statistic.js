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
                params: payload
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