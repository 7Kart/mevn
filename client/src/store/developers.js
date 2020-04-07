import axios from 'axios';

export default {
    state: {
        developers: [],
        developersProjects: []
    },
    mutations: {
        getAllDevelopers(state, payload) {
            state.developers = payload;
        },
        getDevelopersProjects(state, payload) {
            state.developersProjects = payload;
        }
    },
    actions: {
        getAllDevelopers({ commit }) {
            axios.get(`${process.env.VUE_APP_HOST}/developers/GetAllDevelopers`)
                .then(res => {
                    console.log("developers", res)
                    if (res.status == 200) {
                        commit("getAllDevelopers", res.data);
                    }
                })
                .catch((e) => {
                    console.log("QUERY ERROR", e.response)
                });
        },
        getDevelopersProjects({ commit }, payload) {
            axios.get(`${process.env.VUE_APP_HOST}/developers/getDevelopersProjects`, {
                params: {
                    ids: payload
                }
            })
                .then(res => {
                    commit("getDevelopersProjects", res.data.projects);
                })
                .catch(e => {
                    console.log(`QUERY ERROR`, e.response);
                });
        }
    },
    getters: {
        getDevelopers: state => {
            return state.developers;
        },
        getDevelopersProject: state => {
            return state.developersProjects;
        }
    },
}