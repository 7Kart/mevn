import axios from 'axios';

export default {
    state: {
        developers: [],
        developersProjects: []
    },
    mutations: {
        getAllDevelopers(state) {
            axios.get('http://localhost:8081/developers/GetAllDevelopers')
                .then(res => {
                    console.log("developers", res)
                    if (res.status == 200) {
                        state.developers = res.data;
                    }
                })
                .catch((e) => {
                    console.log("QUERY ERROR", e.response)
                })
        },
        getDevelopersProjects(state, payload) {
            axios.get('http://localhost:8081/developers/getDevelopersProjects', {
                params: {
                    ids: payload
                }
            })
                .then(res => {
                    console.log("res", res)
                    state.developersProjects = res.data.projects;
                })
                .catch(e => {
                    console.log(`QUERY ERROR`, e.response);
                })
        }
    },
    actions: {
        getAllDevelopers({ commit }) {
            commit("getAllDevelopers");
        },
        getDevelopersProjects({ commit }, payload) {
            commit("getDevelopersProjects", payload);
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