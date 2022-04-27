<template>
    <v-main></v-main>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import VMain from "@/pages/v-main"

export default {
    components: { VMain },
    setup(){
        const store = useStore();

        const render = () => store.dispatch("modeller/updateRender");

        onMounted(() =>
            window.addEventListener("resize", render))
        onUnmounted(() =>
            window.removeEventListener("resize", render))
    }
}
</script>

<style lang="sass">
body
    overflow: hidden
    background-color: #000
*
    font-family: 'Source Code Pro', 'DejaVu Sans', serif
    font-weight: 600
</style>