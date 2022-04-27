<template>
    <v-main></v-main>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import VMain from "@/pages/VMain"
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
    $border-radius: 10px

*
    font-family: 'Source Code Pro', 'DejaVu Sans', serif
    font-weight: 600
</style>