<template lang="pug">

section.panel(:class="cssClass")
    v-panel-button(text="Квадрат")
        s-square
    v-panel-button(text="Обзор", :active="reviewActive", @click="reviewClick")
        s-camera-rotate
    v-panel-button(text="Выбрать ось", @onClick="coordinateAxesClick")
        s-coordinate-axes

</template>

<script>
import { cssClass } from "@/assets/helper"
import VPanelButton from '@/molecules/v-panel-button'
import SSquare from '@/svg/s-squre'
import SCameraRotate from '@/svg/s-camera-rotate'
import SCoordinateAxes from '@/svg/s-coordinate-axes'
import { useStore } from 'vuex'
import { computed } from 'vue'


export default {
    props: {
        cssClass
    },
    components: {
        VPanelButton,
        SSquare,
        SCameraRotate,
        SCoordinateAxes
    },
    setup(){
        const store = useStore();

        const coordinateAxesClick = () =>
            store.dispatch("panel/coordinateAxesClick");

        const reviewActive = computed(() =>
            store.getters["panel/review"])
        const reviewClick = () =>
            store.dispatch("panel/reviewClick");

        return {
            coordinateAxesClick,
            reviewActive,
            reviewClick
        }
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.panel
    padding: 15px
    border-radius: 3px
    background-color: $backgroud
    display: flex
    gap: 7px
</style>