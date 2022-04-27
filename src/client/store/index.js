import { createStore } from 'vuex'
import modeller from './modeller/modeller'

const store = createStore({
    namespaced: true,
    modules: {
        modeller
    },
})

export default store;