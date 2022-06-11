<template lang="pug">

v-popup(cssClass="v-popup-choose-project" pKey="chooseProject" @onClose="closeHandler")
    template(#header="") Выбор проекта
    template(#content="")
        .v-popup-choose-project__inner
            v-selector(
                cssClass="v-popup-choose-project__field"
                :selectedLine="selectedLine"
                :title="fieldsObject.type.title"
                :valid="fieldsObject.type.valid"
                :list="list"
                @select="selectItem"
            )
            v-button(
                text="Выбрать"
                :disabled="false"
                @press="()=>{}"
            )
    template(#footer="")
        v-button(
            text="Новый проект"
            :disabled="false"
            @press="()=>{}"
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

export default {
    components: {
        VPopup,
        VField,
        VButton,
        VSelector
    },
    setup(){
        const store = useStore();
        const fieldsObject = reactive({
            type: {
                id: "type",
                value: "",
                title: "Тип файла",
                valid: null,
            },
            name: {
                id: "name",
                value: "",
                title: "Название",
                valid: null,
            },
        })
        const selectedLine = ref("Выберите проект")
        const list = ExportTypes;

        const selectItem = ({id}) => {
            selectedLine.value = list[id]
            fieldsObject.type.valid = true;
            fieldsObject.type.value = list[id];
        }

        const canSubmit = computed(() =>
            Object.values(fieldsObject).every(i => i.valid));

        const inputHandler = (value) => {
            const cleanValue = value.replace(/[^0-9a-z]/gi, '');
            fieldsObject.name.valid = cleanValue.length > 2;
            fieldsObject.name.value = cleanValue;
        }

        const submit = () => {
            console.log("choose-project click");
        }

        return {
            canSubmit,
            submit,
            selectItem,
            selectedLine,
            list,
            fieldsObject,
            inputHandler
        }
    }
}
</script>

<style lang="sass">

.v-popup-choose-project

</style>