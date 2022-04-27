<template>
    <v-panel cssClass="main__panel" />
    <v-modeller cssClass="main__modeller" />
</template>

<script>
import VModeller from '@/components/VModeller'
import VPanel from '@/components/VPanel'

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
    grid-template-rows: 200px 1fr
    &__modeller
    &__panel
</style>