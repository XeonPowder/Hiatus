<template>
<div class="v_form">
  <transition name="fade" mode="out-in">
    <div key="notsubmitted" v-if="!submitted">
      <transition name="fade" mode="out-in">
        <div key="characterInfo">
          <holder title="Character Information" subtitle="Ravencrest EU">
            <transition name="fade" mode="out-in">
              <table key="inVName" v-if="!validName">
                <tr>
                  <th>
                    <span class="name">Character Name:<span style="color: red;">*</span></span>
                  </th>
                </tr>
                <tr>
                  <td>
                    <input autofocus :style="nameStyle" @keyup="isValidCharacterName(name, $event)" v-model="name" type="text">
                  </td>
                </tr>
              </table>
              <table key="vName" v-else-if="validName">
                <tr>
                  <th>
                    <span class="name">Character Name:<span style="color: red;">*</span></span>
                  </th>
                  <th>
                    <span class="name">Main Spec:<span style="color: red;">*</span></span><br>
                  </th>
                  <th>
                    <span class="name">Off Spec:<span style="color: red;">*</span></span><br>
                  </th>
                </tr>
                <tr>
                  <td>
                    <input autofocus :style="nameStyle" @keyup="isValidCharacterName(name, $event)" v-model="name" type="text">
                  </td>
                  <td key="validNameMainSpecInput" v-if="validName">
                    <input autofocus :style="mainSpecStyle" @keyup="isValidMainSpec()" v-model="mainSpec" type="text">
                  </td>
                  <td key="validNameOffSpecInput" v-if="validName">
                    <input :style="offSpecStyle" @keyup="isValidOffSpec()" v-model="offSpec" type="text">
                  </td>
                </tr>
              </table>
            </transition>
          </holder>
          <transition name="fade" mode="out-in">
            <div key="validName" v-if="validName">
              <holder title="Availability" subtitle="(8pm-11pm Server Time)" style="margin-top: 20px;">
                <div style="width: 100px" id="tuesday" @click="change('tuesday')">Tuesday</div>
                <div style="width: 100px" id="wednesday" @click="change('wednesday')">Wednesday</div>
                <div style="width: 100px" id="thursday" @click="change('thursday')">Thursday</div>
                <div style="width: 100px" id="sunday" @click="change('sunday')">Sunday</div><br><br>
              </holder>
              <holder style="margin-top: 20px;">
                <br><div style="width: 125px" key="trial" id="trial" @click="change('trial')">{{trial.text}}
                </div><br>
                <transition name="fade" mode="out-in">
                  <span v-if="trial.use">
                    <div key="trial_warning" id="warning">
                      <h2 style="color: #3C3C3C; font-weight: normal;">Warning: Trial raiders are subject to lower loot priority</h2>
                    </div>
                  </span>
                </transition>
                <br><div style="width: 125px" id="warcraft" @click="change('warcraft')">{{warcraft.text}}</div><br>
                <transition name="fade" mode="out-in">
                  <div key="useWarcraft" v-if="warcraft.use">
                    <transition name="fade" mode="out-in">
                      <input key="warcraftLogsLinkFound" v-if="!searching && character.warcraftLogsLink !== undefined" style="width: 75%" type="text" :value="character.warcraftLogsLink">
                      <div key="warcraftLogsLinkSearching" v-else-if="searching" class="loader">
                          <span class="dot dot_1"></span>
                          <span class="dot dot_2"></span>
                          <span class="dot dot_3"></span>
                          <span class="dot dot_4"></span>
                      </div>
                      <input key="warcraftLogsLinkNotFound" v-else type="text" style="width: 75%">
                    </transition>
                  </div>
                </transition>
                <br><div style="width: 125px" id="additional" @click="change('additional')">{{additional.text}}</div><br>
                <transition name="fade" mode="out-in">
                  <span key="useAdditional" v-if="additional.use">
                    <textarea placeholder="Any information you would like to let us know?"></textarea>
                  </span>
                </transition>
                <br>
                <div key="allValid" v-if="validMainSpec && validOffSpec">
                  <button @click="submitForm" class="v_form_submit">Submit</button>
                </div><br>
              </holder>
            </div>
          </transition>
        </div>
      </transition>
    </div>
    <div key="submitted" v-else>
      <holder>
        <h2 id="submitted">Application Sent!</h2>
        <button @click="resetData()" class="v_form_submit">Return</button>
        <button @click="downloadPDF()" class="v_form_submit">Download</button>
      </holder>
    </div>
  </transition>
  <transition name="fade" mode="out-in">
    <holder id="characterData" key="showcharacter" v-if="show && character !== undefined && character.profile !== undefined" style="margin-top: 20px;">
      <!-- <button @click="downloadPDF()" class="v_form_submit">Download</button> -->
      <br><table style="border: 1px solid #000;">
        <tr style="text-align: center; border-bottom: 1px solid #000;">
          <th style="width: 10%; border-right: 1px solid #000;">Name</th>
          <th style="width: 10%; border-right: 1px solid #000;">Class</th>
          <th style="width: 10%; border-right: 1px solid #000;">Level</th>
          <th style="width: 10%; border-right: 1px solid #000;">Race</th>
          <th style="width: 10%; border-right: 1px solid #000;">Main Spec</th>
          <th style="width: 10%; border-right: 1px solid #000;">Off Spec</th>
          <th style="width: 10%; border-right: 1px solid #000;">Item Level</th>
          <th style="width: 10%; border-right: 1px solid #000;">Xavius Curve</th>
          <th style="width: 10%;">Heroic ToV</th>
        </tr>
        <tr style="background-color: #232323; color: #B1B1B1;">
          <td style="border-right: 1px solid #000;">
            <span v-if="character.profile.name !== undefined">
              <span :style="{color: getClassColor(character.profile.class)}">{{character.profile.name}}</span>
            </span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="character.profile.class !== undefined">
              <span :style="{color: getClassColor(character.profile.class)}">{{getClassName(character.profile.class)}}</span>
            </span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="character.profile.level !== undefined">
              <span v-if="character.profile.level !== 110">
                <span style="color: #C64F79"> {{character.profile.level}} </span> / <span style="color: #FF005A"> 110 </span>
              </span>
              <span v-if="character.profile.level === 110">
                <span style="color: #C64F79"> {{character.profile.level}} </span>
              </span>
            </span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="character.profile.race !== undefined">
              <span :style="{color: getRaceColor(character.profile.race)}">{{getRaceName(character.profile.race)}}</span>
            </span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="validMainSpec">
              <span style="color: #7A5BEF;">{{mainSpec}}</span>
            </span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="validOffSpec">
              <span style="color: #5B8FEF;">{{offSpec}}</span>
            </span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="character.items.averageItemLevel !== undefined && character.items.averageItemLevelEquipped === undefined">
              <span style="color: #30C14B"> {{character.items.averageItemLevel}} </span>
            </span>
            <span v-else-if="character.items.averageItemLevel !== undefined && character.items.averageItemLevelEquipped !== undefined">
              <span style="color: #30C14B"> {{character.items.averageItemLevel}} </span>/
              <span style="color: #AA9D33"> {{character.items.averageItemLevelEquipped}} </span>
            </span>
            <span v-else-if="character.items.averageItemLevel === undefined && character.items.averageItemLevelEquipped !== undefined">
              <span style="color: #AA9D33"> {{character.items.averageItemLevelEquipped}} </span>
            </span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="!character.achievements.achievementsCompleted.includes(11194)"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
          <td>
            <span v-if="!character.achievements.achievementsCompleted.includes(11426)"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
        </tr>
      </table>
      <br><table style="border: 1px solid #000;">
        <tr style="text-align: center; border-bottom: 1px solid #000;">
          <th style="width: 20%; border-right: 1px solid #000;">Tuesday</th>
          <th style="width: 20%; border-right: 1px solid #000;">Wednesday</th>
          <th style="width: 20%; border-right: 1px solid #000;">Thursday</th>
          <th style="width: 20%;">Sunday</th>
        </tr>
        <tr style="background-color: #232323; color: #B1B1B1;">
          <td style="border-right: 1px solid #000;">
            <span v-if="!availability.tuesday"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="!availability.wednesday"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="!availability.thursday"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="!availability.sunday"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
        </tr>
      </table>
      <br><table style="border: 1px solid #000;">
        <tr style="text-align: center; border-bottom: 1px solid #000;">
          <th style="width: 20%; border-right: 1px solid #000;">Attend Trial Raids</th>
          <th style="width: 20%; border-right: 1px solid #000;">Warcraft Logs</th>
          <th style="width: 20%;">Additional Info</th>
        </tr>
        <tr style="background-color: #232323; color: #B1B1B1;">
          <td style="border-right: 1px solid #000;">
            <span v-if="!trial.use"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="!warcraft.use"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
          <td style="border-right: 1px solid #000;">
            <span v-if="!additional.use"><i style="color: red;" class="fa fa-times" aria-hidden="true"></i></span>
            <span v-else><i style="color: #22B522;" class="fa fa-check" aria-hidden="true"></i></span>
          </td>
        </tr>
      </table>
      <br><table v-if="character.profile.level === 110 && character.emeraldNightmare !== undefined" style="border: 1px solid #000;">
        <tr>
          <th style="width: 25%; text-align: left; border-top: 1px solid #000; border-bottom: 1px solid #000; border-left: 1px solid #000; border-right: 1px solid #000;">Emerald Nightmare Boss</th>
          <th style="width: 50%; text-align: left; border-top: 1px solid #000; border-bottom: 1px solid #000; border-right: 1px solid #000;">Difficulty: ( <span style="color: #28AAB2">Heroic</span> | <span style="color: #D216E3">Mythic</span> )</th>
          <th style="width: 20%; border-top: 1px solid #000; border-bottom: 1px solid #000; border-right: 1px solid #000;">Total Kills</th>
        </tr>
        <tr v-for="boss in character.emeraldNightmare" style="background-color: #232323;">
          <td style="text-align: left; color: #B1B1B1; border-right: 1px solid #000;">{{boss.name}}</td>
          <td style="color: #000; font-weight: bold; border-right: 1px solid #000;" v-html="hKillsBar(boss.heroicKills, boss.mythicKills)"></td>
          <td style="color: #B1B1B1;">{{boss.heroicKills + boss.mythicKills}}</td>
        </tr>
      </table><br>
    </holder>
    <holder key="showerror" v-else-if="!searching && !invalidNameRegex && !validName && name.length > 1" style="margin-top: 20px;">
      <h1 style="color: red"><span style="position: relative; top: 15px;">Character not found.</span></h1><br>
    </holder>
    <holder key="showerror" v-else-if="!searching && !validName && invalidNameRegex" style="margin-top: 20px;">
      <h1 style="color: red"><span style="position: relative; top: 15px;">Invalid Characters Entered.</span></h1><br>
    </holder>
    <holder key="searching" v-else-if="searching" style="margin-top: 20px;">
      <div class="loader">
        <span class="dot dot_1"></span>
        <span class="dot dot_2"></span>
        <span class="dot dot_3"></span>
        <span class="dot dot_4"></span>
      </div><br>
    </holder>
  </transition>
