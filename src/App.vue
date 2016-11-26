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
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

#app {
  font-family: 'Farsan', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 150px;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-button {
  width: 100px;
  height: 100px;
}
::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ff8000;
  border-radius: 1px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ff8000;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 0px;
}
::-webkit-scrollbar-track:hover {
  background: #5d5d5d;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
