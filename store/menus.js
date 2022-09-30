const defaultMenus = () => [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'home',
    place: 'main',
    accessName: 'home',
    submenus: [],
  },
  {
    label: 'Letter',
    to: '/letter',
    icon: 'document',
    place: 'main',
    accessName: 'letter',
    submenus: [],
  },
  {
    label: 'Setting',
    to: '/setting',
    icon: 'setting',
    place: 'bottom',
    accessName: 'setting',
    submenus: [
      // {
      //   label: 'General',
      //   to: '/setting/general',
      //   accessName: 'setting_general',
      // },
      {
        label: 'Company',
        to: '/setting/company',
        accessName: 'setting_company',
      },
      {
        label: 'Users Management',
        to: '/setting/user',
        accessName: 'setting_user_management',
      },
    ],
  },
]

export const state = () => ({
  list: [],
})

export const getters = {
  main: (state) => state.list.filter((menu) => menu.place === 'main'),
  bottom: (state) => state.list.filter((menu) => menu.place === 'bottom'),
  all: (state) => state.list,
}

export const actions = {
  setMenus: ({ commit }, role) => {
    commit('SET_MENUS', role)
  },
  unsetMenus: ({ commit }) => {
    commit('UNSET_MENUS')
  },
}

export const mutations = {
  SET_MENUS: (state, role) => {
    const accesses = Object.entries(role.access)

    const filteredMenu = defaultMenus()
      .filter((menu) =>
        accesses.find((i) => i[0].startsWith(menu.accessName) && i[1])
      )
      .map((menu) => {
        menu.submenus = menu.submenus.filter((submenu) =>
          accesses.find((i) => i[0].startsWith(submenu.accessName) && i[1])
        )

        return menu
      })

    state.list = filteredMenu
  },
  UNSET_MENUS: (state) => {
    state.list = []
  },
}
