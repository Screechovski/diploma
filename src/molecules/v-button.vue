<script>
import { cssClass } from "@/assets/helper";
export default {
    setup(props, content) {
        const clickHandler = () => {
            !props.disabled && content.emit('press')
        }

        return { clickHandler };
    },
    props: {
        cssClass,
        text: {
            type: String,
            requred: true,
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template lang="pug">
button.button(@click="clickHandler", type="button", :class="{'button--disabled': disabled }") {{text}}
</template>

<style lang="sass">
@import "../assets/variables"

.button
    font-size: 14px
    color: $button-color
    height: 3em
    border: 2px solid $button-color
    text-transform: lowercase
    padding: 0em 0.8em
    background-color: transparent
    cursor: pointer
    &:hover
        transform: translate(-1px,-1px)
    &:active
        transform: translate(1px,1px)
    &.button--disabled
        color: $button-color-dark
        border: 2px solid $button-color-dark
        transform: translate(1px,1px)
        cursor: not-allowed


</style>
