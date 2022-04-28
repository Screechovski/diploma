<template lang="pug">

.checkbox(@click="$emit('select')")
    i.checkbox__box
        s-check(v-if="selected")
    .checkbox__inner
        slot

</template>

<script>
import { cssClass } from "@/assets/helper.js"
import SCheck from "@/svg/s-check"

export default {
    props: {
        cssClass,
        selected: {
            type: Boolean,
            requared: true
        }
    },
    components: { SCheck }


}
</script>

<style lang="sass">
@import "../assets/variables"

.checkbox
    display: flex
    align-items: center
    gap: 7px
    cursor: pointer
    &__box
        display: block
        height: 21px
        width: 21px
        border: 2px solid $button-color
        display: flex
        align-items: center
        justify-content: center
        .svg
            max-height: 60%
            max-width: 60%
            fill: $button-color
    &__inner
        color: $button-color
</style>