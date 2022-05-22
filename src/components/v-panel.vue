<template lang="pug">

section.panel(:class="cssClass")
    ul.panel__list
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Куб"
                @onClick="squareClick"
            )
                s-cube
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Цилиндр"
                @onClick="cylinderClick"
            )
                s-cylinder
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Шар"
                @onClick="sphereClick"
            )
                s-sphere
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Обзор"
                :active="reviewActive"
                @onClick="reviewClick"
            )
                s-camera-rotate
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Выбрать ось"
                @onClick="coordinateAxesClick"
            )
                s-coordinate-axes
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
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
    background-color: $backgroud
    overflow-x: auto
    overflow-y: hidden
    &__list
        display: flex
        gap: 7px
    &__button
        width: 120px
</style>