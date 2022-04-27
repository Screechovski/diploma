<template lang="pug">

.panel(:class="cssClass")
    v-panel-button(text="Квадрат")
        s-square
    v-panel-button(text="Обзор")
        s-camera-rotate
    v-panel-button(text="Выбрать ось")
        s-coordinate-axes
</template>

<script>
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
        const a = () => console.log(1);

        return { a };
    }
}
</script>

<style lang="sass">
.panel
    padding: 15px
    border-radius: 3px
    background-color: #0e0e0e
    display: flex
    gap: 7px
</style>