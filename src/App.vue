<template>
  <transition name="fade" mode="out-in">
    <div v-if="ready" id="app">
      <navbar title="Hiatus"></navbar>
      <transition name="fade" mode="out-in">
        <home v-if="page === 'home'"></home>
        <forum v-else-if="page === 'forum'"></forum>
      </transition>
    </div>
  </transition>
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
  destroy () {
    this.imageInterval = null
  },
  mounted () {
    this.ready = true
    this.imageInterval = setInterval(this.changeBackground, 60000)
  },
  data () {
    return {
      imageInterval: null,
      images: ['http://warcraft.blizzplanet.com/wp-content/uploads/2015/08/legion-box-cover-keyart.jpg', 'http://www.hdwallpaper.nu/wp-content/uploads/2016/02/World_Warcraft_Legion_wallpaper_5.png', 'http://thegarethwoods.com/site/wp-content/uploads/2016/09/eyes.png'],
      imageIndex: 0,
      ready: false
    }
  },
  methods: {
    changeBackground () {
      this.imageIndex++
      if (this.imageIndex > 2) {
        this.imageIndex = 0
      }
      let this2 = this
      document.body.style['background-image'] = this2.imageUrl
    }
  },
  computed: {
    imageUrl () {
      return "url('" + this.images[this.imageIndex] + "')"
    },
    page () {
      return this.$store.getters.page.page
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Farsan');
body {
  background-image: url('http://warcraft.blizzplanet.com/wp-content/uploads/2015/08/legion-box-cover-keyart.jpg');
  background-repeat: none;
  background-attachment: fixed;
  background-color: #222222;
  transition: background-image .5s ease-in-out;
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
  background: #ff8000;
  border: 0px none #ff8000;
  border-radius: 1px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ff8000;
}
::-webkit-scrollbar-thumb:active {
  background: #ff8000;
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
