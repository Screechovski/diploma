<template lang="pug">

v-panel(cssClass="main__panel")
v-modeller(cssClass="main__modeller")

</template>

<script>
import VModeller from '@/components/v-modeller'
import VPanel from '@/components/v-panel'

export default {
    components: {
        VPanel,
        VModeller
    }
}
</script>

<style lang="sass">
@import "../assets/variables"

.main
    height: 100vh
    width: 100vw
    display: grid
    grid-template-rows: 100px 1fr
    gap: 15px
    padding: 15px
    box-sizing: border-box
    &__panel
        max-width: calc(100vw - 30px)
    &__modeller
        max-width: calc(100vw - 30px)
</style>