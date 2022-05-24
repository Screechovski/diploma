import { defaultGettersObject, defaultMutation } from "../assets/helper";

export default {
    namespaced: true,
    state: () => ({
        coordinateAxes: false,
        review: true,
        square: false,
        addCoordinates: false,
        drawing: false,
    }),
    getters: defaultGettersObject([
        "coordinateAxes",
        "review",
        "square",
        "addCoordinates",
        "drawing",
    ]),
    mutations: {
        toggleReview: defaultMutation("review"),
        setDrawing: defaultMutation("drawing")
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
            context.dispatch("modeller/drawSquare", value, {root: true})
            context.dispatch("tree/getTree", null, {root:true})
        },
        addCoordinateClick: (context) => {
            context.dispatch("popups/showPopup", "axesHelperPostion", {root: true});
        },
        sphereClick: (context) => {
            context.dispatch("popups/showPopup", "sphereParams", {root: true});
        },
        sphereSubmit: (context, value) => {
            context.dispatch("popups/hidePopup", "sphereParams", {root: true});
            context.dispatch("modeller/drawSphere", value, {root: true})
            context.dispatch("tree/getTree", null, {root:true})
        },
        cylinderClick: (context) => {
            context.dispatch("popups/showPopup", "cylinderParams", {root: true});
        },
        cylinderSubmit: (context, value) => {
            console.log(value);
            context.dispatch("popups/hidePopup", "cylinderParams", {root: true});
            context.dispatch('modeller/drawCylinder', value, {root: true})
            context.dispatch("tree/getTree", null, {root:true})
        },
        setDrawing: (context, value) => {
            context.commit("setDrawing", value);
        }
    }
}