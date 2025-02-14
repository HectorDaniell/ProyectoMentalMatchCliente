import { createStore } from 'vuex'

export default createStore({
    state:{
        token:'',
        email:'',
        tokenGoogle:''
    },
    getters:{

    },
    mutations:{
        setToken(state,value){
            state.token = value;
        },
        setEmail(state,value){
            state.email = value;
        },
        setTokenGoogle(state,value){
            state.tokenGoogle = value
        }
    },
    actions:{

    },
    modules:{

    }
})