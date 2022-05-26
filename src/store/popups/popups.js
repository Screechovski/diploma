import { popupsActions } from "@/store/popups/popupsActions";
import { popupsGetters } from "@/store/popups/popupsGetters";
import { popupsMutations } from "@/store/popups/popupsMutations";
import { popupsState } from "@/store/popups/popupsState";

export const popups = {
    namespaced: true,
    state: popupsState,
    getters: popupsGetters,
    mutations: popupsMutations,
    actions: popupsActions
}