</div>
</template>

<script>
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
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
      invalidNameRegex: false,
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
      availability: {tuesday: false, wednesday: false, thursday: false, sunday: false},
      additional: {text: 'Additional Information', use: false},
      warcraft: {text: 'Send Warcraft Logs', use: false},
      trial: {text: 'Attend Trial Raids', use: false}
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
    isValidCharacterName (name, e) {
      let regex = new RegExp('(\\d)|([^a-zA-ZÀ-ž]+)')
      if (this.character !== undefined && this.character.profile !== undefined && this.character.profile.name === name) {
        clearTimeout(this.validNameTimeout)
        this.show = true
        this.validName = true
        this.invalidNameRegex = false
        this.searching = false
        return
      }
      if ((name.length < 2 && (this.character !== undefined && this.character.profile === undefined))) {
        this.validName = false
        this.searching = false
        this.invalidNameRegex = false
        this.show = false
        clearTimeout(this.validNameTimeout)
        return
      }
      if (name.length < 2) {
        return
      }
      if (regex.test(name)) {
        this.invalidNameRegex = true
        this.validName = false
        this.searching = false
        this.show = false
        clearTimeout(this.validNameTimeout)
        return
      } else {
        this.invalidNameRegex = false
        clearTimeout(this.validNameTimeout)
      }
      this.searching = true
      let fields = ''
      let http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
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
            this2.searching = false
          }
        })
      }, 2000)
    },
    resetData () {
      this.character = {}
      this.name = ''
      this.invalidNameRegex = false
      this.validName = false
      this.validNameTimeout = null
      this.mainSpec = ''
      this.validMainSpec = false
      this.validMainSpecTimeout = null
      this.offSpec = ''
      this.validOffSpec = false
      this.validOffSpecTimeout = null
      this.submitted = false
      this.show = false
      this.error = false
      this.searching = false
      this.additional = 'No'
      this.warcraft = 'No'
      this.trial = 'No'
    },
    /* eslint-disable */
    downloadPDF () {
      let this2 = this
      let div = document.querySelector('#characterData')
      html2canvas(div, {
        onrendered: function (canvas) {
          let imgData = canvas.toDataURL('image/png', 1.0)
          let pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [canvas.width, canvas.height]
          })
          pdf.addImage(imgData, 'png', 0, 0, canvas.width, canvas.height)

          let saveName = this2.character.profile.name + '_' + this2.character.profile.realm + '_Application_' + Date.now() + '.pdf'
          pdf.save(saveName)
      }
      })
    },
    /* eslint-enable */
    submitForm () {
      this.submitted = true
    },
    change (x) {
      if (document.getElementById(x).style.backgroundColor === '' || document.getElementById(x).style.backgroundColor === 'rgb(208, 62, 62)') {
        document.getElementById(x).style.backgroundColor = 'rgb(70, 193, 90)'
      } else if (document.getElementById(x).style.backgroundColor === 'rgb(70, 193, 90)') {
        document.getElementById(x).style.backgroundColor = 'rgb(208, 62, 62)'
      }
      if (x === 'additional') {
        this.additional.use = !this.additional.use
      } else if (x === 'trial') {
        this.trial.use = !this.trial.use
      } else if (x === 'warcraft') {
        this.warcraft.use = !this.warcraft.use
      } else if (x === 'tuesday') {
        this.availability.tuesday = !this.availability.tuesday
      } else if (x === 'thursday') {
        this.availability.thursday = !this.availability.thursday
      } else if (x === 'wednesday') {
        this.availability.wednesday = !this.availability.wednesday
      } else if (x === 'sunday') {
        this.availability.sunday = !this.availability.sunday
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
      let http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
      this.$http.get(http).then((response) => {
        this.character.profile = response.body
        this.character.armoryLink = 'https://eu.battle.net/wow/en/character/Ravencrest/' + name + '/advanced'
      }, (response) => {
        this.character = {error: 'no character found.'}
        this.error = true
        this.searching = false
        this.show = false
        return
      }).then(() => {
        if (this.character.profile !== undefined) {
          fields = 'fields=achievements&'
          http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
          this.$http.get(http).then((response) => {
            this.character.achievements = response.body.achievements
            console.log(this.character.achievements)
          }).then(() => {
            if (this.character.profile !== undefined) {
              fields = 'fields=appearance&'
              http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
              this.$http.get(http).then((response) => {
                this.character.appearance = response.body.appearance
              }).then(() => {
                if (this.character.profile !== undefined) {
                  fields = 'fields=feed&'
                  http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                  this.$http.get(http).then((response) => {
                    this.character.feed = response.body.feed
                  }).then(() => {
                    if (this.character.profile !== undefined) {
                      fields = 'fields=guild&'
                      http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                      this.$http.get(http).then((response) => {
                        this.character.guild = response.body.guild
                      }).then(() => {
                        if (this.character.profile !== undefined) {
                          fields = 'fields=items&'
                          http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                          this.$http.get(http).then((response) => {
                            this.character.items = response.body.items
                          }).then(() => {
                            if (this.character.profile !== undefined) {
                              fields = 'fields=progression&'
                              http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                              this.$http.get(http).then((response) => {
                                this.character.progression = response.body.progression
                              }).then(() => {
                                if (this.character.profile !== undefined) {
                                  fields = 'fields=statistics&'
                                  http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                                  this.$http.get(http).then((response) => {
                                    this.character.statistics = response.body.statistics
                                  }).then(() => {
                                    if (this.character.profile !== undefined) {
                                      fields = 'fields=stats&'
                                      http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                                      this.$http.get(http).then((response) => {
                                        this.character.stats = response.body.stats
                                      }).then(() => {
                                        if (this.character.profile !== undefined) {
                                          fields = 'fields=talents&'
                                          http = 'https://eu.api.battle.net/wow/character/Ravencrest/' + name + '?' + fields + 'locale=en_GB&apikey=zn2vjjju6qpav96datyqh78smc6s3wax'
                                          this.$http.get(http).then((response) => {
                                            this.character.talents = response.body.talents
                                          }).then(() => {
                                            this.character.emeraldNightmare = this.checkProgression(this.character.progression.raids).bosses
                                            this.character.warcraftLogsLink = 'https://www.warcraftlogs.com/rankings/character_name/' + this.character.profile.name + '/Ravencrest/EU'
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

<style scoped>
.name {
  font-size: larger;
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
#warning {
  display: inline-block;
  width: 50%;
  padding: 10px 10px;
  margin: 10px 10px;
  background-color: #F6F864;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
  transition: background-color .5s
}
#tuesday, #wednesday, #thursday, #sunday, #warcraft, #additional, #trial {
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
  transition: background-color .5s
}
#warning:hover, #tuesday:hover, #wednesday:hover, #thursday:hover, #sunday:hover, #warcraft:hover, #additional:hover, #trial:hover {
  border: 1px solid #060606;
  padding: 9px 9px;
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
  width: 25%;
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