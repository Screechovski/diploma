<template lang="pug">

v-popup(cssClass="v-popup-export" pKey="exportModal")
    template(#header="") Параметры экспорта
    template(#content="")
        .v-popup-export__inner
            v-selector(
                :selectedLine="selectedLine"
                :title="fieldsObject.type.title"
                :valid="fieldsObject.type.valid"
                :list="list"
                @select="selectItem"
            )
            v-field(
                :value="fieldsObject.name.value"
                :title="fieldsObject.name.title"
                :valid="fieldsObject.name.valid"
                type="text"
                @onInput="inputHandler"
            )
    template(#footer="")
        v-button(
            text="Скачать"
            :disabled="!canSubmit"
            @press="submit"
        )

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VField from "@/molecules/v-field"
import VButton from "@/molecules/v-button"
import VSelector from "@/molecules/v-selector"
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
        const selectedLine = ref("Выберите тип файла")
        const list = [
            'GLTF',
            'Collada',
            'DRACO',
            'MMD',
            'OBJ',
            'PLY',
            'STL',
            'USDZ'
        ];

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
            const cleanValues = {};
            Object.values(fieldsObject).forEach(item =>
                cleanValues[item.id] = item.value)

            store.dispatch("modeller/exportScene", cleanValues)
            store.dispatch("popups/hidePopup", "exportModal")
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
.v-popup-export
    &__inner
        display: flex
        flex-direction: column
        gap: 10px
</style>