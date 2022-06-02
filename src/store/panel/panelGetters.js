import { defaultGettersObject } from "@/assets/helper";

export const panelGetters = {
    ...defaultGettersObject([
        "coordinateAxes",
        "review",
        "square",
        "addCoordinates",
        "drawing",
        "drawingSquare",
        "drawingPoint",
    ]),
    getCurrentOperation: state => {
        if (state.review) {
            return "review"
        }
        if (state.drawingSquare) {
            return "square"
        }
        if (state.drawingPoint) {
            return "point"
        }
    }
}