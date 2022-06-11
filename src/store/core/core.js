import { coreActions } from "@/store/core/coreActions";
import { coreGetters } from "@/store/core/coreGetters";
import { coreMutations } from "@/store/core/coreMutations";
import { coreState } from "@/store/core/coreState";

export const core = {
    namespaced: true,
    state: coreState,
    getters: coreGetters,
    mutations:coreMutations,
    actions: coreActions
}