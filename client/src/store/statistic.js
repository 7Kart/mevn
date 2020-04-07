import axios from 'axios';

export default {
    state: {

    },
    mutations: {
        getStatistic(state, statistic) {
            console.log('statistic', statistic);
        }
    },

    actions: {
        getStatistic({ commit }, payload) {
            axios.get(`${process.env.VUE_APP_HOST}/statistics/GetStatistics`, {
                params: payload
            })
            .then(res=>{
                commit('getStatistic', res.data);
            })
            .catch(err=>{
                console.log('statistic error');
            })
        }
    },

    getters: {

    }
}