import { defaultGettersObject } from "@/assets/helper";

export const treeGetters = {
    ...defaultGettersObject(["treeList"]),
    treeisEmpty: state => state.treeList.length === 0
}