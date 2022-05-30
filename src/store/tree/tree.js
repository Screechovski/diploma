import { treeActions } from "@/store/tree/treeActions";
import { treeGetters } from "@/store/tree/treeGetters";
import { treeMutations } from "@/store/tree/treeMutations";
import { treeState } from "@/store/tree/treeState";

export const tree = {
    namespaced: true,
    state: treeState,
    getters: treeGetters,
    mutations: treeMutations,
    actions: treeActions
}