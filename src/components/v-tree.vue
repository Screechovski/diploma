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
                button.tree-item__button(@click="removeTreeItem(id)")
                    s-trash
                button.tree-item__button(@click="editItem(id)")
                    s-edit
                button.tree-item__button(@click="toggleVisible(id)")
                    s-eye(v-if="item.visible")
                    s-eye-crossed(v-else)
                button.tree-item__button(@click="toggleWireframe(id)", v-if="item.wireframe !== null")
                    s-square(v-if="item.wireframe")
                    s-square-filled(v-else)

</template>

<script>
import { cssClass } from "@/assets/helper"
import { useStore } from "vuex"
import { computed } from "vue"
import STrash from "@/svg/s-trash"
import SEye from "@/svg/s-eye"
import SEyeCrossed from "@/svg/s-eye-crossed"
import SEdit from "@/svg/s-edit"
import SSquare from "@/svg/s-square"
import SSquareFilled from "@/svg/s-square-filled"
import VButton from "@/molecules/v-button"

export default {
    components: {
        STrash,
        VButton,
        SEye,
        SEdit,
        SEyeCrossed,
        SSquare,
        SSquareFilled,
    },
    props: { cssClass },
    setup(){
        const store = useStore();

        const removeTreeItem = (id) =>
            store.dispatch("tree/removeItem", id);

        const items = computed(() =>
            store.getters["tree/treeList"])
        const treeisEmpty = computed(() =>
            store.getters["tree/treeisEmpty"])

        const addCoordinates = () =>
            store.dispatch("popups/showPopup", "axesHelperPostion");

        const toggleVisible = (id) =>
            store.dispatch("tree/toggleVisible", id);

        const toggleWireframe = (id) =>
            store.dispatch("tree/toggleWireframe", id)

        const editItem = (id) => {
            console.log("editItem", id);
        }

        return {
            items,
            removeTreeItem,
            treeisEmpty,
            addCoordinates,
            toggleVisible,
            toggleWireframe,
            editItem
        }
    }
}
</script>

<style lang="sass">
.tree
    background-color: var(--backgroud)
    padding: 10px 6px 10px 10px
    &__list
        display: flex
        flex-direction: column
        gap: 5px
        max-height: 100%
        overflow: auto
        &::-webkit-scrollbar
            width: 5px
            background-color: var(--backgroud)
            border-radius: 2px
        &::-webkit-scrollbar-thumb
            background-color: var(--button-color-dark)
            border-radius: 2px
    &__item
        margin-right: 4px

.tree-item
    padding: 7px
    color: var(--button-color)
    display: flex
    flex-direction: column
    border: 2px solid  var(--backgroud-light)
    background-color: var(--backgroud)
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
        color: var(--button-color-dark)
        border: 1px solid var(--button-color-dark)
        background-color: transparent
        cursor: pointer
        padding: 0
        display: flex
        align-items: center
        justify-content: center
        .svg
            fill: var(--button-color-dark)
            height: 70%
            width: 70%
        &:hover
            color: var(--button-color)
            border-color: var(--button-color)
            .svg
                fill: var(--button-color)
    &__button-row
        display: flex
        gap: 5px


</style>