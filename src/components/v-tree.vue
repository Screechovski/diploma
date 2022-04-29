<template lang="pug">

section(:class="cssClass", class="tree")
    ul.tree__list
        li.tree__item.tree-item(v-for="item in items")
            p.tree-item__name Имя: {{ item.name ? item.name : "-" }}
            p.tree-item__type Тип: {{ item.type }}
            button.tree-item__delete
                s-trash

</template>

<script>
import { cssClass } from "@/assets/helper"
import { useStore } from "vuex"
import { onMounted, computed } from "vue"
import STrash from "@/svg/s-trash"

export default {
    components: { STrash },
    props: { cssClass },
    setup(){
        const store = useStore();
        onMounted(() => {
            store.dispatch("tree/getTree")
        })

        const items = computed(() =>
            store.getters["tree/treeList"])

        console.log(items);

        return { items }
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.tree
    background-color: $backgroud
    padding: 5px
    &__list
        display: flex
        flex-direction: column
        gap: 5px
    &__item

.tree-item
    padding: 7px
    color: $button-color
    display: grid
    grid-template-columns: 1fr 21px
    grid-template-areas: "name delete" "type delete"
    border: 2px solid $backgroud-light
    background-color: $backgroud
    gap: 5px
    &__name
        grid-area: name
        font-size: 12px
    &__type
        grid-area: type
        font-size: 12px
    &__delete
        grid-area: delete
        height: 21px
        width: 21px
        color: $button-color-dark
        border: 1px solid $button-color-dark
        background-color: transparent
        cursor: pointer
        padding: 0
        display: flex
        align-items: center
        justify-content: center
        .svg
            fill: $button-color-dark
            height: 70%
            width: 70%
        &:hover
            color: $button-color
            border-color: $button-color
            .svg
                fill: $button-color

</style>