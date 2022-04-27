<template>
    <div class="panel" :class="cssClass">
        <v-button text="privet" :onClick="a" />
    </div>
</template>

<script>
import { cssClass } from "@/helpers/props"
import VButton from '@/molecules/v.button.vue'

export default {
    props: {
        cssClass
    },
    components: { VButton },
    setup(){
        const a = () => console.log(1);

        return { a };
    }
}
</script>

<style lang="sass">
.panel
    padding: 15px
    background-color: black
</style>