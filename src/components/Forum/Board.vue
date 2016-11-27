<template>
  <transition name="fade">
    <router-link :to="'/'+title+'-'+id">
      <holder id="board" :title="title" :subtitle="subtitle">
      </holder>
    </router-link>
  </transition>
</template>
<script>
import Holder from '../Holder/Holder'
import Plank from './Plank'
export default{
  props: ['title', 'subtitle', 'planks', 'id'],
  components: {
    Holder,
    Plank
  },
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
  },
  name: 'board'
}
</script>
<style scoped>
a {
  text-decoration: none;
}
#board {
  position: relative;
  width: 50%;
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