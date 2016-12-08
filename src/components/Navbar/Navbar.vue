<template>
<transition name="fade" mode="out-in">
  <div v-if="!hideNavBar" class="nav">
    <div class="bottomborder">
      <!-- <img id="sanctity_icon" src="../../assets/sanctity_icon.png"> -->
      <div class="navheader">
        <ul>
          <li :class="{active: !isForum()}" @click="moveTo('sanctity')">{{title}}</li>
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
</transition>
</template>

<script>
export default {
  props: ['title'],
  name: 'navbar',
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      ypos: 0,
      hideNavBar: false,
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
    handleScroll () {
      if (window.pageYOffset > this.ypos) {
        if (!this.hideNavBar) {
          this.hideNavBar = true
        }
      } else {
        if (this.hideNavBar) {
          this.hideNavBar = false
        }
      }
      if (this.ypos !== window.pageYOffset) {
        this.ypos = window.pageYOffset
      }
    },
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
  -webkit-box-shadow: -2px 1px 7px 16px rgba(0,0,0,.2);
  -moz-box-shadow: -2px 1px 7px 16px rgba(0,0,0,.2);
  box-shadow: -2px 1px 7px 16px rgba(0,0,0,.2);
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
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
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
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
}
.header:hover {
  cursor: default;
}
li:hover:not(.active):not(.header) {
  border-bottom: 1px solid #555555;
  transition: border-bottom 1s;
}
.active {
  border-bottom: 1px solid #ff8000;
  transition: border-bottom 1s;
}

#sanctity_icon {
  position: fixed;
  top: 10px;
  margin: 0px -62.5px;
  -webkit-transition: -webkit-transform 16s ease-in-out;
  -moz-transition:    -moz-transform 16s ease-in-out;
  -ms-transition:     -ms-transform 16s ease-in-out;
  -o-transition:      -o-transform 16s ease-in-out;
  transition:         transform 16s ease-in-out;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */

}
#sanctity_icon:hover {
  -webkit-transform: rotate(2880deg);
  -moz-transform:    rotate(2880deg);
  -ms-transform:     rotate(2880deg);
  -o-transform:      rotate(2880deg);
  transform:         rotate(2880deg);
}
</style>
