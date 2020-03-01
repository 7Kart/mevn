import axios from 'axios';
import filterParams from "./filterParams";

export default {
    modules: {
        filterParams
    },

    state: {
        flats: [],
        currentPage: 0,
        flatIsLoading: false
    },
    mutations: {
        getFlats(state, payload) {
            if (state.currentPage == 0)
                state.flats = payload;
            else
                state.flats.push(...payload);
        },
        changePage(state, payload) {            
            if (payload === undefined || payload === null)
                state.currentPage++;
            else
                state.currentPage = payload;
        },
        changeLoadFlatFlag(state, payload) {
            state.flatIsLoading = payload;
        }
    },
    actions: {
        getFlats({ state, commit }, payload) {
            commit("changeLoadFlatFlag", true);
            axios.get("http://localhost:8081/flats/GetFlats", {
                params: {
                    page: state.currentPage,
                    ...payload
                }
            })
                .then((res => {
                    if (res.status == 200) {
                        commit("getFlats", res.data.flats);
                    }
                }))
                .catch(e => {
                    console.log(`Get flats error`);
                })
                .finally(() => {
                    commit("changeLoadFlatFlag", false);
                });
        },

        changePage({ commit }, payload) {
            commit("changePage", payload);
        }
    },
    getters: {
        getFlats: state => {
            return state.flats
        },
        getFlatsLoadingStatus: state => {
            return state.flatIsLoading;
        }
    }
}