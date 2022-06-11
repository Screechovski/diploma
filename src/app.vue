<template lang="pug">

main.main(:style="colorsVarStyles")
    v-main
    v-popup-coordinate-axes(v-if="showCoordinateAxes")
    v-popup-cube(v-if="showRectangleParams")
    v-popup-sphere(v-if="showSphereParams")
    v-popup-axeshelper-postion(v-if="showAxesHelperPostion")
    v-popup-cylinder(v-if="showCylinderParams")
    v-popup-export(v-if="showExportModal")
    v-popup-save(v-if="showSaveModal")
    v-popup-save-browser(v-if="showSaveBrowserModal")
    v-popup-message-box(v-if="showMessageBox")
    v-popup-settings(v-if="showSettingsModal")

</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import VMain from "@/pages/v-main"
import VPopupCoordinateAxes from "@/components/v-popup-coordinate-axes"
import VPopupCube from "@/components/v-popup-cube"
import VPopupAxeshelperPostion from "@/components/v-popup-axeshelper-postion"
import VPopupSphere from "@/components/v-popup-sphere"
import VPopupCylinder from "@/components/v-popup-cylinder"
import VPopupExport from "@/components/v-popup-export"
import VPopupSave from "@/components/v-popup-save"
import VPopupSaveBrowser from "@/components/v-popup-save-browser"
import VPopupMessageBox from "@/components/v-popup-message-box"
import VPopupSettings from "@/components/v-popup-settings"

export default {
    components: {
        VMain,
        VPopupCoordinateAxes,
        VPopupCube,
        VPopupAxeshelperPostion,
        VPopupSphere,
        VPopupCylinder,
        VPopupExport,
        VPopupSave,
        VPopupSaveBrowser,
        VPopupMessageBox,
        VPopupSettings,
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

        const showSaveModal = computed(() =>
            store.getters["popups/saveModal"])

        const showSaveBrowserModal = computed(() =>
            store.getters["popups/saveBrowserModal"])

        const updateRender = () =>
            store.dispatch("modeller/updateRender");

        const colorsVarStyles = computed(() =>
            store.getters["core/getVariablesObject"])

        // asd
        const showMessageBox = computed(() =>
            store.getters["popups/messageBoxModal"])

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

        const showSettingsModal = computed(() =>
            store.getters["popups/settingsModal"])

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
            showExportModal,
            showSaveModal,
            showSaveBrowserModal,
            showMessageBox,
            colorsVarStyles,
            showSettingsModal
        }
    }
}
</script>

<style lang="sass">
body
    overflow: hidden

*
    font-family: 'Source Code Pro', 'DejaVu Sans', serif
    font-weight: 600

.main
    background-color: var(--backgroud-dark)
</style>