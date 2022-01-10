<template>
	<view class="card">
		<swiper class="cardSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(banner, index) in currentCategory.bannerUrlList" :key="index">
				<view class="swiper-item"><image class="swiperImg" :src="banner" mode=""></image></view>
			</swiper-item>
		</swiper>
		<view class="cardTitle">{{ currentCategory.name }}</view>
		<view class="cardTitle">{{ currentCategory.frontName }}</view>
		<view class="goodsList">
			<view @click="toDetail(goods)" class="goodsItem" v-for="goods in currentCard.itemList" :key="goods.id">
				<image class="goodsImg" :src="goods.primaryPicUrl" mode=""></image>
				<view class="goodsName">{{ goods.name }}</view>
				<view class="goodsPrice">{{ goods.counterPrice }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'Card',
	props: {
		currentId: {
			type: Number
		}
	},
	mounted() {
		this.getCardList();
	},
	methods: {
		async getCardList() {
			await this.$store.dispatch('getCardList');
		},

		toDetail(goods) {
			// 第一种做法：路由传参，小程序的路径长度比浏览器要长，可以这样干，但不建议
			// wx.navigateTo({
			// 	url: '/pages/detail/detail?goodsInfo=' + JSON.stringify(goods)
			// });

			// 第二种：存储方案
			wx.setStorageSync('goodsInfo_key', goods)
			wx.navigateTo({
				url: '/pages/detail/detail'
			});
		}
	},
	computed: {
		...mapState({
			cardList: state => state.home.cardList
		}),

		// 根据点击的nav的L1Id和cartList当中每一项的parentId进行对比
		currentCard() {
			return this.cardList.find(item => item.category.parentId === this.currentId) || {};
		},

		currentCategory() {
			return this.currentCard.category || {};
		}
	}
};
</script>

<style lang="stylus">
.card
	.cardSwiper
		.swiperImg
			width 100%
			height 300rpx
	.cardTitle
		text-align center
	.goodsList
		display flex
		flex-wrap wrap
		justify-content space-around
		&::after
			display block
			content ''
			width 344rpx
			// height 344rpx 不能给高度，因为如果是偶数个有高度就撑开了
		.goodsItem
			.goodsImg
				width 344rpx
				height 344rpx
			.goodsName
				width 344rpx
</style>
