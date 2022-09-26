export default function ({ store, route, redirect }) {
  store.commit('nboard/resetDebugCode')

  if (route.name === 'index') {
    redirect('/dashboard')
  }
}
