import Vue from 'vue'
import Vuex from 'vuex'
import phonebook from './modules/phonebook'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    phonebook
  }
})
