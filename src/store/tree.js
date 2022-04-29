import { defaultMutation, defaultGettersObject } from "@/assets/helper";

export default {
    namespaced: true,
    state: () => ({
        treeList: []
    }),
    getters: defaultGettersObject(["treeList"]),
    mutations: {
        setTreeList: defaultMutation('treeList'),
    },
    actions: {
        getTree: async (context) => {
            const treeItems = await context.dispatch("modeller/getChildrens", null, {root: true});
            context.commit("setTreeList", treeItems)
        },
        removeItem: (context, id) => {
            console.log(id);
        }
    }
}