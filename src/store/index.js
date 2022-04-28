import { createStore } from 'vuex'
import modeller from "@/store/modeller"
import popups from "@/store/popups"
import panel from "@/store/panel"

const store = createStore({
    namespaced: true,
    modules: {
        modeller,
        popups,
        panel
    },
})

export default store;