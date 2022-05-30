import { createStore } from 'vuex'
import { modeller } from "@/store/modeller/modeller"
import { popups } from "@/store/popups/popups"
import { panel } from "@/store/panel/panel"
import { tree } from "@/store/tree/tree"
import { helper } from "@/store/helper/helper"

const store = createStore({
    namespaced: true,
    modules: {
        modeller,
        popups,
        panel,
        tree,
        helper
    },
})

export default store;