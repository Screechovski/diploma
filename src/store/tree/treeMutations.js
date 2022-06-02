import { defaultMutation } from "@/assets/helper";

export const treeMutations = {
    setTreeList: defaultMutation('treeList'),
    toggleVisible: (state, id) => {
        const { visible } = state.treeList[id];

        state.treeList[id].visible = !visible;
    },
    toggleWireframe: (state, id) => {
        const { wireframe } = state.treeList[id];

        state.treeList[id].wireframe = !wireframe;
    }
}