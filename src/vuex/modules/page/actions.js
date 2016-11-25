import * as types from './types'

const actions = {
  change ({commit}, args) {
    if (args[0] !== undefined) {
      switch (args[0]) {
        case 'page':
          commit(types.CHANGE_PAGE, args[1])
          break
        case 'location':
          commit(types.CHANGE_LOCATION, args[1])
          break
        default:
          console.log('error: unknown request type @ vuex/modules/page/actions - change()')
      }
      return
    }
    console.log('error: no arguments defined @ vuex/modules/page/actions - change()')
  }
}

export default actions
