import { helperState } from "@/store/helper/helperState";
import { helperGetters } from "@/store/helper/helperGetters";
import { helperMutations } from "@/store/helper/helperMutations";
import { helperActions } from "@/store/helper/helperActions";

export const helper = {
    namespaced: true,
    state: helperState,
    getters: helperGetters,
    mutations: helperMutations,
    actions: helperActions
}