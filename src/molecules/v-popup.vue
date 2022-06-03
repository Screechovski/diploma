<template lang="pug">

section.popup(:class="cssClass", @click.self="close")
    .popup__inner
        button.popup__close(@click.stop="close")
            s-cross
        header.popup__header
            slot(name="header")
        .popup__content
            slot(name="content")
        footer.popup__footer
            slot(name="footer")

</template>

<script>
import { cssClass } from "@/assets/helper"
import SCross from "@/svg/s-cross"
import { useStore } from 'vuex';

export default {
    props: {
        cssClass,
        pKey: {
            type: String,
            requared: true
        }
    },
    components: { SCross },
    setup(props, {emit}){
        const store = useStore();
        const close = () => {
            store.dispatch("popups/hidePopup", props.pKey);
            emit("onClose")
        }

        return {
            close
        }
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.popup
    position: fixed
    height: 100vh
    width: 100vw
    overflow: hidden
    top: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center
    &__inner
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column
        position: relative
        gap: 20px
        min-width: 400px
        max-width: 900px
        padding: 15px
        background-color: $backgroud
        box-shadow: 0px 0px 20px $backgroud-dark
        @media screen and (max-width: 768px)
            min-width: auto
    &__header
        color: $button-color
        text-transform: lowercase
    &__close
        position: absolute
        top: 3px
        right: 3px
        height: 21px
        width: 21px
        border: 2px solid $button-color
        display: flex
        align-items: center
        justify-content: center
        padding: 0
        background-color: transparent
        cursor: pointer
        &:hover
            transform: translate(-1px,-1px)
        &:active
            transform: translate(1px,1px)
        .svg
            max-height: 50%
            max-width: 50%
            fill: $button-color
</style>