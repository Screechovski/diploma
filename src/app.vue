<template lang="pug">

v-main
v-popup-coordinate-axes(v-if="showCoordinateAxes")

</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import VMain from "@/pages/v-main"
import VPopupCoordinateAxes from "@/components/v-popup-coordinate-axes"

export default {
    components: { VMain, VPopupCoordinateAxes },
    setup(){
        const store = useStore();
        const showCoordinateAxes = computed(() => store.getters["popups/coordinateAxes"])

        const updateRender = () => store.dispatch("modeller/updateRender");

        onMounted(() =>
            window.addEventListener("resize", updateRender))
        onUnmounted(() =>
            window.removeEventListener("resize", updateRender))

        return {
            showCoordinateAxes
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