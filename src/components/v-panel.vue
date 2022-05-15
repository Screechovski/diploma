<template lang="pug">

section.panel(:class="cssClass")
    v-panel-button(
        text="Куб"
        @onClick="squareClick"
    )
        s-cube
    v-panel-button(
        text="Цилиндр"
        @onClick="cylinderClick"
    )
        s-cylinder
    v-panel-button(
        text="Шар"
        @onClick="sphereClick"
    )
        s-sphere
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
import SCube from '@/svg/s-cube'
import SCameraRotate from '@/svg/s-camera-rotate'
import SCoordinateAxes from '@/svg/s-coordinate-axes'
import SCylinder from '@/svg/s-cylinder'
import SSphere from '@/svg/s-sphere'

export default {
    props: {
        cssClass
    },
    components: {
        VPanelButton,
        SCube,
        SCameraRotate,
        SCoordinateAxes,
        SCylinder,
        SSphere
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

        const sphereClick = () =>
            store.dispatch("panel/sphereClick")

        const cylinderClick = () =>
            store.dispatch("panel/cylinderClick")

        const coordinatesClick = () =>
            store.dispatch("panel/addCoordinateClick");

        return {
            coordinateAxesClick,
            reviewActive,
            reviewClick,
            squareClick,
            coordinatesClick,
            sphereClick,
            cylinderClick
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
    display: grid
    grid-template-columns: repeat(8, 120px)
    gap: 7px
</style>