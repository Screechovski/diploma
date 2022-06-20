export const FlagAliases = {
    drawingSquare: "square",
    drawingPoint: "point",
    drawingCircle: "circle",
}

export const FlagAliasesReversed = {
    square: "drawingSquare",
    point: "drawingPoint",
    circle: "drawingCircle",
}

export const UserHelp = {
    point: {
        clickForDot: "Нажмите ЛКМ чтобы добавить точку"
    },
    square: {
        clickForStart: "Нажмите ЛКМ чтобы выбрать центральную точку прямоугольника",
        clickForEnd: "Нажмите ЛКМ чтобы построить прямоугольник"
    },
    circle: {
        clickForStart: "Нажмите ЛКМ чтобы выбрать центральную точку круга",
        clickForEnd: "Нажмите ЛКМ чтобы построить круг"
    },
    modelingCube: {
        clickForStart: "Введите все необходимые для посмтроения куба параметры, и нажмите 'создать'"
    },
    modelingSphere: {
        clickForStart: "Введите все необходимые для посмтроения сферы параметры, и нажмите 'создать'"
    },
    modelingCylinder: {
        clickForStart: "Введите все необходимые для посмтроения цилиндра/конуса параметры, и нажмите 'создать'"
    },
    coordinatyeAxes: {
        choose: "Выберите ось в которой хотите начать построение"
    }
}

export const ExportTypes = [
    "GLTF",
    'Collada',
    //'DRACO', // - ERROR
    //'MMD', // - ERROR
    //'OBJ', // -
    'PLY',
    //'STL', // -
    //'USDZ', // -
]

export const ProjectHash = "8A8A600F88E4B";

export const defaultVariables = {
    "button-color": "#00ff00",
    "button-color-dark":"#006a00",
    "radius": "15px",
    "backgroud-dark": "#000000",
    "backgroud": "#0a0a0a",
    "backgroud-light": "#1d1d1d",
    "error": "#ff3232"
}

export const variablesRu = {
    "button-color": "Цвет кнопок",
    "button-color-dark":"Цвет кнопок тёмный",
    "radius": "Радиус",
    "backgroud-dark": "Цвет фона тёмный",
    "backgroud": "Цвет фона",
    "backgroud-light": "Цвет фона светлый",
    "error": "Цвет ошибки"
}