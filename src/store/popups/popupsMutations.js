export const popupsMutations = {
    showPopup: (state, key) => {
        state[key] = true
    },
    hidePopup: (state, key) => {
        state[key] = false
    },
}