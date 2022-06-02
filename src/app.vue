<template lang="pug">

v-main
v-popup-coordinate-axes(v-if="showCoordinateAxes")
v-popup-rectangle(v-if="showRectangleParams")
v-popup-sphere(v-if="showSphereParams")
v-popup-axeshelper-postion(v-if="showAxesHelperPostion")
v-popup-cylinder(v-if="showCylinderParams")
v-popup-export(v-if="showExportModal")

</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import VMain from "@/pages/v-main"
import VPopupCoordinateAxes from "@/components/v-popup-coordinate-axes"
import VPopupRectangle from "@/components/v-popup-rectangle"
import VPopupAxeshelperPostion from "@/components/v-popup-axeshelper-postion"
import VPopupSphere from "@/components/v-popup-sphere"
import VPopupCylinder from "@/components/v-popup-cylinder"
import VPopupExport from "@/components/v-popup-export"

export default {
    components: {
        VMain,
        VPopupCoordinateAxes,
        VPopupRectangle,
        VPopupAxeshelperPostion,
        VPopupSphere,
        VPopupCylinder,
        VPopupExport
    },
    setup(){
        const store = useStore();
        const showCoordinateAxes = computed(() =>
            store.getters["popups/coordinateAxes"])
        const showAxesHelperPostion = computed(() =>
            store.getters["popups/axesHelperPostion"])
        const showRectangleParams = computed(() =>
            store.getters["popups/rectangleParams"])
        const showSphereParams = computed(() =>
            store.getters["popups/sphereParams"])
        const showCylinderParams = computed(() =>
            store.getters["popups/cylinderParams"])

        const showExportModal = computed(() =>
            store.getters["popups/exportModal"])

        const updateRender = () =>
            store.dispatch("modeller/updateRender");

        const keyPressHandler = (type) => (e) => {
            const isDown = type === "down";
            switch (e.key.toLowerCase()) {
                case "shift": {
                    store.dispatch("modeller/keyPress", [isDown, "shift"])
                    break;
                }
                default:
                    break;
            }
        }

        onMounted(() => {
            window.addEventListener("resize", updateRender)
            window.addEventListener("keyup", keyPressHandler("up"))
            window.addEventListener("keydown", keyPressHandler("down"))
        })
        onUnmounted(() =>
            window.removeEventListener("resize", updateRender))


        return {
            showCoordinateAxes,
            showRectangleParams,
            showAxesHelperPostion,
            showSphereParams,
            showCylinderParams,
            showExportModal
        }
    }
}
</script>

<style lang="sass">
@import "./assets/variables"

body
    overflow: hidden
    background-color: $backgroud-dark
*
    font-family: 'Source Code Pro', 'DejaVu Sans', serif
    font-weight: 600
</style>