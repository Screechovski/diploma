<template lang="pug">

section(:class="cssClass", class="status-line")

</template>

<script>
import { cssClass } from "@/assets/helper"

export default {
    props: { cssClass }
}
</script>

<style lang="sass">
@import "../assets/variables"

.status-line
    background-color: $backgroud
</style>