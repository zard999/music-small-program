<template>
	<view class="indexContainer">
		<!-- header -->
		<view class="header">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="search">
				<text class="iconfont icon-sousuo"></text>
				<input class="searchInput" placeholder-style="color:#dd524d" type="text" value="" placeholder="搜索商品" />
			</view>
			<button class="btn">北方汉子</button>
		</view>

		<!-- nav -->
		<scroll-view scroll-x enable-flex class="navScroll">
			<view class="navItem" :class="{ active: currentId === -1 }" @click="currentId = -1">推荐</view>
			<view @click="currentId = nav.L1Id" class="navItem" :class="{ active: currentId === nav.L1Id }" v-for="nav in navList" :key="nav.L1Id">{{ nav.text }}</view>
		</scroll-view>

		<!-- 主要内容 -->
		<scroll-view scroll-y="true" class="mainScroll" enable-flex>
			<view class="mainItem" v-show="currentId === -1">
				<!-- 轮播图 -->
				<swiper class="mainSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<view class="swiper-item">
							<image src="https://yanxuan.nosdn.127.net/static-union/1640763153f3442f.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="https://yanxuan.nosdn.127.net/320ee4fd147edce6e6d7e437eb1b2250.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="https://yanxuan.nosdn.127.net/5e636b3b18df556a6bcd1abd3f17dd72.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
						</view>
					</swiper-item>
				</swiper>

				<!-- 图标 -->
				<view class="inconList">
					<view class="iconItem" v-for="icon in iconList" :key="icon.desc">
						<image class="iconImg" :src="icon.icon" mode=""></image>
						<text class="iconText">{{ icon.desc }}</text>
					</view>
				</view>

				<!-- category -->
				<view class="categoryList">
					<view class="category" v-for="category in navList" :key="category.L1Id">
						<image class="categoryImg" :src="category.picUrl" mode=""></image>
						<text class="categoryText">{{ category.text }}</text>
					</view>
				</view>

				<Floor v-for="(floor, index) in floorList" :key="index" :floor="floor"></Floor>
			</view>

			<view v-show="currentId !== -1"><Card :currentId="currentId"></Card></view>
		</scroll-view>
	</view>
</template>

<script>
import Floor from './components/Floor/index.vue';
import Card from './components/Card/index.vue';
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'Index',
	data() {
		return {
			currentId: -1
		};
	},
	mounted() {
		this.getIndexData();
	},
	methods: {
		async getIndexData() {
			const result = await this.$store.dispatch('getIndexData');
		}
	},
	computed: {
		...mapGetters(['navList', 'iconList', 'floorList'])
	},
	components: { Floor, Card }
};
</script>

<style lang="stylus">
// 首页
.indexContainer
	height 100%
	// 头部
	.header
		display flex
		align-items center
		height 80rpx
		.logo
			width 120rpx
			height 40rpx
			margin 0 20rpx
		.search
			display flex
			align-items center
			flex 1
			height 60rpx
			box-sizing border-box
			border 2rpx solid #aaa
			.iconfont
				text-align center
				padding 0 10rpx
			.searchInput
				font-size 28rpx
		.btn
			width 140rpx
			height 60rpx
			font-size 28rpx
			text-align center
			line-height 60rpx
			padding 0 10rpx
			margin 0 10rpx
	.navScroll
		display flex
		height 80rpx
		.navItem
			flex-shrink 0
			width 140rpx
			height 80rpx
			font-size 28rpx
			text-align center
			line-height 80rpx
			box-sizing border-box
			&.active
				border-bottom 2rpx solid #dd524d
	.mainScroll
		height calc(100vh - 160rpx)
		.mainSwiper
			image
				width 100%
				height 300rpx
		.inconList
			display flex
			justify-content space-around
			margin-top 10rpx
			.iconItem
				display flex
				align-items center
				.iconImg
					width 32rpx
					height 32rpx
				.iconText
					font-size 28rpx
		.categoryList
			display flex
			flex-wrap wrap
			justify-content space-around
			.category
				width 20%
				display flex
				flex-direction column
				align-items center
				.categoryImg
					width 110rpx
					height 110rpx
					margin 20rpx 0
				.categoryText
					font-size 28rpx
</style>
