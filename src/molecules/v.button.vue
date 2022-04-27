<script>
import { cssClass } from "@/helpers/props";
export default {
    setup() {
        
    },
    props: {
        cssClass,
        text: {
            type: String,
            requred: true,
        },
        onClick: {
            type: Function,
            requred: true,
        }
    }
}
</script>

<template lang="pug">
button.button(@click="onClick", type="button") {{text}}
</template>

<style lang="sass" scoped>
.button
    font-size: 14px
    color: lime
    height: 3em
    border: 2px solid lime
    text-transform: lowercase
    padding: 0em 0.8em
    background-color: transparent
    cursor: pointer
    &:hover
        transform: translate(-1px,-1px)
    &:active
        transform: translate(1px,1px)

</style>
