<template lang="pug">

section(:class="cssClass", class="tree")
    ul.tree__list
        li.tree__item.tree-add-coordinates(v-if="treeisEmpty")
            v-button(
                cssClass="tree-add-coordinates",
                text="Добавить ось координат",
                @press="addCoordinates"
            )
        li.tree__item.tree-item(v-for="item, id in items", v-else)
            p.tree-item__name Имя: {{ item.name ? item.name : "-" }}
            p.tree-item__type Тип: {{ item.type }}
            .tree-item__button-row
                button.tree-item__button.tree-item__delete(@click="removeTreeItem(id)")
                    s-trash
                button.tree-item__button.tree-item__edit(@click="() => {}")
                    s-edit
                button.tree-item__button.tree-item__visible(@click="() => {}")
                    s-eye

</template>

<script>
import { cssClass } from "@/assets/helper"
import { useStore } from "vuex"
import { onMounted, computed } from "vue"
import STrash from "@/svg/s-trash"
import SEye from "@/svg/s-eye"
import SEdit from "@/svg/s-edit"
import VButton from "@/molecules/v-button"

export default {
    components: { STrash, VButton, SEye, SEdit },
    props: { cssClass },
    setup(){
        const store = useStore();
        onMounted(() => {
            store.dispatch("tree/getTree")
        })

        const removeTreeItem = (id) =>
            store.dispatch("tree/removeItem", id);

        const items = computed(() =>
            store.getters["tree/treeList"])

        const treeisEmpty = computed(() =>
            store.getters["tree/treeisEmpty"])

        const addCoordinates = () =>
            store.dispatch("popups/showPopup", "axesHelperPostion");


        return { items, removeTreeItem, treeisEmpty, addCoordinates }
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
    display: flex
    flex-direction: column
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
    &__edit
        grid-area: edit
    &__visible
        grid-area: visible
    &__button
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
    &__button-row
        display: flex
        gap: 5px


</style>