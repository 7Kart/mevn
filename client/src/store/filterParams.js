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
        developerFilter:[],
        areaRange: null,
        roomCountRange: null          
    },

    mutations:{
        setDeveloperFilter(state, payload){
            console.log('payload', payload)
            state.developerFilter = payload.developerFilter;
            state.projectFilter = payload.projectFilter;
            state.areaRange = payload.areaRange;
            state.roomCountRange = payload.roomCountRange;
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
            return ! state.roomCountRange ? [state.roomCount.min, state.roomCount.max] : state.roomCountRange;
        },
        getAreaFilter: state =>{
            return state.area;
        },
        getAreaRange: state =>{
            return !state.areaRange ? [state.area.min, state.area.max] : state.areaRange;
        },
        getAllFilterValues: state => {
            return {
                projectFilter: state.projectFilter,
                developerFilter: state.developerFilter,
                areaRange: state.areaRange,
                roomCountRange: state.roomCountRange
            }
        },
        getDeveloperFilter: state => {
            return state.developerFilter;
        }        
    }
}