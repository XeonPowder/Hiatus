import mutations from './mutations'
import actions from './actions'

const state = {
  data: {
    boards: [
      {id: 1, title: 'WoW General Discussion', planks: [{id: 1, title: 'Class Discussion', chips: [{id: 1, title: 'Warrior', posts: [{id: 1, title: 'my warrior'}]}]}]},
      {id: 2, title: 'Hiatus Ravencrest EU'}
    ]
  }
}

export default {
  state,
  mutations,
  actions
}
