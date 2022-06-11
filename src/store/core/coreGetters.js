export const coreGetters = {
    getVariablesObject: (state) => {
        const colorsObject = state.colors;

        let styles = {};

        Object.keys(colorsObject).forEach(key => {
            styles["--" + key] = colorsObject[key];
        })

        return styles;
    },
    getColorsObject: (state) => state.colors,
}