export const state = () => ({
  appHeader: {
    isSmall: false,
  },
  appMain: {
    top: 280,
  },
  appDebugger: {
    code: null,
  },
  sidebar: {
    isOpen: false,
  },
  submenus: [],
  isMobile: false,
  breakpoint: null,
  formRouteOrigin: null,
})

export const getters = {
  appHeader(state) {
    return state.appHeader
  },
  appMain(state) {
    return state.appMain
  },
  debuggerCode(state) {
    const code = state.appDebugger.code

    if (typeof code === 'object') {
      return JSON.stringify(code, null, 4)
    }
    return code
  },
  sidebar(state) {
    return state.sidebar
  },
  breakpoint(state) {
    return state.breakpoint
  },
  formRouteOrigin(state) {
    return state.formRouteOrigin
  },
}

export const mutations = {
  setAppHeaderSmall(state, payload) {
    state.appHeader.isSmall = payload
  },
  debugCode(state, payload) {
    state.appDebugger.code = payload
  },
  resetDebugCode(state) {
    state.appDebugger.code = null
  },
  calcAppMain(state) {
    if (process.client) {
      const nAppHeader = document.getElementById('nAppHeader')
      if (typeof nAppHeader === 'object' && nAppHeader !== null) {
        state.appMain.top =
          Math.ceil(nAppHeader.getBoundingClientRect().bottom) + 1
      }
    }
  },
  openSidebar() {
    state.sidebar.isOpen = true
  },
  closeSidebar(state) {
    state.sidebar.isOpen = false
  },
  toggleSidebar(state) {
    state.sidebar.isOpen = !state.sidebar.isOpen
  },
  setSubmenus(state, submenus) {
    state.submenus = submenus
  },
  unsetSubmenus(state, submenus) {
    state.submenus = []
  },
  setBreakpoint(state, breakpoint) {
    state.breakpoint = breakpoint
  },
  setFormRouteOrigin(state, formRouteOrigin) {
    state.formRouteOrigin = formRouteOrigin
  },
}
