export default {
  namespaced: true,
  state: {
    currentUser: {},
    isLogin: false
  },
  mutations: {
    setCurrentUser (state, payload) {
        state.currentUser = payload;
        state.isLogin = true;
    },
  },
  actions: {
    signIn ({ commit }, payload) {
      commit('setCurrentUser', payload)
    },
  },
}