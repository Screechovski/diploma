import Modeller from "@/modeller"

export default {
    namespaced: true,
    state: () => ({
        inited: false,
        instance: null
    }),
    getters: {},
    mutations: {
        setInstance: (state, value) => {
            state.instance = value
        }
    },
    actions: {
        init: (context, ref = "") => {
            context.commit('setInstance', new Modeller(ref));
        }
    }
}