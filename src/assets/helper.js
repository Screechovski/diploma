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

export const downloadObjectAsJson = (exportObj, exportName) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}