<template>
<div>
  <board v-for="board in boards" :id="board.id":title="board.title" :subtitle="board.subtitle" :planks="board.planks"></board>
</div>
</template>
<script>
import Board from './Board'
export default{
  components: {
    Board
  },
  name: 'forum',
  data () {
    return {
      boards: this.$store.getters.forum.boards
    }
  }
}
</script>
<style>
	
</style>