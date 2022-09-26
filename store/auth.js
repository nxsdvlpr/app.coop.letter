export const state = () => ({
  isAuthenticated: false,
  me: null,
})

export const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  me: (state) => state.me,
}

export const actions = {
  isAuthenticated: ({ commit }, bool) => {
    commit('SET_IS_AUTHENTICATED', bool)
  },
  setMe: ({ commit }, payload) => {
    commit('SET_ME', payload)
  },
  unsetAuth: ({ commit }) => {
    commit('UNSET_AUTH')
  },
}

export const mutations = {
  SET_IS_AUTHENTICATED: (state, bool) => {
    state.isAuthenticated = bool
  },
  SET_ME: (state, payload) => {
    state.me = payload
  },
  UNSET_AUTH: (state) => {
    state.isAuthenticated = false
    state.me = null
  },
}
