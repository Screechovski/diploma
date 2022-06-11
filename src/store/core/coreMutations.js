import { defaultVariables } from "@/assets/constants";
import { setLSColor } from "@/assets/helper";

export const coreMutations = {
    setColor: (state, {key, value}) => {
        if (state.colors[key]) {
            state.colors[key] = value
        }
    },
    resetColors: (state) => {
        Object.keys(state.colors).forEach(key => {
            state.colors[key] = defaultVariables[key];
        })
    },
    saveColors: (state) => {
        Object.keys(state.colors).forEach(key =>
            setLSColor(key, state.colors[key]))
    }
}