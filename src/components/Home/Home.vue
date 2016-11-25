<template>
  <div class="homepage">
  <transition name="fade" mode="out-in">
    <holder :key="location" :title="title" :subtitle="subtitle">
    </holder>
  </transition>
  </div>
</template>

<script>
import Holder from '../Holder/Holder'

export default {
  name: 'homepage',
  components: {
    'holder': Holder
  },
  computed: {
    location () {
      return this.$store.getters.page.location
    },
    title () {
      switch (this.location) {
        case 'home':
          return this.$store.getters.page.title.home
        case 'about':
          return this.$store.getters.page.title.about
        case 'timeline':
          return this.$store.getters.page.title.timeline
        case 'roster':
          return this.$store.getters.page.title.roster
        default:
          return this.$store.getters.page.title.unknown
      }
    },
    subtitle () {
      switch (this.location) {
        case 'home':
          return this.$store.getters.page.subtitle.home
        case 'about':
          return this.$store.getters.page.subtitle.about
        case 'timeline':
          return this.$store.getters.page.subtitle.timeline
        case 'roster':
          return this.$store.getters.page.subtitle.roster
        default:
          return this.$store.getters.page.subtitle.unknown
      }
    }
  }
}
</script>

<style>
</style>
