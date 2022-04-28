import { defaultGettersObject } from "@/assets/helper"

export default {
    namespaced: true,
    state:() => ({
        coordinateAxes: false
    }),
    getters: defaultGettersObject(["coordinateAxes"]),
    mutations: {
        showPopup: (state, key) => {
            state[key] = true
        },
        hidePopup: (state, key) => {
            state[key] = false
        },
    },
    actions: {
        showPopup: (context, key) => {
            context.commit('showPopup', key)
        },
        hidePopup: (context, key) => {
            context.commit('hidePopup', key)
        }
    }
}