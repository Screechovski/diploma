<template lang="pug">

v-main
v-popup-coordinate-axes(v-if="showCoordinateAxes")
v-popup-rectangle(v-if="showRectangleParams")
v-popup-axeshelper-postion(v-if="showAxesHelperPostion")

</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import VMain from "@/pages/v-main"
import VPopupCoordinateAxes from "@/components/v-popup-coordinate-axes"
import VPopupRectangle from "@/components/v-popup-rectangle"
import VPopupAxeshelperPostion from "@/components/v-popup-axeshelper-postion"


export default {
    components: {
        VMain,
        VPopupCoordinateAxes,
        VPopupRectangle,
        VPopupAxeshelperPostion
    },
    setup(){
        const store = useStore();
        const showCoordinateAxes = computed(() => store.getters["popups/coordinateAxes"])
        const showAxesHelperPostion = computed(() => store.getters["popups/axesHelperPostion"])
        const showRectangleParams = computed(() => store.getters["popups/rectangleParams"])

        const updateRender = () =>
            store.dispatch("modeller/updateRender");

        onMounted(() =>
            window.addEventListener("resize", updateRender))
        onUnmounted(() =>
            window.removeEventListener("resize", updateRender))

        return {
            showCoordinateAxes,
            showRectangleParams,
            showAxesHelperPostion
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