<template lang="pug">

section.panel(:class="cssClass")
    v-panel-button(
        text="Квадрат"
        @onClick="squareClick"
    )
        s-square
    v-panel-button(
        text="Обзор"
        :active="reviewActive"
        @onClick="reviewClick"
    )
        s-camera-rotate
    v-panel-button(
        text="Выбрать ось"
        @onClick="coordinateAxesClick"
    )
        s-coordinate-axes
    v-panel-button(
        text="Добавить оси"
        @onClick="coordinatesClick"
    )
        s-coordinate-axes

</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { cssClass } from "@/assets/helper"
import VPanelButton from '@/molecules/v-panel-button'
import SSquare from '@/svg/s-squre'
import SCameraRotate from '@/svg/s-camera-rotate'
import SCoordinateAxes from '@/svg/s-coordinate-axes'

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

        const squareClick = () =>
            store.dispatch("panel/squareClick");

        const coordinatesClick = () =>
            store.dispatch("panel/addCoordinateClick");

        return {
            coordinateAxesClick,
            reviewActive,
            reviewClick,
            squareClick,
            coordinatesClick
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