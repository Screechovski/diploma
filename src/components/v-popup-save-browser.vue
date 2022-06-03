<template lang="pug">

v-popup(cssClass="v-popup-save-browser" pKey="saveBrowserModal")
    template(#header="") Сохранить проект в браузере
    template(#content="")
        .v-popup-save-browser__inner
            v-field(
                cssClass="v-popup-save-browser__field"
                :value="field.name.value"
                :title="field.name.title"
                :valid="field.name.valid"
                type="text"
                @onInput="inputHandler"
            )
    template(#footer="")
        v-button(
            text="Сохранить"
            :disabled="!canSubmit"
            @press="submit"
        )

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VField from "@/molecules/v-field"
import VButton from "@/molecules/v-button"
import { useStore } from 'vuex'
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
    components: {
        VPopup,
        VButton,
        VField
    },
    setup(){
        const store = useStore()
        const field = reactive({
            name: {
                id: "name",
                value: "",
                title: "Название файла",
                valid: null,
            },
        })

        const inputHandler = (value) => {
            field.name.value = value;
            field.name.valid = value.length > 4;
        }

        const submit = () => {
            console.log("value", field.name.value);
            store.dispatch("popups/hidePopup", "saveBrowserModal")
        }

        const canSubmit = computed(() =>
            field.name.valid);

        return {
            field,
            closeHandler,
            inputHandler,
            canSubmit,
            submit
        }
    }
}
</script>

<style lang="sass">

.v-popup-save-browser
    &__inner
    &__field
        display: grid
        grid-template-columns: 140px 200px

</style>