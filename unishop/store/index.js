import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home.js'
import category from './modules/category.js'
import cart from './modules/cart.js'
Vue.use(Vuex)
const state = {}

const mutations = {}

const actions = {}

const getters = {}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		home,
		category,
		cart
	}
})
