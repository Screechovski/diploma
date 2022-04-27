export const defaultAction = (key) => (state, value) => {
    state[key] = value;
}

export const cssClass = {
    type: String,
    default: ""
}