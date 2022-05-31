export const defaultMutation = (key) => (state, value) => {
    state[key] = value;
}

export const defaultGetter = (key) => ({
    [key]: state => state[key]
})

export const defaultGettersObject = (keys) => {
    const getters = {};

    keys.forEach(key => {
        getters[key] = state => state[key]
    })

    return getters;
}

export const cssClass = {
    type: String,
    default: ""
}

export const Num = (val) => {
    return parseFloat((+val).toFixed(6))
}