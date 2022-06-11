<template lang="pug">

label.field(:class="cssClass")
    p.field__title(v-if="title") {{title}}
    input.field__input(
        :value="value"
        :class="validClass"
        type="text"
        :inputmode="getInputmode()"
        @input.prevent="inputHandler"
    )

</template>

<script>
import { cssClass } from "@/assets/helper"
import { computed } from 'vue'

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
        type: {
            type: String,
            default: "text"
        }
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
            emit("onInput", e.target.value)
        }

        const getInputmode = () => props.type === "text" ? "text" : "decimal";

        return {
            validClass,
            inputHandler,
            getInputmode
        }
    }
}
</script>

<style lang="sass">
.field
    display: flex
    align-items: center
    gap: 7px
    &__title
        color: var(--button-color)
    &__input
        border: 1px solid var(--button-color-dark)
        background-color: transparent
        font-size: 14px
        padding: 0.5em
        outline: none
        color: var(--button-color-dark)
        box-sizing: border-box
        &.success
            color: var(--button-color)
            border-color: var(--button-color)
        &.error
            color: var(--red)
            border-color: var(--red)
</style>