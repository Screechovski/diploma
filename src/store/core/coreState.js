import { getLSColor } from "@/assets/helper";

export const coreState = {
    colors: {
        "button-color": getLSColor("button-color") ?? "#00ff00",
        "button-color-dark": getLSColor("button-color-dark") ?? "#006a00",
        "radius": getLSColor("radius") ?? "15px",
        "backgroud-dark": getLSColor("backgroud-dark") ?? "#000000",
        "backgroud": getLSColor("backgroud") ?? "#0a0a0a",
        "backgroud-light": getLSColor("backgroud-light") ?? "#1d1d1d",
        "red": getLSColor("red") ?? "#ff3232"
    }
}