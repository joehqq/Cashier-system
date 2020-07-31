<template>
	<view class="app">
		<view class="box">
			<view class="head">
				账号信息
			</view>
			<view class="center cents">
				<view class="tt">
					姓名
				</view>
				<text>
					{{texts}}
				</text>
			</view>
			<view class="center">
				<view class="tt">
					收款账号
				</view>
				<text>
					{{zh}}
				</text>
			</view>
		</view>
		<view class="btn" @click="gohome">
			去修改/添加
			
		</view>
		<view class="btntexts">
			仅支持浦发银行储蓄卡，开卡请联系浦发银行
		</view>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				texts:'',
				zh:''
			};
		},
		onShow() {
			if(uni.getStorageSync('num')){
				const shyc =JSON.parse(uni.getStorageSync('num'))
				// uni.getStorageSync('num')
				this.texts=shyc.payee
				this.zh=shyc.card
			}
		},
		methods:{
			gohome(){
				console.log(111)
				uni.navigateTo({
				  url: '/pages/zaH/zaHupdata/zaHupdata'
				});
				// uni.redirectTo({
				//     url: '/pages/home/home'
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btntexts{
		width:100%;
		text-align: center;
		margin-top: 48rpx;
		height:34rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:34rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
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
	.center{
		padding: 28rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.tt{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
			opacity:1;
		}
		text{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			opacity:1;
		}
	}
.box{
	position: relative;
	
	margin: 5rpx auto;
	width:702rpx;
	padding: 20rpx 24rpx 0;
	height:300rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 2rpx 12rpx rgba(0,0,0,0.08);
	opacity:1;
	border-radius:16rpx;
	.cents{
		margin-top: 80rpx;
		border-bottom: 1px #E6E6E6 solid;
	}
	.head{
		position: absolute;
		top: 20rpx;
		left: 24rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		// line-height:40px;
		color:rgba(51,51,51,1);
		opacity:1;
		// height: 80rpx;
	}
}
</style>
