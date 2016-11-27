<template>
  <div class="homepage">
    <transition name="fade" mode="out-in">
      <div :key="location">
        <holder v-if="location !== 'apply'" :title="title" :subtitle="subtitle">
        </holder>
        <v-form v-else-if="location === 'apply'"></v-form>
      </div>
    </transition>
  </div>
</template>

<script>
import Holder from '../Holder/Holder'
import VForm from '../Form/VForm'
export default {
  name: 'homepage',
  components: {
    Holder,
    VForm
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
        case 'apply':
          return this.$store.getters.page.title.apply
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
        case 'apply':
          return this.$store.getters.page.subtitle.apply
        default:
          return this.$store.getters.page.subtitle.unknown
      }
    }
  }
}
</script>

<style>
</style>
