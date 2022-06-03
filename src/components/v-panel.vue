<template lang="pug">

section.panel(:class="cssClass")
    ul.panel__list
        template(v-if="drawing")
            li.panel__item.panel__hr-after
                v-panel-button(
                    cssClass="panel__button"
                    text="3D операции"
                    @onClick="setModeling"
                )
                    s-modeling
            li.panel__item
                v-panel-button(
                    cssClass="panel__button"
                    text="Прямоугольник"
                    :active="drawingSquare"
                    @onClick="toggleOperation('drawingSquare')"
                )
                    s-drawing-square
            li.panel__item
                v-panel-button(
                    cssClass="panel__button"
                    text="Точка"
                    :active="drawingPoint"
                    @onClick="toggleOperation('drawingPoint')"
                )
                    s-drawing-dot
            li.panel__item
                v-panel-button(
                    cssClass="panel__button"
                    text="Выбрать ось"
                    @onClick="coordinateAxesClick"
                )
                    s-coordinate-axes
        template(v-else)
            li.panel__item.panel__hr-after
                v-panel-button(
                    cssClass="panel__button"
                    text="2D чертеж"
                    @onClick="setDrawing"
                )
                    s-drawing
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
        li.panel__item.panel__hr-before
            v-panel-button(
                cssClass="panel__button"
                text="Импорт"
                :active="false"
                @onClick="()=>{}"
            )
                s-import
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Экспорт"
                :active="exportModal"
                @onClick="clickExportModal"
            )
                s-export
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Сохранить"
                :active="isSaveActive"
                @onClick="clickSave"
            )
                s-save

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
import SDrawing from '@/svg/s-drawing'
import SModeling from '@/svg/s-modeling'
import SDrawingSquare from '@/svg/s-drawing-square'
import SDrawingDot from '@/svg/s-drawing-dot'
import SImport from '@/svg/s-import'
import SExport from '@/svg/s-export'
import SSave from '@/svg/s-save'

/* TODO li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Экспорт"
        ----->  :active="false"  <-----
*/

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
        SSphere,
        SDrawing,
        SModeling,
        SDrawingSquare,
        SDrawingDot,
        SImport,
        SExport,
        SSave
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

        const drawing = computed(() =>
            store.getters["panel/drawing"])
        const setDrawing = () =>
            store.dispatch("panel/setDrawing", true)
        const setModeling = () =>
            store.dispatch("panel/setDrawing", false)


        const drawingSquare = computed(() =>
            store.getters["panel/drawingSquare"])
        const drawingPoint = computed(() =>
            store.getters["panel/drawingPoint"])
        const toggleOperation = name =>
            store.dispatch("panel/toggleOperation", { key: name })

        const exportModal = computed(() =>
            store.getters["panel/exportModal"])

        const clickExportModal = () =>
            store.dispatch("panel/clickExportModal")

        const clickSave = () =>
            store.dispatch("panel/clickSave")
        const isSaveActive = computed(() =>
            store.getters["panel/saveModal"])

        return {
            coordinateAxesClick,
            reviewActive,
            reviewClick,
            squareClick,
            coordinatesClick,
            sphereClick,
            cylinderClick,
            drawing,
            setDrawing,
            setModeling,
            toggleOperation,
            drawingSquare,
            drawingPoint,
            clickExportModal,
            exportModal,
            clickSave,
            isSaveActive
        }
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.panel
    padding: 7px 10px 6px 10px
    background-color: $backgroud
    &__list
        padding-top: 3px
        display: flex
        gap: 7px
        max-width: 100%
        overflow-x: auto
        overflow-y: hidden
        &::-webkit-scrollbar
            height: 5px
            background-color: $backgroud
            border-radius: 2px
        &::-webkit-scrollbar-thumb
            background-color: $button-color-dark
            border-radius: 2px
    &__button
        width: 120px
    &__hr-after
        padding-right: 9px
        position: relative
        &::after
            content: ""
            height: 100%
            width: 2px
            background-color: $button-color-dark
            position: absolute
            top: 0
            right: 0
    &__hr-before
        padding-left: 9px
        position: relative
        &::before
            content: ""
            height: 100%
            width: 2px
            background-color: $button-color-dark
            position: absolute
            top: 0
            left: 0
    &__item
        margin-bottom: 4px
</style>