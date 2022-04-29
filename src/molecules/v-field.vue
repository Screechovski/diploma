<template lang="pug">

label.field(:class="cssClass")
    p.field__title(v-if="title") {{title}}
    input.field__input(
        :value="value"
        :class="validClass"
        @input.prevent="inputHandler"
    )

</template>

<script>
import { cssClass } from "@/assets/helper"
import { computed } from '@vue/runtime-core'

export default {
    props: {
        cssClass,
        value: {
            type: String,
            requred: true
        },
        title: {
            type: String,
            default: null
        },
        valid: {
            type: Boolean,
            default: null
        },
    },
    setup(props, { emit }){
        const validClass = computed(() => {
            if (props.valid) {
                return "success";
            } else if (props.valid === false) {
                return "error"
            }
            return "";
        })

        const inputHandler = (e) => {
            emit("onInput", e.target.value.replace(/[^0-9]/gi, ''))
        }

        return {
            validClass,
            inputHandler
        }
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.field
    display: flex
    align-items: center
    gap: 7px
    &__title
        color: $button-color
    &__input
        border: 1px solid $button-color-dark
        background-color: transparent
        font-size: 14px
        padding: 0.5em
        outline: none
        color: $button-color-dark
        box-sizing: border-box
        &.success
            color: $button-color
            border-color: $button-color
        &.error
            color: $red
            border-color: $red
</style>