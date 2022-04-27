<template>
    <div ref="modeller" class="modeller" :class="cssClass"></div>
</template>

<script>
import { ref, onMounted } from 'vue'
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

        return { modeller }
    }
}
</script>

<style lang="sass">
@import "../assets/variables.sass"

.modeller
    border-radius: $radius
</style>