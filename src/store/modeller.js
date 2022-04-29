import Modeller from "@/modeller/index"
import { defaultMutation } from "@/assets/helper";

export default {
    namespaced: true,
    state: () => ({
        inited: false,
        instance: null,
        ref: null,
    }),
    getters: {

    },
    mutations: {
        setInstance: defaultMutation('instance'),
        setRef: defaultMutation('ref'),
    },
    actions: {
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
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
            // render()
        },
        enableReview: (context, flag) => {
            context.state.instance.enableOrbitControls(flag);
        },
        setCoordinates: (context, coordinates) => {
            context.state.instance.setCamera(coordinates);
        },
        getChildrens: async (context) => {
            const childrens = await context.state.instance.scene.children;
            return Object.values(childrens);
        }
    }
}