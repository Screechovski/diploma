<template lang="pug">

v-popup(cssClass="v-popup-save-browser" pKey="saveBrowserModal")
    template(#header="") cохранить проект в браузере
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

Teleport(to="main.main" v-if="showMessageBox")
    v-popup-message-box(
        message="Фаил успешно сохранён"
        title="Оповещение"
        @onClose="closeMessageBoxHandler"
        :showYes="false"
        :showNo="false"
        :showCancel="false"
    )

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VField from "@/molecules/v-field"
import VButton from "@/molecules/v-button"
import { useStore } from 'vuex'
import { reactive, ref, computed } from 'vue'
import VPopupMessageBox from "@/components/v-popup-message-box"

export default {
    components: {
        VPopup,
        VButton,
        VField,
        VPopupMessageBox
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
            //store.dispatch("popups/hidePopup", "saveBrowserModal");  TODO проверка на уже существующий проект, и warning о том что перезапишет фаил
            store.dispatch("modeller/save", { name: field.name.value })
            showMessageBox.value = true;
            console.log("value save-browser", field.name.value);
        }

        const canSubmit = computed(() =>
            field.name.valid);

        const showMessageBox = ref(false)

        const closeMessageBoxHandler = () => {
            store.dispatch("popups/hidePopup", "saveBrowserModal");

            showMessageBox.value = false;
        }


        return {
            field,
            inputHandler,
            canSubmit,
            submit,
            showMessageBox,

            closeMessageBoxHandler,
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