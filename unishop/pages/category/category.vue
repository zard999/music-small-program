<template>
	<view class="categoryContainer">
		<view class="header"><view class="search">搜索商品</view></view>

		<view class="main">
			<view class="left">
				<view @click="currentIndex = index" class="item" :class="{active: currentIndex === index}" v-for="(c1, index) in categoryList" :key="index">{{ c1.name }}</view>
			</view>

			<view class="right">
				<scroll-view scroll-y="true" enable-flex class="rightScroll">
					<view class="rightMain">
						<image class="titleImg" :src="currentCategory1.imgUrl" mode=""></image>
						<view class="subCateList">
							<view class="subCate" v-for="(c2) in currentCategory1.subCateList" :key="c2.id">
								<image class="subCateImg" :src="c2.wapBannerUrl" mode=""></image>
								<text class="subCateName">{{c2.name}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			currentIndex: 0
		};
	},
	mounted() {
		this.getCategoryList();
	},
	methods: {
		getCategoryList() {
			this.$store.dispatch('getCategoryList');
		}
	},
	computed: {
		...mapState({
			categoryList: state => state.category.categoryList
		}),
		
		// 计算当前点击的一级分类
		currentCategory1(){
			return this.categoryList[this.currentIndex] || {}
		}
	}
};
</script>

<style lang="stylus">
.categoryContainer
	height 100%
	.header
		height 80rpx
		display flex
		justify-content center
		align-items center
		border-bottom 1rpx solid hotpink
		box-sizing border-box
		.search
			width 90%
			height 60rpx
			background-color #aaa
			text-align center
			line-height 60rpx
			font-size 28rpx
	.main
		display flex
		.left
			width 150rpx
			.item
				width 150rpx
				height 80rpx
				text-align center
				line-height 80rpx
				font-size 28rpx
				&.active
					background-color #007AFF
					border-bottom 1rpx solid hotpink
		.right
			flex 1
			border-left 1rpx solid hotpink
			box-sizing border-box
			.rightScroll
				height calc(100vh - 80rpx)
				.titleImg
					display block
					width 520rpx
					height 190rpx
					margin 20rpx auto
				.subCateList
					display flex
					flex-wrap wrap
					.subCate
						width 33.3333%
						text-align center
						.subCateImg
							width 100%
							height 144rpx
						.subCateName
							font-size 28rpx
							line-height 50rpx
</style>
