export const popupsActions = {
    showPopup: (context, key) => {
        context.commit('showPopup', key)
    },
    hidePopup: (context, key) => {
        context.commit('hidePopup', key)
    }
}

