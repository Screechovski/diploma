import { Modeller } from "@/modeller/index"
import { FlagAliasesReversed } from "@/assets/constants";
import { UserHelp } from "@/assets/constants";

export const modellerActions = {
    setRef: (context, ref = null) => {
        if (ref) {
            let a = new Modeller(ref);
            window.modeller = a;
            context.commit('setRef', ref);
            context.commit('setInstance', a);
        }
    },
    updateRender: (context) => {
        const { render, renderer, camera } = context.state.instance;
        const { clientWidth: width, clientHeight: height } = context.state.ref;

        camera.aspect = width / height
        // camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        render()
    },
    enableReview: (context, flag) => {
        context.state.instance.enableOrbitControls(flag);
    },
    setCoordinates: (context, coordinates) => {
        context.state.instance.setCamera(coordinates);
    },
    /* Childrens */
    getChildrens: async (context) => {
        const childrensObject = await context.state.instance.scene.children;
        const childrensArray = Object.values(childrensObject)
        const cleanChildrensArray = childrensArray.map(({name, type, visible, material: { wireframe = null }}) =>
            ({name, type, visible, wireframe}));

        return cleanChildrensArray;
    },
    removeChildren: async (context, id) => {
        return context.state.instance.removeObject(id);
    },
    /* Add coordinates */
    addCoordinates: (context, position) => {
        return context.state.instance.addAxesHelper(...position);
    },
    /* Drawing */
    drawSquare: (context, squareData) => {
        context.state.instance.addSquare(squareData);
    },
    /* Toggle visible */
    toggleVisible: async (context, id) => {
        await context.state.instance.toggleVisible(id);
    },
    /* Toggle wireframe */
    toggleWireframe: async (context, id) => {
        await context.state.instance.toggleWireframe(id);
    },
    drawSphere: (context, sphereData) => {
        context.state.instance.addSphere(sphereData);
    },
    drawCylinder: (context, cylinderData) => {
        context.state.instance.addCylinder(cylinderData);
    },
    mouseMove: (context, e) => {
        context.state.instance.mouseMove(e)
    },
    keyPress: (context, [type, keyName]) => {
        context.state.instance.keyPressed(keyName, type);
    },
    selectOperation: (context, value) => {
        context.state.instance.selectOperation(value);
    },
    removeAllOperations: (context) => {
        context.state.instance.removeAllOperations();
    },
    clickHandler: async (context, e) => {
        const res = await context.state.instance.clickHandler(e);

        if (res === true) {
            context.dispatch("panel/selectOperation", FlagAliasesReversed["point"], {root: true});
            context.dispatch("helper/setLine", UserHelp.point.clickForDot)
        }
    }
}