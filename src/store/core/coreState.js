import { getLSColor } from "@/assets/helper";
import { defaultVariables } from "@/assets/constants";

export const coreState = {
    colors: {
        "button-color": getLSColor("button-color") ?? defaultVariables["button-color"],
        "button-color-dark": getLSColor("button-color-dark") ?? defaultVariables["button-color-dark"],
        "radius": getLSColor("radius") ?? defaultVariables["radius"],
        "backgroud-dark": getLSColor("backgroud-dark") ?? defaultVariables["backgroud-dark"],
        "backgroud": getLSColor("backgroud") ?? defaultVariables["backgroud"],
        "backgroud-light": getLSColor("backgroud-light") ?? defaultVariables["backgroud-light"],
        "error": getLSColor("error") ?? defaultVariables["error"]
    }
}