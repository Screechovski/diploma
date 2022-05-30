import { createStore } from 'vuex'
import { modeller } from "@/store/modeller/modeller"
import { popups } from "@/store/popups/popups"
import { panel } from "@/store/panel/panel"
import { tree } from "@/store/tree/tree"

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