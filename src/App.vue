<template>
  <div id="app">
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <home v-if="page === 'home'"></home>
      <forum v-else-if="page === 'forum'"></forum>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Forum from './components/Forum/Forum'
export default {
  name: 'app',
  components: {
    Navbar,
    Forum,
    Home
  },
  computed: {
    page () {
      return this.$store.getters.page.page
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Farsan');

body{
  background-color: #222222;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

#app {
  font-family: 'Farsan', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 150px;
}
</style>
