<template lang="pug">

section.modeller(
    :class="{grab, [cssClass]: cssClass}",
    ref="modeller",
    @mousemove.passive="mouseMoveHandler",
    @click="mouseClickhandler"
)

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
        const modeller = ref(null);
        const store = useStore();

        onMounted(() =>
            store.dispatch("modeller/setRef", modeller.value));

        const grab = computed(() =>
            store.getters["panel/review"]);

        const mouseMoveHandler = (e) =>
            store.dispatch("modeller/mouseMove", e);

        const mouseClickhandler = (e) =>
            store.dispatch("modeller/clickHandler", e);

        return {
            modeller,
            grab,
            mouseMoveHandler,
            mouseClickhandler
        }
    }
}
</script>

<style lang="sass">
@import "../assets/variables.sass"

.modeller
    border-radius: $radius

.grab
    cursor: crosshair
</style>