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
</style>

<template>
  <transition-group name="fade" mode="out-in">
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
      <i @click="$store.dispatch('change', ['location', 'home'])" style="cursor: pointer; position: absolute; left: 10px; top: 13px;" class="fa fa-arrow-left" aria-hidden="true"></i>
      <h1 style="color: red">There was an error retrieving data!</h2>
    </holder>
    <holder v-else-if="!error && !loading" style="position: relative;" title="General Information" key="general">
      <transition name="fade" mode="out-in">
        <i v-if="!isToggled('general')" class="fa fa-window-maximize" aria-hidden="true" style="position: absolute; top: 5px; left: 5px;" @click="toggle('general')"></i>
        <i v-else-if="isToggled('general')" class="fa fa-window-minimize" aria-hidden="true" style="position: absolute; top: 5px; left: 5px;" @click="toggle('general')"></i>
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
    <holder v-else-if="!error && !loading" style="position: relative;" title="Roster" key="roster">
      <transition name="fade" mode="out-in">
        <i v-if="!isToggled('roster')" class="fa fa-window-maximize" aria-hidden="true" style="position: absolute; top: 5px; left: 5px;" @click="toggle('roster')"></i>
        <i v-else-if="isToggled('roster')" class="fa fa-window-minimize" aria-hidden="true" style="position: absolute; top: 5px; left: 5px;" @click="toggle('roster')"></i>
      </transition>
      <transition name="fade" mode="out-in">
        <table v-if="guild.members !== undefined && isToggled('roster')" class="table">
          <tr>
            <th style="cursor: pointer;" @click="sortBy('cName')">Character Name</th>
            <th style="cursor: pointer;" @click="sortBy('cClass')">Character Class</th>
            <th style="cursor: pointer;" @click="sortBy('cRace')">Character Race</th>
            <th style="cursor: pointer;" @click="sortBy('cLevel')">Level</th>
            <th style="cursor: pointer;" @click="sortBy('cAchievementPoints')">Achievement Points</th>
            <th style="cursor: pointer;" @click="sortBy('cGuildRank')">Guild Rank</th>
            <th style="cursor: pointer;" @click="sortBy('cBattlegroup')">Battlegroup</th>
          </tr>
          <tr v-for="member in sortedDB">
            <td :style="{color: getClassColor(member.character.class)}">{{member.character.name}}</td>
            <td :style="{color: getClassColor(member.character.class)}">{{getClassName(member.character.class)}}</td>
            <td :style="{color: getRaceColor(member.character.race)}">{{getRaceName(member.character.race)}}</td>
            <td>{{member.character.level}}</td>
            <td>{{member.character.achievementPoints}}</td>
            <td>{{getGuildRank(member.rank)}}</td>
            <td>{{member.character.battlegroup}}</td>
          </tr>
        </table>
      </transition>
    </holder>
  </transition-group>
</template>

<script>
import Holder from '../Holder/Holder'
import $util from '../../util.js'
export default {
  components: {
    Holder
  },
  name: 'info',
  data () {
    return {
      guild: {},
      error: false,
      show: false,
      loading: false,
      toggled: {'general': true, 'roster': false},
      sort: 'rank',
      sortInverse: false
    }
  },
  created () {
    this.load()
  },
  computed: {
    sortedDB () {
      if (this.guild.members !== undefined) {
        return this.sortArr(this.guild.members)
      }
      return null
    }
  },
  methods: {
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
    load () {
      this.loading = true
      let fields = 'members'
      let http = 'https://eu.api.battle.net/wow/guild/Ravencrest/Hiatus?fields=' + fields + '&locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
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