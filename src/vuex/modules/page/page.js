import mutations from './mutations'
import actions from './actions'

const state = {
  data: {
    page: 'home',
    location: 'home',
    validLocations: ['home', 'about', 'timeline', 'roster'],
    title: {
      home: 'Sanctity',
      about: 'About',
      timeline: 'Timeline',
      roster: 'Roster',
      unknown: 'Unknown Title'
    },
    subtitle: {
      home: 'Welcome to the Ultimate.',
      about: 'At Sanctity we strive...',
      timeline: 'On x we did y',
      roster: 'Raiders....',
      unknown: 'unknown subtitle'
    }
  }
}

export default {
  state,
  mutations,
  actions
}
