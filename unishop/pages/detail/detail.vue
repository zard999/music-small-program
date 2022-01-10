<template>
	<view class="detailContainer">
		<view class="header">
			<icon class="iconfont icon-shouye2"></icon>
			<text>网易严选</text>
			<view class="shopCart">
				<icon class="iconfont icon-gouwuche2"></icon>
				<text class="count">1</text>
			</view>
		</view>

		<!-- 内容区 -->
		<scroll-view class="content" scroll-y="true">
			<image class="detailImg" :src="goodsInfo.listPicUrl" mode=""></image>
			<view class="tag">{{ goodsInfo.promTag }}</view>
			<text class="price">￥ {{ goodsInfo.retailPrice }}</text>
			<view class="info">{{ goodsInfo.name }}</view>

			<!-- 准备内容 -->
			<view class="list" style="margin-left: 5%;font-size: 28upx;line-height: 50upx;">
				<view>1) 100%桑蚕丝填充，丝丝精粹不掺杂</view>
				<view>2) 创新井字拉网工艺，桑蚕丝不易黏连结块</view>
				<view>3) 两种面料可选，贡缎手感细腻，竹棉清爽透气</view>
				<view>4) AB双面设计，多种活性印花不易褪色</view>
			</view>
		</scroll-view>

		<!-- 底部导航 -->
		<view class="detailFooter">
			<image
				class="service"
				src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/detail-kefu-d10f0489d2.png?imageView&type=webp"
				mode=""
			></image>
			<view class="btn buyNow">立即购买</view>
			<view class="btn addShopCart" @click="addShopCart">加入购物车</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
export default {
	data() {
		return {
			goodsInfo: {}
		};
	},
	// 第一种写法：路由传参必须去这里拿
	// onLoad(options) {
	// 	this.goodsInfo = JSON.parse(options.goodsInfo)
	// },

	// 第二种写法：存储方案
	mounted() {
		this.goodsInfo = wx.getStorageSync('goodsInfo_key');
	},

	methods: {
		// 点击添加购物车
		addShopCart() {
			// 首先判断购物车列表里面是否有当前商品数据
			let obj = this.cartList.find(item=>item.id === this.goodsInfo.id);
			// 如果有，直接修改数量
			if (obj) {
				// 修改的不是cartList，可以不用dispatch
				obj.count++
				// 有可能不是true，所以要变为true
				obj.isChecked = true
			} else {
				// 如果没有，将当前详情商品数据变为购物车数据，添加到购物车数据
				obj = this.goodsInfo
				this.$set(obj, 'count', 1)
				this.$set(obj, 'isChecked', true)
				// 小程序的push并不能让不是响应式的变为响应式，所以必须用$set
				this.cartList.push(obj)
			}
		}
	},

	computed: {
		...mapState({
			cartList: state => state.cart.cartList
		})
	}
};
</script>

<style lang="stylus">
.detailContainer
	width 100%
	display flex
	flex-direction column
	.header
		height 90upx
		line-height 90upx
		background #FFFFFF
		display flex
		text-align center
		.iconfont
			width 90upx
			height 90upx
			font-size 50upx
		text
			flex 1
		.shopCart
			position relative
			.count
				color red
				position absolute
				top -25upx
				right 5upx
				font-size 26upx
	.content
		height calc(100vh - 190upx)
		.detailImg
			width 100%
			height 750upx
		.tag
			width 90%
			height 100upx
			line-height 100upx
			text-align center
			font-size 32upx
			color #FFFFFF
			margin 20upx auto
			background #BB2C08
			border-radius 10upx
		.price
			font-size 50upx
			color #DD1A21
			line-height 70upx
			margin-left 5%
		.info
			font-size 28upx
			color #333
			margin-left 5%
	.detailFooter
		position fixed
		bottom 0
		left 0
		height 100upx
		line-height 100upx
		border-top 1upx solid #EEEEEE
		display flex
		background #fff
		.service
			width 60upx
			height 60upx
			margin 20upx 40upx
		.btn
			width 305upx
			height 100%
			text-align center
			font-size 28upx
			&.buyNow
				color #333
				border-left 1upx solid #eee
			&.addShopCart
				background #DD1A21
				color #fff
</style>
