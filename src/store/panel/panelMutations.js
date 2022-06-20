import { defaultMutation } from "@/assets/helper";

export const panelMutations = {
    toggleReview: defaultMutation("review"),
    setDrawing: defaultMutation("drawing"),
    drawingSquare: defaultMutation("drawingSquare"),
    drawingPoint: defaultMutation("drawingPoint"),
    drawingCircle: defaultMutation("drawingCircle"),
    setExport: defaultMutation("exportModal"),
    setSave: defaultMutation("saveModal"),
    setAxis: defaultMutation("addCoordinates"),
    setModelingCube: defaultMutation("modelingCube"),
    setModelingCylinder: defaultMutation("modelingCylinder"),
    setModelingSphere: defaultMutation("modelingSphere"),
    setSettingsModal: defaultMutation("settingsModal"),
    removeAllOperations: (state) => {
        state.drawingSquare = false;
        state.drawingPoint = false;
    }
}