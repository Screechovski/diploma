<template lang="pug">

section.modeller(
    :class="{grab, cross, [cssClass]: cssClass}",
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

        const cross = computed(() =>
            store.getters["panel/drawingPoint"] || store.getters["panel/drawingSquare"] || store.getters["panel/drawingCircle"] );

        const mouseMoveHandler = (e) =>
            store.dispatch("modeller/mouseMove", e);

        const mouseClickhandler = async (e) =>
            await store.dispatch("modeller/clickHandler", e);

        return {
            modeller,
            grab,
            mouseMoveHandler,
            mouseClickhandler,
            cross
        }
    }
}
</script>

<style lang="sass">
.modeller
    border-radius: var(--radius)

.grab
    cursor: grab

.cross
    cursor: crosshair
</style>