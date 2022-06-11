<template lang="pug">

v-popup(cssClass="v-popup-save" pKey="saveModal" @onClose="closeSaveHandler")
    template(#header="") Сохранить проект
    template(#content="")
        .v-popup-save__inner
            v-button(
                text="В браузере"
                :disabled="false"
                @press="browserHandler"
            )
            v-button(
                text="На сервере"
                :disabled="false"
                @press="serverHandler"
            )
            v-button(
                text="Локально"
                :disabled="false"
                @press="localHandler"
            )

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VButton from "@/molecules/v-button"
import { useStore } from 'vuex'

export default {
    components: {
        VPopup,
        VButton,
    },
    setup(){
        const store = useStore()

        const localHandler = () => {
            store.dispatch("panel/clickExportModal")
            store.dispatch("panel/disactiveSaveModal")
            store.dispatch("popups/hidePopup", "saveModal")
        }

        const serverHandler = () => {
            //store.dispatch("panel/clickExportModal") TODO
            store.dispatch("panel/disactiveSaveModal")
            store.dispatch("popups/hidePopup", "saveModal")
        }

        const browserHandler = () => {
            store.dispatch("popups/showPopup", "saveBrowserModal")
            store.dispatch("panel/disactiveSaveModal")
            store.dispatch("popups/hidePopup", "saveModal")
        }

        const closeSaveHandler = () => {
            store.dispatch("panel/disactiveSaveModal")
        }


        return {
            localHandler,
            browserHandler,
            serverHandler,
            closeSaveHandler
        }
    }
}
</script>

<style lang="sass">

.v-popup-save
    &__inner
        display: grid
        grid-template-columns: 1fr 1fr 1fr
        gap: 10px

</style>