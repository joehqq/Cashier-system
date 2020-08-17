<template>
	<view class="app">
		<view class="box">
			<view class="head">
				<view :style="{'color':datas}">
					{{form.status |titlefl}}
				</view>
				{{form.status |titles}}
				</text>
			</view>
			<view class="boxse">
				<view class="txje">
					<text>提现金额 :</text>  <view >
						¥ {{form.bsGet}}
					</view>
				</view>
				<view class="txje">
					<text>提现单号 :</text> <view >
						 {{form.xslsh}}
					</view>
				</view>
				<view class="txje" :class="form.sprq?'':'nons'">
					<text>申请时间 :</text>  <view >
						{{form.createTime}}
					</view>
				</view>
				<view class="txje nons" v-if="form.sprq">
					<text>审核时间 :</text> <view >
						 {{form.sprq}}
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="gohome">
			回到首页
		</view>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				form:{
					
				}
			};
		},
		filters:{
			
			titles(val){
				
			 if (val == 0) {
			 	return '提现金额失败，请重新申请'
			 } else if(val==1){
			 	return '提现金额已到达指定账户'
			 }else{
			 	return '加速审核中,请耐心等待'
			 }
			},
			titlefl(val){
				if (val == 0) {
					return '提现失败'
				} else if(val==1){
					return '提现成功'
				}else{
					return '审核中'
				}
			} 
		},
		onLoad(val) {
				homeApi.txxq({id:val.id}).then(res=>{
					this.form=res.data
				})
				
		},
		methods:{
			gohome(){
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
		computed:{
			datas(){
				if (this.form.status == 2) {
					return '#333333'
				} else if(this.form.status==1){
					return '#7CC457'
				}else{
					return '#FA4D4D'
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.btn{
		position: fixed;
		bottom: 298rpx;
		left: 50%;
		transform: translateX(-50%);
		width:544rpx;
		height:80rpx;
		background:rgba(124,196,87,1);
		opacity:1;
		border-radius:8rpx;
		text-align: center;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:80rpx;
		color:rgba(255,255,255,1);
		opacity:1;
	}
	
	.app{
			 padding: 24rpx;
			 box-sizing: border-box;
	}
	.nons{
		border-bottom: none !important;
	}
	.boxse{
		box-sizing: border-box;
		padding: 0 24rpx;
		.txje{
			height: 96rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			border-bottom: 1px solid #e6e6e6;
			text{
				width:205rpx;
				height:40rpx;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				line-height:40rpx;
				color:rgba(153,153,153,1);
				opacity:1;
			}
			view{
				width:100%;
				height:40rpx;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				line-height:40rpx;
				color:rgba(51,51,51,1);
				opacity:1;
			}
		}
	}
	.box{
		width:100%;
		background:rgba(255,255,255,1);
		box-shadow:0px 2rpx 12rpx rgba(0,0,0,0.08);
		opacity:1;
		border-radius:16rpx;
	}
	.head{
		overflow: hidden;
		width: 100%;
		margin-top: 24rpx;
		height: 264rpx;
		text-align: center;
		background-image: url(../../static/img/home/dttx.png);
		background-size: 100%;
		view{
			margin-top: 48rpx;
			width:100%;
			margin-bottom: 16rpx;

			text-align: center;
			height:56rpx;
			font-size:40rpx;
			font-family:PingFang SC;
			font-weight:bold;
			line-height:56rpx;
			opacity:1;
		}
		text{
			display: block;
			margin-top:24rpx ;
			width:100%;
			height:44rpx;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:500;
			line-height:44rpx;
			color:rgba(51,51,51,1);
			opacity:1;
		}
	}
</style>
