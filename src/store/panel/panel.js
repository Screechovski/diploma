import { panelActions } from "@/store/panel/panelActions";
import { panelGetters } from "@/store/panel/panelGetters";
import { panelMutations } from "@/store/panel/panelMutations";
import { panelState } from "@/store/panel/panelState";

export const panel = {
    namespaced: true,
    state: panelState,
    getters: panelGetters,
    mutations: panelMutations,
    actions: panelActions
}