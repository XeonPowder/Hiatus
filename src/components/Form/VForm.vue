<template>
<div class="v_form">
  <holder>
    <transition name="fade" mode="out-in">
      <div key="notsubmitted" v-if="!submitted">
        <transition name="fade" mode="out-in">
          <div key="invalidName" v-if="!validName">
          <table>
            <tr>
              <th>
                <span class="name">Name:<span style="color: red;">*</span></span>
              </th>
            </tr>
            <tr>
              <td>
                <input :style="nameStyle" @keyup="isValidCharacterName(name)" v-model="name" type="text">
              </td>
            </tr>
          </table>
          </div>
          <div key="validName" v-else-if="validName">
            <table>
              <tr>
                <th><span class="name">Name:<span style="color: red;">*</span></span><br></th>
                <th><span class="name">Main Spec:<span style="color: red;">*</span></span><br></th>
                <th><span class="name">Off Spec:<span style="color: red;">*</span></span><br></th>
              </tr>
              <tr>
                <td><input :style="nameStyle" @keyup="isValidCharacterName(name)" v-model="name" type="text"></td>
                <td><input :style="mainSpecStyle" @keyup="isValidMainSpec()" v-model="mainSpec" type="text"></td>
                <td><input :style="offSpecStyle" @keyup="isValidOffSpec()" v-model="offSpec" type="text"></td>
              </tr>
            </table><br>
            <table>
              <tr>
                <th>
                  <span style="bold;"class="name">Availability (8pm-11pm Server Time):</span>
                </th>
              </tr>
            </table>
            <div id="tuesday" @click="change('tuesday')">Tuesday</div>
            <div id="wednesday" @click="change('wednesday')">Wednesday</div>
            <div id="thursday" @click="change('thursday')">Thursday</div>
            <div id="sunday" @click="change('sunday')">Sunday</div><br><br>
            <table>
              <tr>
                <th>
                  <span style="bold;"class="name">Attend Trail Raids (No Loot):</span>
                </th>
              </tr>
            </table>
            <div key="trail" id="trail" @click="change('trail')">{{trail}}</div>
            <table>
              <tr>
                <th>
                  <span style="bold;"class="name">Send Character Warcraft Logs:</span>
                </th>
              </tr>
            </table>
            <div id="warcraft" @click="change('warcraft')">{{warcraft}}</div><br>
            <div key="useWarcraft" v-if="warcraft === 'Yes'">
              <input style="width: 75%" v-if="!searching && character.warcraftLogsLink !== undefined" type="text" :value="character.warcraftLogsLink">
              <div v-else-if="searching" class="sampleContainer">
                <div class="loader">
                    <span class="dot dot_1"></span>
                    <span class="dot dot_2"></span>
                    <span class="dot dot_3"></span>
                    <span class="dot dot_4"></span>
                </div>
              </div>
              <input style="width: 75%" v-else type="text">
            </div>
            <table>
              <tr>
                <th>
                  <span style="bold;"class="name">Send Additional Information:</span>
                </th>
              </tr>
            </table>
            <div id="additional" @click="change('additional')">{{additional}}</div><br>
            <textarea key="useAdditional" v-if="additional === 'Yes'"></textarea><br>
            <div key="allValid" v-if="validMainSpec && validOffSpec">
              <button  @click="submitForm" class="v_form_submit">Submit</button>
            </div>
          </div>  
        </transition>
      </div>
      <div key="submitted" v-else-if="submitted">
        <h2 id="submitted">Application Sent!</h2>
        <button @click="submitted = false" class="v_form_submit">Return</button>
      </div>
    </transition>
  </holder>
  <transition name="fade">
    <holder key="showcharacter" v-if="show && character !== undefined && character.profile !== undefined" style="margin-top: 20px;">
      <div>
        <h3>
          <span v-if="character.profile.name !== undefined">
            <span :style="{color: getClassColor(character.profile.class)}">{{character.profile.name}}</span>
          </span>
          <span v-if="character.profile.race !== undefined && character.profile.class === undefined">
            [<span :style="{color: getRaceColor(character.profile.race)}"> {{getRaceName(character.profile.race)}} </span>]
          </span>
          <span v-if="character.profile.race !== undefined && character.profile.class !== undefined">
            [<span :style="{color: getRaceColor(character.profile.race)}"> {{getRaceName(character.profile.race)}} </span>/
            <span :style="{color: getClassColor(character.profile.class)}"> {{getClassName(character.profile.class)}} </span>]
          </span>
          <span v-else-if="character.profile.class !== undefined && character.profile.race === undefined">
            [<span :style="{color: getClassColor(character.profile.class)}"> {{getClassName(character.profile.class)}} </span>]
          </span>
          <span v-if="validMainSpec && !validOffSpec">
            [<span style="color: #7A5BEF;"> {{mainSpec}} </span>]
          </span>
          <span v-else-if="validMainSpec && validOffSpec">
            [<span style="color: #7A5BEF;"> {{mainSpec}} </span>/
            <span style="color: #5B8FEF;"> {{offSpec}} </span>]
          </span>
          <span v-else-if="validOffSpec && !validMainSpec">
            [<span style="color: #5B8FEF;"> {{offSpec}} </span>]
          </span>
        </h3>
      </div>
      <div>
        <h3> 
          <span v-if="character.items.averageItemLevel !== undefined && character.items.averageItemLevelEquipped === undefined">
            Avg iLvL: [<span style="color: #30C14B"> {{character.items.averageItemLevel}} </span>]
          </span>
          <span v-if="character.items.averageItemLevel !== undefined && character.items.averageItemLevelEquipped !== undefined">
            iLvL / Equipped: [<span style="color: #30C14B"> {{character.items.averageItemLevel}} </span>/
            <span style="color: #AA9D33"> {{character.items.averageItemLevelEquipped}} </span>]
          </span>
          <span v-if="character.items.averageItemLevel === undefined && character.items.averageItemLevelEquipped !== undefined">
            [<span style="color: #AA9D33"> Avg iLvL Equipped: {{character.items.averageItemLevelEquipped}} </span>]
          </span>
        </h3>
      </div>
      <div v-if="character.progression !== undefined">
        <h3>
          Raid Progression:
        </h3>
        <table>
          <tr>
            <th style="width: 25%; text-align: left; border-top: 1px solid #000; border-bottom: 1px solid #000; border-left: 1px solid #000; border-right: 1px solid #000;">Boss</th>
            <th style="width: 50%; text-align: left; border-top: 1px solid #000; border-bottom: 1px solid #000; border-right: 1px solid #000;">( <span style="color: #28AAB2">Heroic</span> | <span style="color: #D216E3">Mythic</span> )</th>
            <th style="width: 20%; border-top: 1px solid #000; border-bottom: 1px solid #000; border-right: 1px solid #000;">Total</th>
          </tr>
          <tr v-for="boss in character.emeraldNightmare">
            <td style="text-align: left; border-right: 1px solid #000;">{{boss.name}}</td>
            <td style="border-right: 1px solid #000; " v-html="hKillsBar(boss.heroicKills, boss.mythicKills)"></td>
            <td style="">{{boss.heroicKills + boss.mythicKills}}</td>
          </tr>
        </table>
      </div><br>
    </holder>
    <holder key="showerror" v-else-if="error" style="margin-top: 20px;">
      <p style="color: red">Character not found.</p><br>
    </holder>
    <holder key="searching" v-else-if="searching" style="margin-top: 20px;">
      <div style="margin: 0 auto;" class="sampleContainer">
        <div class="loader">
            <span class="dot dot_1"></span>
            <span class="dot dot_2"></span>
            <span class="dot dot_3"></span>
            <span class="dot dot_4"></span>
        </div>
      </div><br>
    </holder>
  </transition>
