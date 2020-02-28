export default {
    state:{
        roomCount:{
            max: 6,
            min: 1
        },
        area:{
            max:100,
            min:10
        },      
        projectFilter:[],
        developerFilter:[]          
    },

    mutations:{
        setDeveloperFilter(state, payload){
            state.developerFilter = payload;
        }
    },

    actions:{
        setDeveloperFilter({commit}, payload){
            commit("setDeveloperFilter", payload);
        }
    },

    getters: {
        getRoomCountFilter: state => {
            return state.roomCount; 
        },
        getRommRange: state => {
            return [state.roomCount.min, state.roomCount.max]
        },
        getAreaFilter: state =>{
            return state.area;
        },
        getAreaRange: state =>{
            return [state.area.min, state.area.max];
        },
        getAllFilterValues: state => {
            return {
                projectsIds: state.projectFilter,
                developersIds: state.developerFilter
            }
        },
        getDeveloperFilter: state => {
            return state.developerFilter;
        }        
    }
}