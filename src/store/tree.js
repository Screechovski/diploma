import { defaultMutation, defaultGettersObject } from "@/assets/helper";

export default {
    namespaced: true,
    state: () => ({
        treeList: []
    }),
    getters: {
        ...defaultGettersObject(["treeList"]),
        treeisEmpty: state => state.treeList.length === 0
    },
    mutations: {
        setTreeList: defaultMutation('treeList'),
    },
    actions: {
        getTree: async (context) => {
            const treeItems = await context.dispatch("modeller/getChildrens", null, {root: true});
            context.commit("setTreeList", treeItems)
        },
        removeItem: async (context, id) => {
            await context.dispatch("modeller/removeChildren", id, {root: true});
            context.dispatch("getTree")
        },
        addCoordinates: async (context) => {
            await context.dispatch("modeller/addCoordinates", null, {root: true});
            context.dispatch("getTree")
        }
    }
}