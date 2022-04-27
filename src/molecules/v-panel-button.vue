<template lang="pug">
button(
    type="button",
    class="panel-button",
    :class="{ active }",
    @click="toggleActive"
)
    i(class="panel-button__icon")
        slot
    span(class="panel-button__text") {{text}}
</template>

<script>
import { ref } from 'vue';

export default {
    props:{
        text: {
            type: String,
            requred: true
        }
    },
    setup(){
        const active = ref(false);

        const toggleActive = () => {
            active.value = !active.value
        }

        return { active, toggleActive }
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.panel-button
    height: 70px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 5px
    background-color: transparent
    border: 2px solid $button-color-dark
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
            fill: $button-color-dark
    &__text
        font-size: 14px
        text-transform: lowercase
        color: $button-color-dark
    &.active
        border: 2px solid $button-color
        transform: translate(1px, 1px)
        .panel-button
            &__icon
                .svg
                    fill: $button-color
            &__text
                color: $button-color
</style>