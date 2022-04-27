<template>
    <div id="panel" :class="cssClass">
        <h1>test {{readersNumber}} {{book.title}}</h1>
        <button @click="initHandler">Init</button>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { cssClass } from "@/helpers/props"
import { mapActions } from 'vuex';

export default {
    name: 'VPanel',
    props: {
        cssClass
    },
    setup(props, context) {
        const readersNumber = ref(0)
        const book = reactive({ title: 'Vue 3 Guide' })

        return {
            readersNumber,
            book
        }
    },
    methods: {
        ...mapActions({
            initModeller: 'modeller/init'
        }),
        initHandler(){
            console.log(this);
        }
    }
}
</script>

<style lang="sass">
h1
    font-size: 30px
    color: red
</style>