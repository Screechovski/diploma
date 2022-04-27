import Modeller from "@/modeller/index"
import { defaultAction } from "@/assets/helper";

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
        setInstance: defaultAction('instance'),
        setRef: defaultAction('ref'),
    },
    actions: {
        setRef: (context, ref = null) => {
            if (ref) {
                context.commit('setRef', ref);
                context.commit('setInstance', new Modeller(ref));
            }
        },
        updateRender: (context) => {
            const { render, renderer, camera } = context.state.instance;
            const { clientWidth: width, clientHeight: height } = context.state.ref;

            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
            // render()
        }
    }
}