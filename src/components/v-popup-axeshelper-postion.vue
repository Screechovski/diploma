<template lang="pug">

v-popup(cssClass="popup-coordinate-axes" pKey="axesHelperPostion")
    template(#header="") Впишите координаты
    template(#content="")
        .popup-coordinate-axes__inner
            v-field(
                v-for="field in fields"
                cssClass=""
                :key="field.id"
                :value="field.value"
                :title="field.title"
                :valid="field.valid"
                @onInput="value => fieldHandler(field.id)(value)"
            )
    template(#footer="")
        v-button(
            text="Добавить",
            :disabled="!canSubmit",
            @press="submitHandler"
        )

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VButton from "@/molecules/v-button"
import VField from "@/molecules/v-field"
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {
        VPopup,
        VButton,
        VField
    },
    setup(){
        const store = useStore();
        const fields = reactive({
            x: {
                id: "x",
                value: "",
                title: "Координата X",
                valid: null,
            },
            y: {
                id: "y",
                value: "",
                title: "Координата Y",
                valid: null,
            },
            z: {
                id: "z",
                value: "",
                title: "Координата Z",
                valid: null,
            },
        })

        const fieldHandler = (id) => (value) => {
            fields[id].value = value;
            fields[id].valid = !(/[^0-9]/).test(value);
        }

        const canSubmit = computed(() =>
            Object.values(fields).every(item => item.value !== ""))

        const submitHandler = () => {
            const cleanFields = Object.values(fields).map(({id, value}) => value);
            store.dispatch("modeller/addCoordinates", cleanFields)
            store.dispatch("popups/hidePopup", "axesHelperPostion")
            store.dispatch("tree/getTree")
        }

        return {
            fields,
            fieldHandler,
            canSubmit,
            submitHandler
        }
    }
}
</script>

<style lang="sass">

.popup-coordinate-axes
    &__inner
        display: flex
        flex-direction: column
        gap: 10px

</style>