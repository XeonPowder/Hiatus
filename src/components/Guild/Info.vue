<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
table, th, td {
  margin: auto;
  border-collapse: collapse;
  padding: 5px 5px;
}
.loader {
  position: relative;
  top: 15px;
  width: 44px;
  height: 8px;
  margin: 12px auto;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #ccc;
  position: absolute;
}

.dot_1 {
  animation: animateDot1 1.5s linear infinite;
  left: 12px;
  background: #E2B630;
}

.dot_2 {
  animation: animateDot2 1.5s linear infinite;
  animation-delay: 0.5s;
  left: 24px;
  background: #3084E2;
}

.dot_3 {
  animation: animateDot3 1.5s linear infinite;
  left: 12px;
  background: #E2B630;
}

.dot_4 {
  animation: animateDot4 1.5s linear infinite;
  animation-delay: 0.5s;
  left: 24px;
  background: #3084E2;
}

@keyframes animateDot1 {
  0% {
    transform: rotate(0deg) translateX(-12px);
  }
  25% {
    transform: rotate(180deg) translateX(-12px);
  }
  75% {
    transform: rotate(180deg) translateX(-12px);
  }
  100% {
    transform: rotate(360deg) translateX(-12px);
  }
}
@keyframes animateDot2 {
  0% {
    transform: rotate(0deg) translateX(-12px);
  }
  25% {
    transform: rotate(-180deg) translateX(-12px);
  }
  75% {
    transform: rotate(-180deg) translateX(-12px);
  }
  100% {
    transform: rotate(-360deg) translateX(-12px);
  }
}
@keyframes animateDot3 {
  0% {
    transform: rotate(0deg) translateX(12px);
  }
  25% {
    transform: rotate(180deg) translateX(12px);
  }
  75% {
    transform: rotate(180deg) translateX(12px);
  }
  100% {
    transform: rotate(360deg) translateX(12px);
  }
}
@keyframes animateDot4 {
  0% {
    transform: rotate(0deg) translateX(12px);
  }
  25% {
    transform: rotate(-180deg) translateX(12px);
  }
  75% {
    transform: rotate(-180deg) translateX(12px);
  }
  100% {
    transform: rotate(-360deg) translateX(12px);
  }
}
input {
  font-size: large;
  font-family: 'Farsan';
  background-color: #E6E6E6;
}
input[type=text], input[type=number] {
  text-align: center;
  border: none;
  width: 100%;
  padding: 5px 5px;
  margin: 8px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ff8000;
}
input[type=text]:focus, input[type=number]:focus, select:focus {
  outline: none;
  border-bottom: 2px solid #ff8000;
}
.v_form_submit {
  width: 25%;
  background-color: #ff9000;
  border: none;
  color: black;
  padding: 8px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  font-family: 'Farsan';
  font-size: large;
}
.v_form_submit:focus {
  outline: 1px solid #000000;
}
.v_form_submit:active {
  outline: 1px solid #0f0f0f;
}
#characterRosterItem:hover {
 background-color: #2E2E2E !important;
 cursor: pointer;
}
</style>

