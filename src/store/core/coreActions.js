export const coreActions = {
    setColor: (context, data) => {
        context.commit("setColor", data)
    },
    resetColors: (context) => {
        context.commit("resetColors")
    },
    saveColors: (context) => {
        context.commit("saveColors")
    }
}