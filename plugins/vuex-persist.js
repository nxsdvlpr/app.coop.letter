import { VuexPersistence } from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    modules: ['nboard'],
    storage: window.localStorage,
  }).plugin(store)
}
