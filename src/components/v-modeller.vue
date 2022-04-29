<template lang="pug">

section.modeller(:class="{grab, [cssClass]: cssClass}", ref="modeller")

</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from "vuex"
import { cssClass } from "@/assets/helper"

export default {
    props: {
        cssClass
    },
    setup(){
        const modeller = ref(null)
        const store = useStore()

        onMounted(() =>
            store.dispatch("modeller/setRef", modeller.value))

        const grab = computed(() =>
            store.getters["panel/review"])

        return { modeller, grab }
    }
}
</script>

<style lang="sass">
@import "../assets/variables.sass"

.modeller
    border-radius: $radius

.grab
    cursor: grab
</style>