<template>
  <transition-group name="fade" mode="out-in">
    <holder style="position: relative;" key="input" v-if="customLookup">
      <i title="Close" @click="customLookup = !customLookup" style="cursor: pointer; position: absolute; left: 5px; top: 5px;" class="fa fa-window-close-o" aria-hidden="true"></i>
      <table class="table">
        <tr>
          <th>Guild</th>
          <th>Realm</th>
        </tr>
        <tr>
          <td><input @keyup.enter="load" v-model="lookup.name" type="text"></input></td>
          <td><input @keyup.enter="load" v-model="lookup.realm" type="text"></input></td>
        </tr>
      </table>
      <transition name="fade" mode="out-in">
        <div v-if="!defaultLookupData">
          <button @click="reset" class="v_form_submit">Reset</button>
          <button @click="load" class="v_form_submit">Search</button>
        </div>
      </transition>
    </holder>
    <holder v-if="loading" key="loading" style="height: 38px; width: 100px">
      <transition name="fade" mode="out-in">
        <div class="loader">
          <span class="dot dot_1"></span>
          <span class="dot dot_2"></span>
          <span class="dot dot_3"></span>
          <span class="dot dot_4"></span>
        </div>
      </transition>
    </holder>
    <holder style="position: relative;" v-else-if="error" key="error">
      <transition name="fade" mode="out-in">
        <i title="Custom Guild Lookup" v-if="!customLookup" @click="customLookup = !customLookup" style="cursor: pointer; position: absolute; left: 30px; top: 15px;" class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </transition>
      <i title="Home" @click="$store.dispatch('change', ['location', 'home'])" style="cursor: pointer; position: absolute; left: 10px; top: 13px;" class="fa fa-arrow-left" aria-hidden="true"></i>
      <h1 style="color: red">There was an error retrieving data!</h2>
    </holder>
    <div v-else-if="!error && !loading" key="data">
      <holder v-if="about" style="position: relative;" title="General Information" key="general">
        <transition name="fade" mode="out-in">
          <i title="Custom Guild Lookup" v-if="!customLookup" @click="customLookup = !customLookup" style="cursor: pointer; position: absolute; left: 30px; top: 6px;" class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </transition>
        <transition name="fade" mode="out-in">
          <i title="Maximize" key="maximize" v-if="!isToggled('general')" class="fa fa-window-maximize" aria-hidden="true" style="cursor: pointer; position: absolute; top: 5px; left: 5px;" @click="toggle('general')"></i>
          <i title="Minimize" key="minimize" v-else-if="isToggled('general')" class="fa fa-window-minimize" aria-hidden="true" style="cursor: pointer; position: absolute; top: 5px; left: 5px;" @click="toggle('general')"></i>
        </transition>
        <transition name="fade" mode="out-in">
          <div v-if="isToggled('general')">
            <span v-if="guild.name !== undefined && guild.realm !== undefined">
              <h3>Guild:</h3>
                <h2>{{guild.name}} - {{guild.realm}}</h2>
            </span>
            <span v-if="guild.level !== undefined">
              <h3>Level:</h3>
                <h2>{{guild.level}}</h2>
            </span>
            <span v-if="guild.achievementPoints !== undefined">
              <h3>Achievement Points</h3>
                <h2>{{guild.achievementPoints}}</h2>
            </span>
          </div>
        </transition>
      </holder>
      <holder v-if="roster" style="position: relative;" title="Roster" key="roster">
        <transition name="fade" mode="out-in">
          <i title="Custom Guild Lookup" v-if="!customLookup" @click="customLookup = !customLookup" style="cursor: pointer; position: absolute; left: 30px; top: 6px;" class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </transition>
        <transition name="fade" mode="out-in">
          <i title="Maximize" key="maximize2" v-if="!isToggled('roster')" class="fa fa-window-maximize" aria-hidden="true" style="cursor: pointer; position: absolute; top: 5px; left: 5px;" @click="toggle('roster')"></i>
          <i title="Minimize" key="minimize2" v-else-if="isToggled('roster')" class="fa fa-window-minimize" aria-hidden="true" style="cursor: pointer; position: absolute; top: 5px; left: 5px;" @click="toggle('roster')"></i>
        </transition>
        <transition name="fade" mode="out-in">
          <div v-if="isToggled('roster')">
            <table style="border: 1px solid #000;" class="table">
              <tr style="border-bottom: 1px solid #000;">
                <th style="width: 14.2857142857%; border-right: 1px solid #000; cursor: pointer;" @click="sortBy('cName')">Character Name</th>
                <th style="width: 14.2857142857%; border-right: 1px solid #000; cursor: pointer;" @click="sortBy('cClass')">Character Class</th>
                <th style="width: 14.2857142857%; border-right: 1px solid #000; cursor: pointer;" @click="sortBy('cRace')">Character Race</th>
                <th style="width: 14.2857142857%; border-right: 1px solid #000; cursor: pointer;" @click="sortBy('cLevel')">Level</th>
                <th style="width: 14.2857142857%; border-right: 1px solid #000; cursor: pointer;" @click="sortBy('cAchievementPoints')">Achievement Points</th>
                <th style="width: 14.2857142857%; border-right: 1px solid #000; cursor: pointer;" @click="sortBy('cGuildRank')">Guild Rank</th>
                <th style="width: 14.2857142857%; cursor: pointer;" @click="sortBy('cBattlegroup')">Battlegroup</th>
              </tr>
              <tr v-for="member in sortedDB" id="characterRosterItem" style="background-color: #232323; color: #B1B1B1; border-bottom: 1px solid #000;"  @click="openArmoryWindow(member.character.realm, member.character.name)" :title="member.character.name + ' - ' + member.character.realm + ' -> Armory'">
                <td :style="{color: getClassColor(member.character.class)}">{{member.character.name}}</td>
                <td :style="{color: getClassColor(member.character.class)}">{{getClassName(member.character.class)}}</td>
                <td :style="{color: getRaceColor(member.character.race)}">{{getRaceName(member.character.race)}}</td>
                <td style="">{{member.character.level}}</td>
                <td>{{member.character.achievementPoints}}</td>
                <td>{{getGuildRank(member.rank)}}</td>
                <td>{{member.character.battlegroup}}</td>
              </tr>
            </table>
            <br>
          </div>
        </transition>
      </holder>
    </div>
  </transition-group>
</template>

