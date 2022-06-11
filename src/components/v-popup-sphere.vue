<template lang="pug">

v-popup(cssClass="v-popup-rectangle" pKey="sphereParams" @onClose="closeHandler")
    template(#header="") Параметры шара
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
            radius: {
                id: "radius",
                value: "",
                title: "Радиус",
                valid: null,
            },
            startX: {
                id: "startX",
                value: "",
                title: "Старт X",
                valid: null,
            },
            startY: {
                id: "startY",
                value: "",
                title: "Старт Y",
                valid: null,
            },
            startZ: {
                id: "startZ",
                value: "",
                title: "Старт Z",
                valid: null,
            },
        })

        const fields = computed(() =>
            Object.values(fieldsObject))

        const canSubmit = computed(() =>
            fields.value.every(i => i.valid))

        const fieldHandler = (id) => (value) => {
            fieldsObject[id].value = value;
            fieldsObject[id].valid = !isNaN(+value);
        }

        const submit = () => {
            const cleanValues = {};
            Object.values(fieldsObject).forEach(item =>
                cleanValues[item.id] = parseFloat(item.value))

            console.log(cleanValues);
            store.dispatch("panel/sphereSubmit", cleanValues)
        }

        const closeHandler = () =>
            store.dispatch("panel/disactiveSphereParams")

        return {
            fields,
            canSubmit,
            fieldHandler,
            submit,
            closeHandler
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