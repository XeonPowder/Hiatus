<template>
  <transition name="fade">
    <router-link :to="'/'+title+'-'+id">
      <holder id="plank" :title="title" :subtitle="subtitle">
      </holder>
    </router-link>
  </transition>
</template>
<script>
import Holder from '../Holder/Holder'
import Chip from './Chip'
export default{
  props: ['title', 'chips', 'subtitle', 'id'],
  components: {
    Chip,
    Holder
  },
  name: 'plank',
  data () {
    return {
      show: false,
      expanded: false
    }
  },
  methods: {
    expand () {
      this.show = !this.show
      this.expanded = !this.expanded
    }
  }
}
</script>
<style scoped>
#plank {
  position: relative;
}
#expanded {
  position: absolute;
  top: 0px;
  left: 2px;
}
#expandable {
  position: absolute;
  top: 0px;
  left: 2px;
}
</style>