<script>
import Holder from '../Holder/Holder'
import $util from '../../util.js'
export default {
  props: ['about', 'roster'],
  components: {
    Holder
  },
  name: 'info',
  data () {
    return {
      customLookup: false,
      lookup: {realm: 'Ravencrest', name: 'Hiatus'},
      guild: {},
      error: false,
      show: false,
      loading: false,
      toggled: {'general': true, 'roster': true},
      sort: 'rank',
      sortInverse: false
    }
  },
  created () {
    this.load()
  },
  computed: {
    sortedDB () {
      return this.sortArr(this.guild.members)
    },
    defaultLookupData () {
      return this.lookup.realm === 'Ravencrest' && this.lookup.name === 'Hiatus'
    }
  },
  methods: {
    openArmoryWindow (realm, name) {
      window.open('https://eu.battle.net/wow/en/character/' + realm + '/' + name + '/advanced')
    },
    sortArr (arr) {
      let temp = arr
      let this2 = this
      switch (this.sort) {
        case 'cName':
          temp.sort(function (a, b) {
            return this2.sortByString(a.character.name, b.character.name, this2.sortInverse)
          })
          return temp
        case 'cClass':
          temp.sort(function (a, b) {
            return this2.sortByString(this2.getClassName(a.character.class), this2.getClassName(b.character.class), this2.sortInverse)
          })
          return temp
        case 'cRace':
          temp.sort(function (a, b) {
            return this2.sortByString(this2.getRaceName(a.character.race), this2.getRaceName(b.character.race), this2.sortInverse)
          })
          return temp
        case 'cLevel':
          temp.sort(function (a, b) {
            return this2.sortByNumber(a.character.level, b.character.level, this2.sortInverse)
          })
          return temp
        case 'cAchievementPoints':
          temp.sort(function (a, b) {
            return this2.sortByNumber(a.character.achievementPoints, b.character.achievementPoints, this2.sortInverse)
          })
          return temp
        case 'cGuildRank':
          temp.sort(function (a, b) {
            return this2.sortByString(this2.getGuildRank(a.rank), this2.getGuildRank(b.rank), !this2.sortInverse)
          })
          return temp
        case 'cBattlegroup':
          temp.sort(function (a, b) {
            return this2.sortByString(a.character.battlegroup, b.character.battlegroup, this2.sortInverse)
          })
          return temp
        default:
          return temp
      }
    },
    isToggled (str) {
      if (str !== undefined) {
        return this.toggled[str]
      }
      return false
    },
    sortByString (a, b, inverse) {
      if (!inverse) {
        if (a < b) {
          return -1
        }
        if (a > b) {
          return 1
        }
      } else {
        if (a < b) {
          return 1
        }
        if (a > b) {
          return -1
        }
      }
      return 0
    },
    sortByNumber (a, b, inverse) {
      if (!inverse) {
        return a - b
      } else {
        return b - a
      }
    },
    sortBy (str) {
      if (str === 'cName' || str === 'cClass' || str === 'cRace' || str === 'cLevel' || str === 'cAchievementPoints' || str === 'cGuildRank' || str === 'cBattlegroup') {
        if (this.sort === str) {
          this.sortInverse = !this.sortInverse
        } else {
          this.sortInverse = false
          this.sort = str
        }
      } else {
        console.warn('invalid sortBy')
      }
    },
    getClassColor (cName) {
      return $util.resource.classColor(cName)
    },
    getClassName (cName) {
      return $util.resource.className(cName)
    },
    getRaceName (cRace) {
      return $util.resource.raceName(cRace)
    },
    getRaceColor (cRace) {
      return $util.resource.raceColor(cRace)
    },
    getGuildRank (gRank) {
      return $util.resource.guildRank(gRank)
    },
    toggle (str) {
      if (str === 'general' || str === 'roster') {
        this.toggled[str] = !this.toggled[str]
      } else {
        console.warn('invalid toggle')
      }
    },
    reset () {
      this.lookup.realm = 'Ravencrest'
      this.lookup.name = 'Hiatus'
      this.load()
    },
    load () {
      if (this.guild.name === this.lookup.name && this.guild.realm === this.lookup.realm) {
        return
      }
      this.loading = true
      this.guild = {}
      let fields = 'members'
      let http = 'https://eu.api.battle.net/wow/guild/' + this.lookup.realm + '/' + this.lookup.name + '?fields=' + fields + '&locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
      this.$http.get(http).then((response) => {
        this.guild.name = response.body.name
        this.guild.realm = response.body.realm
        this.guild.level = response.body.level
        this.guild.achievementPoints = response.body.achievementPoints
        this.guild.members = response.body.members
        this.error = false
      }, (response) => {
        this.guild = {error: 'no character found.'}
        this.error = true
      }).then(() => {
        this.loading = false
      })
    }
  }
}
</script>