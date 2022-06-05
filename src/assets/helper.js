import { ProjectHash } from "@/assets/constants";

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

export const getProjectKeysFromLocalStorage = () => {
    let result = [];
    Object.keys(window.localStorage).forEach(lsKey => {
        if (lsKey.indexOf(ProjectHash) !== -1) {
            result.push(lsKey);
        }
    })
    return result;
}

export const getProjectNamesFromLocalStorage = () => {
    const projectKeys = getProjectKeysFromLocalStorage();
    return projectKeys.map(i => i.replace(ProjectHash + ":", ""));
}

export const saveToLocalStorage = (key, value) => {
    if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getFromLocalStorage = (key) => {
    if (localStorage && localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return null;
    }
};
