<template lang="pug">

button(
    type="button",
    class="panel-button"
    @click="clickHandler"
    :class="{active, [cssClass]: true}"
)
    i(class="panel-button__icon")
        slot
    span(class="panel-button__text") {{text}}

</template>

<script>
import {cssClass} from "@/assets/helper";

export default {
    props:{
        text: {
            type: String,
            requred: true
        },
        active: {
            type: Boolean,
            default: false
        },
        cssClass
    },
    setup(popups, {emit}){
        const clickHandler = () => {
            emit("onClick")
        }

        return {
            clickHandler
        }
    }
}
</script>

<style lang="sass">
.panel-button
    height: 70px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 5px
    background-color: transparent
    border: 2px solid var(--button-color-dark)
    cursor: pointer
    &:hover
        transform: translate(-1px,-1px)
    &:active
        transform: translate(1px,1px)
    &__icon
        display: block
        height: 27px
        width: 27px
        .svg
            width: 100%
            height: 100%
            path,
            react,
            polygon
                fill: var(--button-color-dark)
    &__text
        font-size: 14px
        text-transform: lowercase
        color: var(--button-color-dark)
    &.active
        border: 2px solid var(--button-color)
        transform: translate(1px, 1px)
        .panel-button
            &__icon
                .svg
                    path,
                    react,
                    polygon
                        fill: var(--button-color)
            &__text
                color: var(--button-color)
</style>