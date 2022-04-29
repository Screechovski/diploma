import { defaultGettersObject, defaultMutation } from "../assets/helper";

export default {
    namespaced: true,
    state: () => ({
        coordinateAxes: false,
        review: false,
        square: false,
    }),
    getters: defaultGettersObject([
        "coordinateAxes",
        "review",
        "square"
    ]),
    mutations: {
        toggleReview: defaultMutation("review")
    },
    actions: {
        coordinateAxesClick: (context) => {
            context.dispatch("popups/showPopup", "coordinateAxes", {root: true});
        },
        reviewClick: (context) => {
            if (context.state.review) {
                context.commit('toggleReview', false)
                context.dispatch('modeller/enableReview', false, {root: true})
            } else {
                context.commit('toggleReview', true)
                context.dispatch('modeller/enableReview', true, {root: true})
            }
        },
        coordinateAxesSubmit: (context, value) => {
            context.dispatch('modeller/setCoordinates', value, {root: true})
            context.dispatch('popups/hidePopup', "coordinateAxes", {root: true})
        }
    }
}