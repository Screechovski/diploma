<template lang="pug">

v-popup(cssClass="v-popup-settings" pKey="settingsModal" @onClose="closeHandler")
    template(#header="") настройки
    template(#content="")
        .v-popup-settings__inner
            .v-popup-settings__label-list
                label.v-popup-settings__label(v-for="key in Object.keys(fields)" :key="key")
                    span {{variablesRu[key]}}
                    input(type="color" :value="fields[key]" @change="(e) => changeColorHandler(key)(e)")
            v-button(
                text="Тема по умолчанию"
                :disabled="false"
                @press="resetHandler"
            )
    template(#footer="")
        v-button(
            text="Сохранить"
            :disabled="false"
            @press="submitHandler"
        )

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VField from "@/molecules/v-field"
import VButton from "@/molecules/v-button"
import VSelector from "@/molecules/v-selector"
import { ExportTypes } from "@/assets/constants"
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { variablesRu } from "@/assets/constants"

export default {
    components: {
        VPopup,
        VField,
        VButton,
        VSelector
    },
    setup(){
        const store = useStore();

        const closeHandler = () =>
            store.dispatch("panel/disactiveSettingsParams")

        const changeColorHandler = (name) => (e) =>
            store.dispatch("core/setColor", { key: name, value: e.target.value })

        const fields = computed(() => {
            const object = store.getters["core/getColorsObject"];

            delete object.radius;

            return object;
        })

        const submitHandler = () => {
            store.dispatch("core/saveColors");
            store.dispatch("panel/settingsSubmit");
        };

        const resetHandler = () =>
            store.dispatch("core/resetColors");

        return {
           closeHandler,
           changeColorHandler,
           fields,
           variablesRu,
           submitHandler,
           resetHandler
        }
    }
}
</script>

<style lang="sass">

.v-popup-settings
    &__inner
        display: flex
        flex-direction: column
        gap: 10px
    &__label-list
        display: flex
        flex-direction: column
        gap: 7px
    &__label
        display: flex
        align-items: center
        gap: 7px
        span
            color: var(--button-color)

</style>