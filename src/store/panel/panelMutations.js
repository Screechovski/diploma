import { defaultMutation } from "@/assets/helper";

export const panelMutations = {
    toggleReview: defaultMutation("review"),
    setDrawing: defaultMutation("drawing"),
    drawingSquare: defaultMutation("drawingSquare"),
    drawingPoint: defaultMutation("drawingPoint"),
    setExport: defaultMutation("exportModal"),
    setSave: defaultMutation("saveModal"),
    removeAllOperations: (state) => {
        state.drawingSquare = false;
        state.drawingPoint = false;
    }
}