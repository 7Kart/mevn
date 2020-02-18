import axios from 'axios';

export default {
    state: {
        flats: [],
        currentPage: 0,
        flatIsLoading: false
    },
    mutations: {
        getFlats(state, payload) {
            state.flatIsLoading = true;
            axios.get("http://localhost:8081/flats/GetFlats", {
                params: {
                    page: state.currentPage
                }
            })
                .then((res => {
                    if (res.status == 200) {
                        state.flats.push(...res.data.flats);
                    }
                }))
                .catch(e => {
                    console.log(`Get flats error`);
                })
                .finally(() => {
                    state.flatIsLoading = false;
                });
        },
        changePage(state) {
            state.currentPage++;
        }
    },
    actions: {
        getFlats({ commit }, payload) {
            commit("getFlats", payload);
        },
        changePage({ commit }) {
            commit("changePage");
        }
    },
    getters: {
        getFlats: state => {
            return state.flats
        },
        getFlatsLoadingStatus: state =>{
            return state.flatIsLoading;
        }
    }
}