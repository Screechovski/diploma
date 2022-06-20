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
                    text="Круг"
                    :active="drawingCircle"
                    @onClick="toggleOperation('drawingCircle')"
                )
                    s-drawing-circle
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
                    :active="isAddCoordinates"
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
                    :active="isModelingCube"
                    @onClick="cubeClick"
                )
                    s-cube
            li.panel__item
                v-panel-button(
                    cssClass="panel__button"
                    text="Цилиндр"
                    :active="isModelingCylinder"
                    @onClick="cylinderClick"
                )
                    s-cylinder
            li.panel__item
                v-panel-button(
                    cssClass="panel__button"
                    text="Шар"
                    :active="isModelingSphere"
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
                text="Новый проект"
                :active="false"
                @onClick="newClickHandler"
            )
                s-new-file
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
        li.panel__item
            v-panel-button(
                cssClass="panel__button"
                text="Настройки"
                :active="isSettingsModal"
                @onClick="settingsClick"
            )
                s-settings

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
import SDrawingCircle from '@/svg/s-drawing-circle'
import SDrawingDot from '@/svg/s-drawing-dot'
import SNewFile from '@/svg/s-new-file'
import SExport from '@/svg/s-export'
import SSave from '@/svg/s-save'
import SSettings from '@/svg/s-settings'

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
        SDrawingCircle,
        SNewFile,
        SExport,
        SSave,
        SSettings
    },
    setup(){
        const store = useStore();

        const coordinateAxesClick = () =>
            store.dispatch("panel/coordinateAxesClick");
        const isAddCoordinates = computed(() =>
            store.getters["panel/addCoordinates"]);

        const reviewActive = computed(() =>
            store.getters["panel/review"])
        const reviewClick = () =>
            store.dispatch("panel/reviewClick");

        const cubeClick = () =>
            store.dispatch("panel/cubeClick");
        const isModelingCube = computed(() =>
            store.getters["panel/modelingCube"])

        const sphereClick = () =>
            store.dispatch("panel/sphereClick")
        const isModelingSphere = computed(() =>
            store.getters["panel/modelingSphere"])

        const cylinderClick = () =>
            store.dispatch("panel/cylinderClick")
        const isModelingCylinder = computed(() =>
            store.getters["panel/modelingCylinder"])

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
        const drawingCircle = computed(() =>
            store.getters["panel/drawingCircle"])
        const toggleOperation = name =>
            store.dispatch("panel/toggleOperation", { key: name })


        const clickExportModal = () =>
            store.dispatch("panel/clickExportModal")
        const exportModal = computed(() =>
            store.getters["panel/exportModal"])

        const settingsClick = () =>
            store.dispatch("panel/settingsClick")
        const isSettingsModal = computed(() =>
            store.getters["panel/settingsModal"])

        const clickSave = () =>
            store.dispatch("panel/clickSave")
        const isSaveActive = computed(() =>
            store.getters["panel/saveModal"])

        const newClickHandler = () =>
            window.open(window.location.origin,'blank')

        return {
            coordinateAxesClick,
            reviewActive,
            reviewClick,
            cubeClick,
            coordinatesClick,

            sphereClick,
            isModelingSphere,

            cylinderClick,
            isModelingCylinder,

            drawing,
            setDrawing,
            setModeling,
            toggleOperation,

            drawingSquare,
            drawingPoint,
            drawingCircle,

            clickExportModal,
            exportModal,
            clickSave,
            isSaveActive,
            newClickHandler,
            isAddCoordinates,
            isModelingCube,

            settingsClick,
            isSettingsModal
        }
    }
}
</script>

<style lang="sass">
.panel
    padding: 7px 10px 6px 10px
    background-color: var(--backgroud)
    &__list
        padding-top: 3px
        display: flex
        gap: 7px
        max-width: 100%
        overflow-x: auto
        overflow-y: hidden
        &::-webkit-scrollbar
            height: 5px
            background-color: var(--backgroud)
            border-radius: 2px
        &::-webkit-scrollbar-thumb
            background-color: var(--button-color-dark)
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
            background-color: var(--button-color-dark)
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
            background-color: var(--button-color-dark)
            position: absolute
            top: 0
            left: 0
    &__item
        margin-bottom: 4px
</style>