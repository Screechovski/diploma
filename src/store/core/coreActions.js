export const coreActions = {
    setColor: (context, data) => {
        context.commit("setColor", data);
        if (data.key === "backgroud") {
            context.dispatch("modeller/setBackgroudColor", data.value, {root: true})
        }
    },
    resetColors: (context) => {
        context.commit("resetColors")
        context.dispatch("modeller/setBackgroudColor", "#0a0a0a", {root: true})
    },
    saveColors: (context) => {
        context.commit("saveColors")
    }
}