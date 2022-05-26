export const treeActions = {
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
    },
    toggleVisible: (context, id) => {
        context.dispatch("modeller/toggleVisible", id, {root: true});
        context.dispatch("getTree")
    },
    toggleWireframe: (context, id) => {
        context.dispatch("modeller/toggleWireframe", id, {root: true});
        context.dispatch("getTree")
    }
}