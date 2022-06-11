<template lang="pug">

v-popup(cssClass="v-popup-message-box" pKey="messageBox", @onClose="closeHandler")
    template(#header="", v-if="title") {{title}}
    template(#content="")
        .v-popup-message-box__inner
            p.v-popup-message-box__message {{message}}
        .v-popup-message-box__button-row
            v-button(
                cssClass="v-popup-message-box__button cancel"
                text="Отмена"
                :disabled="false"
                @press="cancelHandler"
                v-show="showCancel"
            )
            v-button(
                cssClass="v-popup-message-box__button yes"
                text="Yes"
                :disabled="false"
                @press="yesHandler"
                v-show="showYes"
            )
            v-button(
                cssClass="v-popup-message-box__button no"
                text="Net"
                :disabled="false"
                @press="noHandler"
                v-show="showNo"
            )

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VButton from "@/molecules/v-button"
import { cssClass } from "@/assets/helper";
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    props: {
        cssClass,
        title: {
            type: String,
            default: null
        },
        message: {
            type: String,
            requared: true
        },
        showYes: {
            type: Boolean,
            default: true
        },
        showNo: {
            type: Boolean,
            default: true
        },
        showCancel: {
            type: Boolean,
            default: true
        },
    },
    components: {
        VPopup,
        VButton,
    },
    setup(props, { emit }){

        const cancelHandler = () =>
            emit("onCancel")
        const yesHandler = () =>
            emit("onYes")
        const noHandler = () =>
            emit("onNo")
        const closeHandler = () =>
            emit("onClose")

        return {
            cancelHandler,
            yesHandler,
            noHandler,
            closeHandler
        }
    }
}
</script>

<style lang="sass">

.v-popup-message-box
    &__inner
    &__message
        text-align: center
        margin-bottom: 1em
        font-size: 16px
        line-height: 1.4em
        color: var(--button-color)
        text-transform: lowercase
    &__button-row
        display: grid
        grid-template-columns: auto 80px auto auto
        grid-template-areas: "cancel . yes no"
        gap: 13px
    &__button
        &.cancel
            grid-area: cancel
        &.yes
            grid-area: yes
        &.no
            grid-area: no
</style>