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
          <li class="header">|</li>
          <span>
            <li class="rainbow" @mouseout="showLink = false" @mouseover="showLink = true" @click="openDiscord()">
              <span class="text">Discord</span>
            </li>
            
          </span>
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
import $ from 'jquery'
export default {
  props: ['title'],
  name: 'navbar',
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    $('.text').html((i, html) => {
      let chars = $.trim(html).split('')
      return '<span>' + chars.join('</span><span>') + '</span>'
    })
  },
  destroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      showLink: false,
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
    openDiscord () {
      window.open('https://discord.gg/bpNz6BP')
    },
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
.rainbow,
.rainbow-hover:hover {
    /*
   * Elements settings
   */
}

.rainbow span,
.rainbow-hover:hover span {
    -webkit-animation-name: rainbow-keys;
    animation-name: rainbow-keys;
    -webkit-animation-duration: 50s;
    animation-duration: 50s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes rainbow-keys {
    0% {
        color: #d65c97;
    }
    5% {
        color: #5cd666;
    }
    10% {
        color: #a55cd6;
    }
    15.0% {
        color: #5c7cd6;
    }
    20% {
        color: #d65c7a;
    }
    25% {
        color: #81d65c;
    }
    30.0% {
        color: #835cd6;
    }
    35% {
        color: #685cd6;
    }
    40% {
        color: #5c9dd6;
    }
    45% {
        color: #5cd670;
    }
    50% {
        color: #d6625c;
    }
    55.0% {
        color: #d6835c;
    }
    60.0% {
        color: #d6605c;
    }
    65% {
        color: #be5cd6;
    }
    70% {
        color: #5c8dd6;
    }
    75% {
        color: #95d65c;
    }
    80% {
        color: #d69d5c;
    }
    85.0% {
        color: #d65c81;
    }
    90% {
        color: #5cd666;
    }
    95% {
        color: #d67e5c;
    }
    100% {
        color: #64d65c;
    }
}

@keyframes rainbow-keys {
    0% {
        color: #d65c97;
    }
    5% {
        color: #5cd666;
    }
    10% {
        color: #a55cd6;
    }
    15.0% {
        color: #5c7cd6;
    }
    20% {
        color: #d65c7a;
    }
    25% {
        color: #81d65c;
    }
    30.0% {
        color: #835cd6;
    }
    35% {
        color: #685cd6;
    }
    40% {
        color: #5c9dd6;
    }
    45% {
        color: #5cd670;
    }
    50% {
        color: #d6625c;
    }
    55.0% {
        color: #d6835c;
    }
    60.0% {
        color: #d6605c;
    }
    65% {
        color: #be5cd6;
    }
    70% {
        color: #5c8dd6;
    }
    75% {
        color: #95d65c;
    }
    80% {
        color: #d69d5c;
    }
    85.0% {
        color: #d65c81;
    }
    90% {
        color: #5cd666;
    }
    95% {
        color: #d67e5c;
    }
    100% {
        color: #64d65c;
    }
}

.rainbow span:nth-of-type(1),
.rainbow-hover:hover span:nth-of-type(1) {
    -webkit-animation-delay: -19.8s;
    animation-delay: -19.8s;
}

.rainbow span:nth-of-type(2),
.rainbow-hover:hover span:nth-of-type(2) {
    -webkit-animation-delay: -19.6s;
    animation-delay: -19.6s;
}

.rainbow span:nth-of-type(3),
.rainbow-hover:hover span:nth-of-type(3) {
    -webkit-animation-delay: -19.4s;
    animation-delay: -19.4s;
}

.rainbow span:nth-of-type(4),
.rainbow-hover:hover span:nth-of-type(4) {
    -webkit-animation-delay: -19.2s;
    animation-delay: -19.2s;
}

.rainbow span:nth-of-type(5),
.rainbow-hover:hover span:nth-of-type(5) {
    -webkit-animation-delay: -19s;
    animation-delay: -19s;
}

.rainbow span:nth-of-type(6),
.rainbow-hover:hover span:nth-of-type(6) {
    -webkit-animation-delay: -18.8s;
    animation-delay: -18.8s;
}

.rainbow span:nth-of-type(7),
.rainbow-hover:hover span:nth-of-type(7) {
    -webkit-animation-delay: -18.6s;
    animation-delay: -18.6s;
}

.rainbow span:nth-of-type(8),
.rainbow-hover:hover span:nth-of-type(8) {
    -webkit-animation-delay: -18.4s;
    animation-delay: -18.4s;
}

.rainbow span:nth-of-type(9),
.rainbow-hover:hover span:nth-of-type(9) {
    -webkit-animation-delay: -18.2s;
    animation-delay: -18.2s;
}

.rainbow span:nth-of-type(10),
.rainbow-hover:hover span:nth-of-type(10) {
    -webkit-animation-delay: -18s;
    animation-delay: -18s;
}

.rainbow span:nth-of-type(11),
.rainbow-hover:hover span:nth-of-type(11) {
    -webkit-animation-delay: -17.8s;
    animation-delay: -17.8s;
}

.rainbow span:nth-of-type(12),
.rainbow-hover:hover span:nth-of-type(12) {
    -webkit-animation-delay: -17.6s;
    animation-delay: -17.6s;
}

.rainbow span:nth-of-type(13),
.rainbow-hover:hover span:nth-of-type(13) {
    -webkit-animation-delay: -17.4s;
    animation-delay: -17.4s;
}

.rainbow span:nth-of-type(14),
.rainbow-hover:hover span:nth-of-type(14) {
    -webkit-animation-delay: -17.2s;
    animation-delay: -17.2s;
}

.rainbow span:nth-of-type(15),
.rainbow-hover:hover span:nth-of-type(15) {
    -webkit-animation-delay: -17s;
    animation-delay: -17s;
}

.rainbow span:nth-of-type(16),
.rainbow-hover:hover span:nth-of-type(16) {
    -webkit-animation-delay: -16.8s;
    animation-delay: -16.8s;
}

.rainbow span:nth-of-type(17),
.rainbow-hover:hover span:nth-of-type(17) {
    -webkit-animation-delay: -16.6s;
    animation-delay: -16.6s;
}

.rainbow span:nth-of-type(18),
.rainbow-hover:hover span:nth-of-type(18) {
    -webkit-animation-delay: -16.4s;
    animation-delay: -16.4s;
}

.rainbow span:nth-of-type(19),
.rainbow-hover:hover span:nth-of-type(19) {
    -webkit-animation-delay: -16.2s;
    animation-delay: -16.2s;
}

.rainbow span:nth-of-type(20),
.rainbow-hover:hover span:nth-of-type(20) {
    -webkit-animation-delay: -16s;
    animation-delay: -16s;
}

.rainbow span:nth-of-type(21),
.rainbow-hover:hover span:nth-of-type(21) {
    -webkit-animation-delay: -15.8s;
    animation-delay: -15.8s;
}

.rainbow span:nth-of-type(22),
.rainbow-hover:hover span:nth-of-type(22) {
    -webkit-animation-delay: -15.6s;
    animation-delay: -15.6s;
}

.rainbow span:nth-of-type(23),
.rainbow-hover:hover span:nth-of-type(23) {
    -webkit-animation-delay: -15.4s;
    animation-delay: -15.4s;
}

.rainbow span:nth-of-type(24),
.rainbow-hover:hover span:nth-of-type(24) {
    -webkit-animation-delay: -15.2s;
    animation-delay: -15.2s;
}

.rainbow span:nth-of-type(25),
.rainbow-hover:hover span:nth-of-type(25) {
    -webkit-animation-delay: -15s;
    animation-delay: -15s;
}

.rainbow span:nth-of-type(26),
.rainbow-hover:hover span:nth-of-type(26) {
    -webkit-animation-delay: -14.8s;
    animation-delay: -14.8s;
}

.rainbow span:nth-of-type(27),
.rainbow-hover:hover span:nth-of-type(27) {
    -webkit-animation-delay: -14.6s;
    animation-delay: -14.6s;
}

.rainbow span:nth-of-type(28),
.rainbow-hover:hover span:nth-of-type(28) {
    -webkit-animation-delay: -14.4s;
    animation-delay: -14.4s;
}

.rainbow span:nth-of-type(29),
.rainbow-hover:hover span:nth-of-type(29) {
    -webkit-animation-delay: -14.2s;
    animation-delay: -14.2s;
}

.rainbow span:nth-of-type(30),
.rainbow-hover:hover span:nth-of-type(30) {
    -webkit-animation-delay: -14s;
    animation-delay: -14s;
}

.rainbow span:nth-of-type(31),
.rainbow-hover:hover span:nth-of-type(31) {
    -webkit-animation-delay: -13.8s;
    animation-delay: -13.8s;
}

.rainbow span:nth-of-type(32),
.rainbow-hover:hover span:nth-of-type(32) {
    -webkit-animation-delay: -13.6s;
    animation-delay: -13.6s;
}

.rainbow span:nth-of-type(33),
.rainbow-hover:hover span:nth-of-type(33) {
    -webkit-animation-delay: -13.4s;
    animation-delay: -13.4s;
}

.rainbow span:nth-of-type(34),
.rainbow-hover:hover span:nth-of-type(34) {
    -webkit-animation-delay: -13.2s;
    animation-delay: -13.2s;
}

.rainbow span:nth-of-type(35),
.rainbow-hover:hover span:nth-of-type(35) {
    -webkit-animation-delay: -13s;
    animation-delay: -13s;
}

.rainbow span:nth-of-type(36),
.rainbow-hover:hover span:nth-of-type(36) {
    -webkit-animation-delay: -12.8s;
    animation-delay: -12.8s;
}

.rainbow span:nth-of-type(37),
.rainbow-hover:hover span:nth-of-type(37) {
    -webkit-animation-delay: -12.6s;
    animation-delay: -12.6s;
}

.rainbow span:nth-of-type(38),
.rainbow-hover:hover span:nth-of-type(38) {
    -webkit-animation-delay: -12.4s;
    animation-delay: -12.4s;
}

.rainbow span:nth-of-type(39),
.rainbow-hover:hover span:nth-of-type(39) {
    -webkit-animation-delay: -12.2s;
    animation-delay: -12.2s;
}

.rainbow span:nth-of-type(40),
.rainbow-hover:hover span:nth-of-type(40) {
    -webkit-animation-delay: -12s;
    animation-delay: -12s;
}

.rainbow span:nth-of-type(41),
.rainbow-hover:hover span:nth-of-type(41) {
    -webkit-animation-delay: -11.8s;
    animation-delay: -11.8s;
}

.rainbow span:nth-of-type(42),
.rainbow-hover:hover span:nth-of-type(42) {
    -webkit-animation-delay: -11.6s;
    animation-delay: -11.6s;
}

.rainbow span:nth-of-type(43),
.rainbow-hover:hover span:nth-of-type(43) {
    -webkit-animation-delay: -11.4s;
    animation-delay: -11.4s;
}

.rainbow span:nth-of-type(44),
.rainbow-hover:hover span:nth-of-type(44) {
    -webkit-animation-delay: -11.2s;
    animation-delay: -11.2s;
}

.rainbow span:nth-of-type(45),
.rainbow-hover:hover span:nth-of-type(45) {
    -webkit-animation-delay: -11s;
    animation-delay: -11s;
}

.rainbow span:nth-of-type(46),
.rainbow-hover:hover span:nth-of-type(46) {
    -webkit-animation-delay: -10.8s;
    animation-delay: -10.8s;
}

.rainbow span:nth-of-type(47),
.rainbow-hover:hover span:nth-of-type(47) {
    -webkit-animation-delay: -10.6s;
    animation-delay: -10.6s;
}

.rainbow span:nth-of-type(48),
.rainbow-hover:hover span:nth-of-type(48) {
    -webkit-animation-delay: -10.4s;
    animation-delay: -10.4s;
}

.rainbow span:nth-of-type(49),
.rainbow-hover:hover span:nth-of-type(49) {
    -webkit-animation-delay: -10.2s;
    animation-delay: -10.2s;
}

.rainbow span:nth-of-type(50),
.rainbow-hover:hover span:nth-of-type(50) {
    -webkit-animation-delay: -10s;
    animation-delay: -10s;
}

.rainbow span:nth-of-type(51),
.rainbow-hover:hover span:nth-of-type(51) {
    -webkit-animation-delay: -9.8s;
    animation-delay: -9.8s;
}

.rainbow span:nth-of-type(52),
.rainbow-hover:hover span:nth-of-type(52) {
    -webkit-animation-delay: -9.6s;
    animation-delay: -9.6s;
}

.rainbow span:nth-of-type(53),
.rainbow-hover:hover span:nth-of-type(53) {
    -webkit-animation-delay: -9.4s;
    animation-delay: -9.4s;
}

.rainbow span:nth-of-type(54),
.rainbow-hover:hover span:nth-of-type(54) {
    -webkit-animation-delay: -9.2s;
    animation-delay: -9.2s;
}

.rainbow span:nth-of-type(55),
.rainbow-hover:hover span:nth-of-type(55) {
    -webkit-animation-delay: -9s;
    animation-delay: -9s;
}

.rainbow span:nth-of-type(56),
.rainbow-hover:hover span:nth-of-type(56) {
    -webkit-animation-delay: -8.8s;
    animation-delay: -8.8s;
}

.rainbow span:nth-of-type(57),
.rainbow-hover:hover span:nth-of-type(57) {
    -webkit-animation-delay: -8.6s;
    animation-delay: -8.6s;
}

.rainbow span:nth-of-type(58),
.rainbow-hover:hover span:nth-of-type(58) {
    -webkit-animation-delay: -8.4s;
    animation-delay: -8.4s;
}

.rainbow span:nth-of-type(59),
.rainbow-hover:hover span:nth-of-type(59) {
    -webkit-animation-delay: -8.2s;
    animation-delay: -8.2s;
}

.rainbow span:nth-of-type(60),
.rainbow-hover:hover span:nth-of-type(60) {
    -webkit-animation-delay: -8s;
    animation-delay: -8s;
}

.rainbow span:nth-of-type(61),
.rainbow-hover:hover span:nth-of-type(61) {
    -webkit-animation-delay: -7.8s;
    animation-delay: -7.8s;
}

.rainbow span:nth-of-type(62),
.rainbow-hover:hover span:nth-of-type(62) {
    -webkit-animation-delay: -7.6s;
    animation-delay: -7.6s;
}

.rainbow span:nth-of-type(63),
.rainbow-hover:hover span:nth-of-type(63) {
    -webkit-animation-delay: -7.4s;
    animation-delay: -7.4s;
}

.rainbow span:nth-of-type(64),
.rainbow-hover:hover span:nth-of-type(64) {
    -webkit-animation-delay: -7.2s;
    animation-delay: -7.2s;
}

.rainbow span:nth-of-type(65),
.rainbow-hover:hover span:nth-of-type(65) {
    -webkit-animation-delay: -7s;
    animation-delay: -7s;
}

.rainbow span:nth-of-type(66),
.rainbow-hover:hover span:nth-of-type(66) {
    -webkit-animation-delay: -6.8s;
    animation-delay: -6.8s;
}

.rainbow span:nth-of-type(67),
.rainbow-hover:hover span:nth-of-type(67) {
    -webkit-animation-delay: -6.6s;
    animation-delay: -6.6s;
}

.rainbow span:nth-of-type(68),
.rainbow-hover:hover span:nth-of-type(68) {
    -webkit-animation-delay: -6.4s;
    animation-delay: -6.4s;
}

.rainbow span:nth-of-type(69),
.rainbow-hover:hover span:nth-of-type(69) {
    -webkit-animation-delay: -6.2s;
    animation-delay: -6.2s;
}

.rainbow span:nth-of-type(70),
.rainbow-hover:hover span:nth-of-type(70) {
    -webkit-animation-delay: -6s;
    animation-delay: -6s;
}

.rainbow span:nth-of-type(71),
.rainbow-hover:hover span:nth-of-type(71) {
    -webkit-animation-delay: -5.8s;
    animation-delay: -5.8s;
}

.rainbow span:nth-of-type(72),
.rainbow-hover:hover span:nth-of-type(72) {
    -webkit-animation-delay: -5.6s;
    animation-delay: -5.6s;
}

.rainbow span:nth-of-type(73),
.rainbow-hover:hover span:nth-of-type(73) {
    -webkit-animation-delay: -5.4s;
    animation-delay: -5.4s;
}

.rainbow span:nth-of-type(74),
.rainbow-hover:hover span:nth-of-type(74) {
    -webkit-animation-delay: -5.2s;
    animation-delay: -5.2s;
}

.rainbow span:nth-of-type(75),
.rainbow-hover:hover span:nth-of-type(75) {
    -webkit-animation-delay: -5s;
    animation-delay: -5s;
}

.rainbow span:nth-of-type(76),
.rainbow-hover:hover span:nth-of-type(76) {
    -webkit-animation-delay: -4.8s;
    animation-delay: -4.8s;
}

.rainbow span:nth-of-type(77),
.rainbow-hover:hover span:nth-of-type(77) {
    -webkit-animation-delay: -4.6s;
    animation-delay: -4.6s;
}

.rainbow span:nth-of-type(78),
.rainbow-hover:hover span:nth-of-type(78) {
    -webkit-animation-delay: -4.4s;
    animation-delay: -4.4s;
}

.rainbow span:nth-of-type(79),
.rainbow-hover:hover span:nth-of-type(79) {
    -webkit-animation-delay: -4.2s;
    animation-delay: -4.2s;
}

.rainbow span:nth-of-type(80),
.rainbow-hover:hover span:nth-of-type(80) {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
}

.rainbow span:nth-of-type(81),
.rainbow-hover:hover span:nth-of-type(81) {
    -webkit-animation-delay: -3.8s;
    animation-delay: -3.8s;
}

.rainbow span:nth-of-type(82),
.rainbow-hover:hover span:nth-of-type(82) {
    -webkit-animation-delay: -3.6s;
    animation-delay: -3.6s;
}

.rainbow span:nth-of-type(83),
.rainbow-hover:hover span:nth-of-type(83) {
    -webkit-animation-delay: -3.4s;
    animation-delay: -3.4s;
}

.rainbow span:nth-of-type(84),
.rainbow-hover:hover span:nth-of-type(84) {
    -webkit-animation-delay: -3.2s;
    animation-delay: -3.2s;
}

.rainbow span:nth-of-type(85),
.rainbow-hover:hover span:nth-of-type(85) {
    -webkit-animation-delay: -3s;
    animation-delay: -3s;
}

.rainbow span:nth-of-type(86),
.rainbow-hover:hover span:nth-of-type(86) {
    -webkit-animation-delay: -2.8s;
    animation-delay: -2.8s;
}

.rainbow span:nth-of-type(87),
.rainbow-hover:hover span:nth-of-type(87) {
    -webkit-animation-delay: -2.6s;
    animation-delay: -2.6s;
}

.rainbow span:nth-of-type(88),
.rainbow-hover:hover span:nth-of-type(88) {
    -webkit-animation-delay: -2.4s;
    animation-delay: -2.4s;
}

.rainbow span:nth-of-type(89),
.rainbow-hover:hover span:nth-of-type(89) {
    -webkit-animation-delay: -2.2s;
    animation-delay: -2.2s;
}

.rainbow span:nth-of-type(90),
.rainbow-hover:hover span:nth-of-type(90) {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
}

.rainbow span:nth-of-type(91),
.rainbow-hover:hover span:nth-of-type(91) {
    -webkit-animation-delay: -1.8s;
    animation-delay: -1.8s;
}

.rainbow span:nth-of-type(92),
.rainbow-hover:hover span:nth-of-type(92) {
    -webkit-animation-delay: -1.6s;
    animation-delay: -1.6s;
}

.rainbow span:nth-of-type(93),
.rainbow-hover:hover span:nth-of-type(93) {
    -webkit-animation-delay: -1.4s;
    animation-delay: -1.4s;
}

.rainbow span:nth-of-type(94),
.rainbow-hover:hover span:nth-of-type(94) {
    -webkit-animation-delay: -1.2s;
    animation-delay: -1.2s;
}

.rainbow span:nth-of-type(95),
.rainbow-hover:hover span:nth-of-type(95) {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
}

.rainbow span:nth-of-type(96),
.rainbow-hover:hover span:nth-of-type(96) {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

.rainbow span:nth-of-type(97),
.rainbow-hover:hover span:nth-of-type(97) {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
}

.rainbow span:nth-of-type(98),
.rainbow-hover:hover span:nth-of-type(98) {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
}

.rainbow span:nth-of-type(99),
.rainbow-hover:hover span:nth-of-type(99) {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
}

.rainbow span:nth-of-type(100),
.rainbow-hover:hover span:nth-of-type(100) {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
}

</style>
