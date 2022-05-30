<template lang="pug">

v-panel(cssClass="main__panel")
v-modeller(cssClass="main__modeller")
v-tree(cssClass="main__tree")
v-status-line(cssClass="main__status-line")

</template>

<script>
import VModeller from '@/components/v-modeller'
import VPanel from '@/components/v-panel'
import VTree from '@/components/v-tree'
import VStatusLine from '@/components/v-status-line'

export default {
    components: {
        VPanel,
        VModeller,
        VTree,
        VStatusLine
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.main
    height: 100vh
    width: 100vw
    display: grid
    grid-template-rows: 100px 1fr 30px
    grid-template-columns: 200px 1fr
    gap: 10px
    padding: 15px
    box-sizing: border-box
    grid-template-areas: "panel panel" "tree modeller" "status-line status-line"
    @media screen and (max-width: 768px)
        grid-template-columns: 1fr
        grid-template-rows: 30px 1fr 100px
        grid-template-areas: "status-line" "modeller" "panel"
    &__panel
        grid-area: panel
        // max-width: calc(100vw - 30px)
    &__modeller
        grid-area: modeller
        max-width: calc(100vw - 235px)
        @media screen and (max-width: 768px)
            max-width: 100%
    &__status-line
        grid-area: status-line
    &__tree
        grid-area: tree
        @media screen and (max-width: 768px)
            display: none
</style>