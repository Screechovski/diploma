<template lang="pug">

v-popup(cssClass="popup-coordinate-axes", pKey="coordinateAxes")
    template(#header="") Выбрать рабочую плоскость
    template(#content="")
        .popup-coordinate-axes__inner
            v-checkbox(
                v-for="box, i in checkboxes"
                :selected="box.selected"
                @select="checkboxHandler(i)"
            ) {{box.text}}
    template(#footer="")
        v-button(text="Выбрать", :disabled="canSubmit", @press="submitHandler")

</template>

<script>
import VPopup from "@/molecules/v-popup"
import VButton from "@/molecules/v-button"
import VCheckbox from "@/molecules/v-checkbox"
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {
        VPopup,
        VButton,
        VCheckbox
    },
    setup(){
        const checkboxes = reactive([{
            text: "Ось XY",
            selected: false,
            value: "xy"
        },{
            text: "Ось XZ",
            selected: false,
            value: "xz"
        },{
            text: "Ось YZ",
            selected: false,
            value: "yz"
        }])
        const store = useStore();
        let selectedValue = null;

        const checkboxHandler = (i) => {
            checkboxes.forEach((item) => item.selected = false)
            checkboxes[i].selected = true
            selectedValue = checkboxes[i].value
        }

        const submitHandler = () => {
            if (selectedValue !== null) {
                store.dispatch("panel/coordinateAxesSubmit", selectedValue)
            }
        }

        const canSubmit = computed(() =>
            checkboxes.every(i => i.selected === false))

        return {
            checkboxes,
            checkboxHandler,
            submitHandler,
            canSubmit,
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