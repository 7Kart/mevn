import axios from 'axios';

export default {
    state: {
        flats: []
    },
    mutations: {
        getFlats(state, payload) {

            console.log(`get flats`);

            axios.get("http://localhost:8081/flats/GetFlats", {
                params: {}
            })
                .then((res => {
                    if (res.status == 200) {
                        state.flats = res.data.flats;
                    }
                }))
                .catch(e => {
                    console.log(`Get flats error`);
                })
        }
    },
    actions: {
        getFlats({ commit }, payload) {
            commit("getFlats", payload);
        }
    },
    getters: {
        getFlats: state => {
            return state.flats
        }
    }
}