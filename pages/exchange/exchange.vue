<template>
	<view class="app">
		<image class="img" src="../../static/img/home/cg.png" mode=""></image>
		<view class="tx">
			提现成功
		</view>
		<view class="qx">
			所提现金额将在2小时内到账
		</view>
		<view class="btn" @click="gohome">
			回到首页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gohome(){
				console.log(111)
				uni.switchTab({
				  url: '/pages/home/home'
				});
				// uni.redirectTo({
				//     url: '/pages/home/home'
				// });
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn{
		
		width:544rpx;
		height:80rpx;
		background:rgba(124,196,87,1);
		opacity:1;
		margin: 384rpx auto 0;
		border-radius:8rpx;
		text-align: center;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:80rpx;
		color:rgba(255,255,255,1);
		opacity:1;
	}
.img{
	display: block;
	margin: 36rpx auto  34rpx;
	width: 300rpx;
	height: 300rpx;
}
.tx{
	text-align:  center;
	width:100%;
	height:44rpx;
	font-size:32rpx;
	font-family:PingFang SC;
	font-weight:500;
	line-height:44rpx;
	color:rgba(51,51,51,1);
	opacity:1;
	margin-bottom: 12rpx;
}
.qx{
	text-align:  center;
	width:100%;
	height:40rpx;
	font-size:28rpx;
	font-family:PingFang SC;
	font-weight:400;
	line-height:40rpx;
	color:rgba(153,153,153,1);
	opacity:1;
}
</style>
