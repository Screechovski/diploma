<template lang="pug">

.selector(:class="cssClass")
    .selector__label(v-if="title")
        p.selector__title {{title}}
    .selector__inner(:class="{ valid }")
        .selector__header(@click="toggleList")
            p {{selectedLine}}
            i.selector__icon(:class="{down: isOpen}")
                s-down-arrow
        .selector__body(v-if="isOpen")
            ul.selector__list
                li.selector__item(
                    v-for="item, id in list"
                    @click="selectItem(id)"
                ) {{item}}


</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { cssClass } from "@/assets/helper"
import SDownArrow from "@/svg/s-down-arrow"

export default {
    components: {
        SDownArrow
    },
    props: {
        cssClass,
        list: {
            type: Array,
            requred: true
        },
        selectedLine: {
            type: String,
            requred: true
        },
        disabled: {
            type: Boolean,
            default: false
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
    setup(props, { emit }) {
        const selectItem = (id) => {
            if (!props.disabled) {
                emit('select', { id })
                closeList();
            }
        }

        console.log(props);

        const isOpen = ref(false);

        onMounted(() => {
            window.addEventListener("click", windowClickhandler)
        })
        onUnmounted(() => {
            window.removeEventListener("click", windowClickhandler)
        })

        const windowClickhandler = e => {
            if (!e.target.closest(".selector")) {
                closeList();
            }
        }

        const closeList = () => isOpen.value = false;
        const toggleList = () => isOpen.value = !isOpen.value

        return {
            selectItem,
            isOpen,
            toggleList
        };
    },
}
</script>

<style lang="sass">
@import "../assets/variables"

.selector
    display: flex
    align-items: center
    gap: 7px
    &__inner
        &.valid
            .selector
                &__header
                    border-color: $button-color
                    color: $button-color
                &__icon
                    .svg
                        fill: $button-color
    &__header
        border: 1px solid $button-color-dark
        background-color: transparent
        font-size: 14px
        padding: 0em 0.5em
        outline: none
        color: $button-color-dark
        box-sizing: border-box
        display: flex
        align-items: center
        justify-content: space-between
        gap: 7px
        height: 2.428571em
        cursor: pointer
    &__title
        color: $button-color
    &__icon
        height: 12px
        width: 12px
        &.down
            .svg
                transform: rotate(180deg)
        .svg
            fill: $button-color-dark
    &__body
        position: relative
    &__list
        box-sizing: border-box
        position: absolute
        border: 1px solid $button-color-dark
        border-top: none
        top: 0
        left: 0
        width: 100%
        color: $button-color-dark
        z-index: 1
    &__item
        font-size: 14px
        padding: 0.5em
        background-color: $backgroud
        cursor: pointer
        &:hover
            background-color: $backgroud-light

</style>