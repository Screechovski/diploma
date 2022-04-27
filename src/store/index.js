import { createStore } from 'vuex'
import modeller from '@/store/modeller'

const store = createStore({
    namespaced: true,
    modules: {
        modeller
    },
})

export default store;