import * as types from './types'

const mutations = {
  [types.CHANGE_PAGE] (state, page) {
    state.data.page = page
  },
  [types.CHANGE_LOCATION] (state, location) {
    state.data.location = location
  }
}

export default mutations
