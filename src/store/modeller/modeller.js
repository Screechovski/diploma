import { modellerState } from "@/store/modeller/modellerState";
import { modellerGetters } from "@/store/modeller/modellerGetters";
import { modellerMutations } from "@/store/modeller/modellerMutations";
import { modellerActions } from "@/store/modeller/modellerActions";

export const modeller = {
    namespaced: true,
    state: modellerState,
    getters: modellerGetters,
    mutations: modellerMutations,
    actions: modellerActions
}