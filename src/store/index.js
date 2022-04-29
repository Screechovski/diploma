import { createStore } from 'vuex'
import modeller from "@/store/modeller"
import popups from "@/store/popups"
import panel from "@/store/panel"
import tree from "@/store/tree"

const store = createStore({
    namespaced: true,
    modules: {
        modeller,
        popups,
        panel,
        tree
    },
})

export default store;