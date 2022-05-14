import { defaultGettersObject, defaultMutation } from "../assets/helper";

export default {
    namespaced: true,
    state: () => ({
        coordinateAxes: false,
        review: false,
        square: false,
        addCoordinates: false,
    }),
    getters: defaultGettersObject([
        "coordinateAxes",
        "review",
        "square",
        "addCoordinates"
    ]),
    mutations: {
        toggleReview: defaultMutation("review")
    },
    actions: {
        coordinateAxesClick: (context) => {
            context.dispatch("popups/showPopup", "coordinateAxes", {root: true});
        },
        coordinateAxesSubmit: (context, value) => {
            context.dispatch('modeller/setCoordinates', value, {root: true})
            context.dispatch('popups/hidePopup', "coordinateAxes", {root: true})
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
        squareClick: (context) => {
            context.dispatch("popups/showPopup", "rectangleParams", {root: true});
        },
        squareSubmit: (context, value) => {
            context.dispatch("popups/hidePopup", "rectangleParams", {root: true});
            context.dispatch('modeller/drawSquare', value, {root: true})
        },
        addCoordinateClick: (context) => {
            context.dispatch("popups/showPopup", "axesHelperPostion", {root: true});
        },
    }
}