import mutations from './mutations'
import actions from './actions'

const state = {
  data: {
    page: 'home',
    location: 'home',
    validLocations: ['home', 'about', 'timeline', 'roster', 'apply'],
    title: {
      home: 'Sanctity',
      about: 'About',
      timeline: 'Timeline',
      roster: 'Roster',
      apply: 'Apply',
      unknown: 'Unknown Title'
    },
    subtitle: {
      home: 'Welcome to the Ultimate.',
      about: 'At Sanctity we strive...',
      timeline: 'On x we did y',
      roster: 'Raiders....',
      apply: 'Do you have what it takes?',
      unknown: 'unknown subtitle'
    }
  }
}

export default {
  state,
  mutations,
  actions
}
