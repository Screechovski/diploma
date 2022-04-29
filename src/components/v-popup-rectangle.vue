<template lang="pug">

v-popup(cssClass="v-popup-rectangle" pKey="rectangleParams")
    template(#header="") Параметры прямоугольника
    template(#content="")
        .v-popup-rectangle__inner
            v-field(
                v-for="field in fields"
                cssClass="v-popup-rectangle__field"
                :key="field.id"
                :value="field.value"
                :title="field.title"
                :valid="field.valid"
                @onInput="value => fieldHandler(field.id)(value)"
            )
    template(#footer="")
        v-button(
            text="Создать"
            :disabled="!canSubmit"
            @press="submit"
        )

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VField from "@/molecules/v-field"
import VButton from "@/molecules/v-button"
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {
        VPopup,
        VField,
        VButton
    },
    setup(){
        const store = useStore();
        const fieldsObject = reactive({
            startX: {
                id: "startX",
                value: "",
                title: "Старт X",
                valid: null,
            },
            width: {
                id: "width",
                value: "",
                title: "Ширина",
                valid: null,
            },
            startY: {
                id: "startY",
                value: "",
                title: "Старт Y",
                valid: null,
            },
            height: {
                id: "height",
                value: "",
                title: "Высота",
                valid: null,
            },
            startZ: {
                id: "startZ",
                value: "",
                title: "Старт Z",
                valid: null,
            },
            length: {
                id: "length",
                value: "",
                title: "Длина",
                valid: null,
            }
        })

        const fields = computed(() =>
            Object.values(fieldsObject))

        const canSubmit = computed(() =>
            fields.value.every(i => i.valid))

        const fieldHandler = (id) => (value) => {
            fieldsObject[id].value = value;
            fieldsObject[id].valid = !(/[^0-9]/).test(value);
        }

        const submit = () => {
            const cleanValues = {};
            fields.value.forEach(i => {
                cleanValues[i.id] = i.value;
            })
            store.dispatch("panel/squareSubmit", cleanValues)
        }

        return {
            fields,
            canSubmit,
            fieldHandler,
            submit
        }
    }
}
</script>

<style lang="sass">
.v-popup-rectangle
    &__inner
        display: grid
        grid-template-columns: 1fr 1fr
        gap: 10px
    &__field
        justify-content: flex-end
        .field__input
            width: 60px
</style>