export const treeActions = {
    setTree: (context, treeItems) => {
        context.commit("setTreeList", treeItems)
    },
    removeItem: async (context, id) => {
        await context.dispatch("modeller/removeChildren", id, {root: true});
    },
    addCoordinates: async (context) => {
        await context.dispatch("modeller/addCoordinates", null, {root: true});
    },
    toggleVisible: (context, id) => {
        context.dispatch("modeller/toggleVisible", id, {root: true});
        context.commit("toggleVisible", id);
    },
    toggleWireframe: (context, id) => {
        context.dispatch("modeller/toggleWireframe", id, {root: true});
        context.commit("toggleWireframe", id);
    }
}