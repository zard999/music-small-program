<template>
	<view class="floor">
		<image :src="floor.titlePicUrl" class="floorImg"></image>
		<scroll-view scroll-x="true" enable-flex class="floorScroll">
			<view class="scrollItem" v-for="item in floor.itemList" :key="item.id">
				<image :src="item.primaryPicUrl" class="itemImg"></image>
				<text class="itemText">{{item.name}}</text>
			</view>
			<view class="scrollItem single">查看更多>></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'Floor',
	props: {
		floor:{
			type: Object
		}
	}
};
</script>

<style lang="stylus">
.floor
	.floorImg
		width 100%
		height 350rpx
	.floorScroll
		display flex
		height 300rpx
		.scrollItem
			width 200rpx
			display flex
			flex-direction column
			margin-right 20rpx
			&.single
				flex-shrink 0
				line-height 300rpx
				text-align center
			.itemImg
				width 200rpx
				height 200rpx
			.itemText
				display -webkit-box
				-webkit-box-orient vertical
				-webkit-line-clamp 2
				overflow hidden
				font-size 28rpx
</style>
