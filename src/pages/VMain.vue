<template>
    <v-panel cssClass="main__panel" />
    <v-modeller cssClass="main__modeller" />
</template>

<script>
import VModeller from '@/components/v.modeller'
import VPanel from '@/components/v.panel'

export default {
    components: {
        VPanel,
        VModeller
    }
}
</script>

<style lang="sass">
.main
    height: 100vh
    display: grid
    grid-template-rows: 100px 1fr
    padding: 15px
    &__modeller
    &__panel
</style>