<template>
<div class="nav">
  <div class="bottomborder">
    <img id="sanctity_icon" src="../../assets/sanctity_icon.png">
    <div class="navheader">
      <ul>
        <li :class="{active: !isForum()}" @click="moveTo('sanctity')">Sanctity</li>
        <li class="header">|</li>
        <li :class="{active: isForum()}" @click="moveTo('forum')">Forum</li>
      </ul>
    </div>
    <transition name="fade" mode="out-in">
    <div class="navbar">
        <ul :key="page" v-if="!isForum()">
          <li :class="{active: isActive('home')}" @click="moveTo('home')">Home</li>
          <li :class="{active: isActive('about')}" @click="moveTo('about')">About</li>
          <li :class="{active: isActive('apply')}" @click="moveTo('apply')">Apply</li>
          <li :class="{active: isActive('roster')}" @click="moveTo('roster')">Roster</li>
          <li :class="{active: isActive('timeline')}" @click="moveTo('timeline')">Timeline</li>
        </ul>
    </div>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      validLocations: this.$store.getters.page.validLocations
    }
  },
  computed: {
    page () {
      return this.$store.getters.page.page
    },
    location () {
      return this.$store.getters.page.location
    }
  },
  methods: {
    moveTo (location) {
      if (location === 'forum' && this.page !== 'forum') {
        this.$store.dispatch('change', ['page', 'forum'])
      } else if (location === 'sanctity' && this.page !== 'home') {
        this.$store.dispatch('change', ['page', 'home'])
      } else {
        if (this.page !== 'home') {
          this.$store.dispatch('change', ['page', 'home'])
        }
        if (this.location !== location) {
          if (this.isValidLocation(location)) {
            this.$store.dispatch('change', ['location', location])
            window.scrollTo(0, 0)
          } else {
            console.log('invalid location for navbar moveTo() : ' + location)
          }
        }
      }
    },
    isValidLocation (location) {
      return this.validLocations.includes(location)
    },
    isActive (location) {
      return this.location === location
    },
    isForum () {
      return this.page === 'forum'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  z-index: 99999;
  font-size: large;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #2D2D2D;
  width: 100%;
  height: 75px;
}
.bottomborder {
  width: 100%;
  border-bottom: 1px solid #C1C1C1;
  position: fixed;
  top: 75px;
}
.navheader {
  position: fixed;
  top: 10px;
  left: 0px;

}
.navbar {
  position: fixed;
  top: 10px;
  right: 0px;
}
ul {
  list-style-type: none;
}
li {
  margin-left: 5px;
  margin-right: 5px;
  display: block;
  float: left;
  color: #bc9536;
  border-bottom: 0px solid #aaa;
}
li:hover:not(.header) {
  cursor: pointer;
}
.header {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
   -khtml-user-select: none; /* Konqueror */
     -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                not supported by any browser */
}
.header:hover {
  cursor: default;
}
li:hover:not(.active):not(.header) {
  border-bottom: 1px solid #555555;
  transition: border-bottom 1s;
}
.active {
  border-bottom: 1px solid #061a26;
  transition: border-bottom 1s;
}

#sanctity_icon {
  position: fixed;
  top: 10px;
  margin: 0px -62.5px;
  -webkit-animation-name: spin;
  -webkit-animation-duration: 8000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 8000ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 8000ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
  
  animation-name: spin;
  animation-duration: 8000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@-ms-keyframes spin {
    from { -ms-transform: rotate(0deg); }
    to { -ms-transform: rotate(360deg); }
}
@-moz-keyframes spin {
    from { -moz-transform: rotate(0deg); }
    to { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>
