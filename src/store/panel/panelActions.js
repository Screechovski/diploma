import { FlagAliases } from "@/assets/constants";
import { UserHelp } from "@/assets/constants";

export const panelActions = {
    /* choose axes */
    coordinateAxesClick: (context) => {
        context.dispatch("popups/showPopup", "coordinateAxes", {root: true});
        context.commit("setAxis", true)
        context.dispatch("helper/setLine", UserHelp.coordinatyeAxes.choose, {root: true})
    },
    coordinateAxesSubmit: (context, value) => {
        context.dispatch("modeller/setCoordinates", value, {root: true})
        context.dispatch("popups/hidePopup", "coordinateAxes", {root: true})
        context.dispatch("disactiveCoordinateAxes")
    },
    disactiveCoordinateAxes: (context) => {
        context.commit("setAxis", false);
        context.dispatch("helper/setLine",'', {root: true})
    },

    /* set review */
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

    /* set cube */
    cubeClick: (context) => {
        context.dispatch("popups/showPopup", "rectangleParams", {root: true});
        context.commit("setModelingCube", true);
        context.dispatch("helper/setLine", UserHelp.modelingCube.clickForStart, {root: true})
    },
    cubeSubmit: (context, value) => {
        context.dispatch("popups/hidePopup", "rectangleParams", {root: true});
        context.dispatch("modeller/drawSquare", value, {root: true})
        context.dispatch("disactiveCubeParams");
    },
    disactiveCubeParams: (context) => {
        context.commit("setModelingCube", false);
        context.dispatch("helper/setLine",'', {root: true})
    },

    addCoordinateClick: (context) => {
        context.dispatch("popups/showPopup", "axesHelperPostion", {root: true});
    },

    /* set sphere */
    sphereClick: (context) => {
        context.dispatch("popups/showPopup", "sphereParams", {root: true});
        context.commit("setModelingSphere", true);
        context.dispatch("helper/setLine", UserHelp.modelingSphere.clickForStart, {root: true})
    },
    sphereSubmit: (context, value) => {
        context.dispatch("popups/hidePopup", "sphereParams", {root: true});
        context.dispatch("modeller/drawSphere", value, {root: true})
        context.dispatch("disactiveSphereParams");
    },
    disactiveSphereParams: (context) => {
        context.commit("setModelingSphere", false);
        context.dispatch("helper/setLine", '', {root: true})
    },

    /* set cylinder */
    cylinderClick: (context) => {
        context.dispatch("popups/showPopup", "cylinderParams", {root: true});
        context.commit("setModelingCylinder", true);
        context.dispatch("helper/setLine", UserHelp.modelingCylinder.clickForStart, {root: true})
    },
    cylinderSubmit: (context, value) => {
        context.dispatch("popups/hidePopup", "cylinderParams", {root: true});
        context.dispatch("modeller/drawCylinder", value, {root: true})
        context.dispatch("disactiveModelingCylinder")
    },
    disactiveModelingCylinder: (context) => {
        context.commit("setModelingCylinder", false);
        context.dispatch("helper/setLine", '', {root: true})
    },

    /* set settings */
    settingsClick: (context) => {
        context.dispatch("popups/showPopup", "settingsModal", {root: true});
        context.commit("setSettingsModal", true);
    },
    settingsSubmit: (context) => {
        context.dispatch("disactiveSettingsParams");
        context.dispatch("popups/hidePopup", "settingsModal", {root: true});
    },
    disactiveSettingsParams: (context) => {
        context.commit("setSettingsModal", false);
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

        context.dispatch("helper/setLine", UserHelp.point.clickForDot, {root: true})

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

    /* export */
    clickExportModal: (context) => {
        context.commit("setExport", true);
        context.dispatch("popups/showPopup", "exportModal", {root: true});
    },
    disactiveExportModal: (context) => {
        context.commit("setExport", false);
    },

    /* save */
    clickSave: (context) => {
        context.commit("setSave", true);
        context.dispatch("popups/showPopup", "saveModal", {root: true});
    },
    disactiveSaveModal: (context) => {
        context.commit("setSave", false);
    },
}