</div>
</template>

<script>
import $util from '../../util.js'
import Holder from '../Holder/Holder'
export default{
  components: {
    Holder
  },
  data () {
    return {
      character: {},
      name: '',
      validName: false,
      validNameTimeout: null,
      mainSpec: '',
      validMainSpec: false,
      validMainSpecTimeout: null,
      offSpec: '',
      validOffSpec: false,
      validOffSpecTimeout: null,
      submitted: false,
      show: false,
      error: false,
      searching: false,
      additional: 'No',
      warcraft: 'No',
      trail: 'No'
    }
  },
  name: 'v-form',
  computed: {
    nameStyle () {
      let style = {'width': '75%'}
      if (this.validName) {
        style.color = 'green'
      } else if (!this.validName && this.name !== '') {
        style.color = 'red'
      }
      return style
    },
    mainSpecStyle () {
      let style = {'width': '75%'}
      if (this.validMainSpec) {
        style.color = 'green'
      } else if (!this.validMainSpec && this.mainSpec !== '') {
        style.color = 'red'
      }
      return style
    },
    offSpecStyle () {
      let style = {'width': '75%'}
      if (this.validOffSpec) {
        style.color = 'green'
      } else if (!this.validOffSpec && this.offSpec !== '') {
        style.color = 'red'
      }
      return style
    }
  },
  methods: {
    hKillsBar (heroic, mythic) {
      let total = heroic + mythic
      if (total > 0) {
        let str = '<div style="width: 100%">'
        let hWidth, mWidth
        if (heroic > 0) {
          hWidth = (heroic / total) * 100
          if (mythic > 0) {
            str += '<div style="border-radius: 5px 0px 0px 5px; float: left; background-color: #28AAB2; width: ' + hWidth + '%;">' + heroic + '</div>'
          } else {
            str += '<div style="border-radius: 5px 5px 5px 5px; float: left; background-color: #28AAB2; width: ' + hWidth + '%;">' + heroic + '</div>'
          }
        } else {
          hWidth = 0
        }
        if (mythic > 0) {
          mWidth = (mythic / total) * 100
          if (heroic > 0) {
            str += '<div style="border-radius: 0px 5px 5px 0px; float: left; background-color: #D216E3; width: ' + mWidth + '%;">' + mythic + '</div>'
          } else {
            str += '<div style="border-radius: 5px 5px 5px 5px; float: left; background-color: #D216E3; width: ' + mWidth + '%;">' + mythic + '</div>'
          }
        } else {
          mWidth = 0
        }
        str += '</div>'
        return str
      } else {
        return '<div>0</div>'
      }
    },
    isValidMainSpec () {
      if (this.character !== undefined && this.character.profile !== undefined) {
        let this2 = this
        let c = this.character.profile.class
        let spec = this.mainSpec
        if (spec !== this.offSpec) {
          clearTimeout(this.validMainSpecTimeout)
          this.validMainSpecTimeout = setTimeout(() => {
            this2.validMainSpec = $util.resource.validSpec(c, spec)
          }, 1000)
        } else {
          this.validMainSpec = false
        }
      }
    },
    isValidOffSpec () {
      if (this.character !== undefined && this.character.profile !== undefined) {
        let this2 = this
        let c = this.character.profile.class
        let spec = this.offSpec
        if (spec !== this.mainSpec) {
          clearTimeout(this.validOffSpecTimeout)
          this.validOffSpecTimeout = setTimeout(() => {
            this2.validOffSpec = $util.resource.validSpec(c, spec)
          }, 1000)
        } else {
          this.validOffSpec = false
        }
      }
    },
    isValidCharacterName (name) {
      let fields = ''
      let http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
      let this2 = this
      clearTimeout(this.validNameTimeout)
      this.validNameTimeout = setTimeout(() => {
        this2.$http.get(http).then((response) => {
          this2.validName = true
        }, (response) => {
          this2.validName = false
        }).then(() => {
          if (this2.validName) {
            this2.searchForCharacter(name)
          } else {
            this2.show = false
          }
        })
      }, 1000)
    },
    submitForm () {
      this.character = {}
      this.name = ''
      this.mainSpec = ''
      this.offSpec = ''
      this.validName = false
      this.validMainSpec = false
      this.validOffSpec = false
      this.show = false
      this.error = false
      this.searching = false
      this.submitted = true
    },
    change (x) {
      if (document.getElementById(x).style.backgroundColor === '' || document.getElementById(x).style.backgroundColor === 'rgb(208, 62, 62)') {
        if (x === 'additional') {
          this.additional = 'Yes'
        } else if (x === 'warcraft') {
          this.warcraft = 'Yes'
        } else if (x === 'trail') {
          this.trail = 'Yes'
        }
        document.getElementById(x).style.backgroundColor = 'rgb(70, 193, 90)'
      } else if (document.getElementById(x).style.backgroundColor === 'rgb(70, 193, 90)') {
        if (x === 'additional') {
          this.additional = 'No'
        } else if (x === 'warcraft') {
          this.warcraft = 'No'
        } else if (x === 'trail') {
          this.trail = 'No'
        }
        document.getElementById(x).style.backgroundColor = 'rgb(208, 62, 62)'
      }
    },
    getClassName (id) {
      return $util.resource.className(id)
    },
    getClassColor (id) {
      return $util.resource.classColor(id)
    },
    getGenderName (id) {
      return $util.resource.genderName(id)
    },
    getGenderColor (id) {
      return $util.resource.genderColor(id)
    },
    getRaceName (id) {
      return $util.resource.raceName(id)
    },
    getRaceColor (id) {
      return $util.resource.raceColor(id)
    },
    checkProgression (raids) {
      for (var raid in raids) {
        if (raids[raid].name === 'The Emerald Nightmare') {
          return raids[raid]
        }
      }
    },
    searchForCharacter (name) {
      this.searching = true
      this.error = false
      this.show = false
      let fields = ''
      let http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
      this.$http.get(http).then((response) => {
        this.character.profile = response.body
        this.character.armoryLink = 'https://eu.battle.net/wow/en/character/stormscale/' + name + '/advanced'
      }, (response) => {
        this.character = {error: 'no character found.'}
        this.error = true
        this.searching = false
        this.show = false
        return
      }).then(() => {
        if (this.character.profile !== undefined) {
          fields = 'fields=achievements&'
          http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
          this.$http.get(http).then((response) => {
            this.character.achievements = response.body.achievements
          }).then(() => {
            if (this.character.profile !== undefined) {
              fields = 'fields=appearance&'
              http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
              this.$http.get(http).then((response) => {
                this.character.appearance = response.body.appearance
              }).then(() => {
                if (this.character.profile !== undefined) {
                  fields = 'fields=feed&'
                  http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                  this.$http.get(http).then((response) => {
                    this.character.feed = response.body.feed
                  }).then(() => {
                    if (this.character.profile !== undefined) {
                      fields = 'fields=guild&'
                      http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                      this.$http.get(http).then((response) => {
                        this.character.guild = response.body.guild
                      }).then(() => {
                        if (this.character.profile !== undefined) {
                          fields = 'fields=items&'
                          http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                          this.$http.get(http).then((response) => {
                            this.character.items = response.body.items
                          }).then(() => {
                            if (this.character.profile !== undefined) {
                              fields = 'fields=progression&'
                              http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                              this.$http.get(http).then((response) => {
                                this.character.progression = response.body.progression
                              }).then(() => {
                                if (this.character.profile !== undefined) {
                                  fields = 'fields=statistics&'
                                  http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                                  this.$http.get(http).then((response) => {
                                    this.character.statistics = response.body.statistics
                                  }).then(() => {
                                    if (this.character.profile !== undefined) {
                                      fields = 'fields=stats&'
                                      http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                                      this.$http.get(http).then((response) => {
                                        this.character.stats = response.body.stats
                                      }).then(() => {
                                        if (this.character.profile !== undefined) {
                                          fields = 'fields=talents&'
                                          http = 'https://eu.api.battle.net/wow/character/Stormscale/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                                          this.$http.get(http).then((response) => {
                                            this.character.talents = response.body.talents
                                          }).then(() => {
                                            this.character.emeraldNightmare = this.checkProgression(this.character.progression.raids).bosses
                                            this.character.warcraftLogsLink = 'https://www.warcraftlogs.com/rankings/character_name/' + this.character.profile.name + '/Stormscale/EU'
                                          }).then(() => {
                                            this.isValidMainSpec()
                                            this.isValidOffSpec()
                                            this.show = true
                                            this.searching = false
                                            this.error = false
                                            return
                                          })
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style>
.name {
  font-size: larger;
}

.loader {
  position: relative;
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
  background: #3088E2;
}

.dot_2 {
  animation: animateDot2 1.5s linear infinite;
  animation-delay: 0.5s;
  left: 24px;
}

.dot_3 {
  animation: animateDot3 1.5s linear infinite;
  left: 12px;
}

.dot_4 {
  animation: animateDot4 1.5s linear infinite;
  animation-delay: 0.5s;
  left: 24px;
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
#tuesday, #wednesday, #thursday, #sunday, #warcraft, #additional, #trail {
  display: inline-block;
  width: 75px;
  padding: 10px 10px;
  margin: 10px 10px;
  background-color: rgb(208, 62, 62);
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
  cursor: pointer;
}
#tuesday:hover, #wednesday:hover, #thursday:hover, #sunday:hover, #warcraft:hover, #additional:hover, #trail:hover {
  border: 1px solid #060606;
}
table, th, td {
  margin: auto;
  border-collapse: collapse;
  padding: 5px 5px;
}
.v_form {
  padding-bottom: 5px;
}
input {
  font-size: large;
  font-family: 'Farsan';
  background-color: #E6E6E6;
}
input[type=number] {
  width: 10% !important;
}
input[type=text], input[type=number] {
  text-align: center;
  border: none;
  width: 50%;
  padding: 5px 5px;
  margin: 8px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ff8000;
}
input[type=text]:focus, input[type=number]:focus, select:focus {
  outline: none;
  border-bottom: 2px solid #ff8000;
}
select {
  width: 50%;
  border: none;
  border-bottom: 1px solid #ff8000;
  font-family: 'Farsan';
  font-size: large;
}
textarea {
  width: 75%;
  height: 99px;
  margin: 12px 20px;
  border: none;
  border-bottom: 1px solid #ff8000;
  resize: none;
  font-family: 'Farsan';
  font-size: large;
  background-color: #E6E6E6;
}
textarea:focus {
  outline: none;
  border-bottom: 2px solid #ff8000;
}
.v_form_submit {
  background-color: #ff9000;
  border: none;
  color: black;
  padding: 16px 32px;
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
#submitted {
  color: #3CB600;
}
</style>