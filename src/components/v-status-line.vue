<template lang="pug">

section(:class="cssClass", class="status-line")
    p.status-line__line {{line}}

</template>

<script>
import { cssClass } from "@/assets/helper";
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    props: { cssClass },
    setup(){
        const store = useStore();
        const line = computed(() =>
            store.getters["helper/line"]);

        return { line }
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.status-line
    background-color: $backgroud
    display: flex
    align-items: center
    padding-left: 10px
    &__line
        color: $button-color-dark
</style>