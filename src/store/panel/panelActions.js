import { FlagAliases } from "@/assets/constants";
import { UserHelp } from "@/assets/constants";

export const panelActions = {
    coordinateAxesClick: (context) => {
        context.dispatch("popups/showPopup", "coordinateAxes", {root: true});
    },
    coordinateAxesSubmit: (context, value) => {
        context.dispatch("modeller/setCoordinates", value, {root: true})
        context.dispatch("popups/hidePopup", "coordinateAxes", {root: true})
    },
    reviewClick: (context) => {
        if (context.state.review) {
            context.commit("toggleReview", false)
            context.dispatch("modeller/enableReview", false, {root: true})
        } else {
            context.commit("toggleReview", true)
            context.dispatch("modeller/enableReview", true, {root: true})
            context.commit("drawingSquare", false)
            context.commit("drawingPoint", false)
        }
    },
    squareClick: (context) => {
        context.dispatch("popups/showPopup", "rectangleParams", {root: true});
    },
    squareSubmit: (context, value) => {
        context.dispatch("popups/hidePopup", "rectangleParams", {root: true});
        context.dispatch("modeller/drawSquare", value, {root: true})
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
    },
    cylinderClick: (context) => {
        context.dispatch("popups/showPopup", "cylinderParams", {root: true});
    },
    cylinderSubmit: (context, value) => {
        context.dispatch("popups/hidePopup", "cylinderParams", {root: true});
        context.dispatch("modeller/drawCylinder", value, {root: true})
    },
    setDrawing: (context, value) => {
        context.commit("setDrawing", value);
    },
    disableOperation: (context, operation) => {
        context.commit(operation, false);
    },
    toggleOperation: (context, { key }) => {
        const futureFlag = !context.getters[key];
        context.commit("removeAllOperations");
        context.commit(key, futureFlag);

        context.dispatch("modeller/selectOperation", [FlagAliases[key], futureFlag], {root: true})

        /*console.log("needRemove", needRemove);

        needRemove && context.dispatch("modeller/removeAllOperations", null, {root: true})
        context.dispatch("modeller/selectOperation", [FlagAliases[key], futureFlag], {root: true})
        context.commit("toggleReview", false)

        switch (key) {
            case "drawingPoint":
                context.dispatch("helper/setLine", UserHelp.point.clickForDot, {root: true})
                break;
            case "drawingSquare":
                context.dispatch("helper/setLine", UserHelp.square.clickForStart, {root: true})
                break;
            default:
                break;
        };*/
    },
    clickExportModal: (context) => {
        context.commit("setExport", true);
        context.dispatch("popups/showPopup", "exportModal", {root: true});
    },
    disactiveExportModal: (context) => {
        context.commit("setExport", false);
    },
    clickSave: (context) => {
        context.commit("setSave", true);
        context.dispatch("popups/showPopup", "saveModal", {root: true});
    },
    disactiveSaveModal: (context) => {
        context.commit("setSave", false);
    },
}