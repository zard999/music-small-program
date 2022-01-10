import request from '../../utils/request.js'

const state = { indexData: {}, cardList: [] }

const mutations = {
	'SET_INDEXDATA'(state, indexData) {
		state.indexData = indexData
	},
	'SET_CARTLIST'(state, cardList) {
		state.cardList = cardList
	}
}

const actions = {
	async getIndexData({ commit }) {
		const result = await request('/getIndexData')
		commit('SET_INDEXDATA', result)
	},
	async getCardList({ commit }) {
		const result = await request('/getIndexCateList')
		commit('SET_CARTLIST', result)
	}
}

const getters = {
	// nav导航列表数据
	navList(state) {
		return (state.indexData.kingKongModule || {}).kingKongList || []
	},

	// icon图标列表
	iconList(state) {
		return state.indexData.policyDescList || []
	},

	// category列表
	floorList(state) {
		return state.indexData.categoryModule || []
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}
