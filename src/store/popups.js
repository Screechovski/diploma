import { defaultGettersObject } from "@/assets/helper"

export default {
    namespaced: true,
    state:() => ({
        coordinateAxes: false,
        rectangleParams: false,
    }),
    getters: defaultGettersObject([
        "coordinateAxes",
        "rectangleParams"
    ]),
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