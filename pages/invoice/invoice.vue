<template>
	<view class="app">
		<view v-if="!fp">
			<view class="box" v-if="gs">
				<view class="head">
					企业发票
				</view>
				<view class="center cents">
					<view class="tt">
						发票抬头
					</view>
					<text>
						{{texts}}
					</text>
				</view>
				<view class="center">
					<view class="tt">
						税号
					</view>
					<text>
						{{sh}}
					</text>
				</view>
			</view>
			<view class="box boxs1" v-if="ry">
				<view class="head">
					个人发票
				</view>
				<view class="center cents">
					<view class="tt">
						发票抬头
					</view>
					<text>
						{{texts}}
					</text>
				</view>
			</view>
			<view class="btn" @click="gohome">
				去修改
			</view>
		</view>
		<view  class='imgbox' v-if="fp">
			<image src="../../static/img/home/fpzw.png" mode=""></image>
			<view class="zw">
				暂无开票信息
			</view>
			<view class="xm">
				小MO不知道开票到哪里呢~
			</view>
			<view class="qsz" @click="gohome">
				去设置
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				texts:'',
				sh:'',
				ry:false,
				fp:false,
				gs:false
			};
		},
		onShow() {
			const obj=JSON.parse(uni.getStorageSync('num'))
			
			if(obj.personInvoiceHead){
				this.ry=true
				this.texts=obj.personInvoiceHead
			}else if(obj.companyInvoiceHead){
				this.gs=true
				this.texts=obj.companyInvoiceHead
			}else{
				this.texts=''
				this.fp=true
			}
			console.log(obj,'ry')
			this.sh=obj.companyInvoiceNum==null?'':obj.companyInvoiceNum
		},
		methods:{
			gohome(){
				uni.redirectTo({
				  url: '/pages/invoice/invoices/invoices'
				});
				// uni.redirectTo({
				//     url: '/pages/home/home'
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			width: 160rpx;
		}
		text{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			opacity:1; 	overflow: hidden; /*自动隐藏文字*/
		
		text-overflow: ellipsis;/*文字隐藏后添加省略号*/
		
		white-space: nowrap;/*强制不换行*/
		}
	}
	.boxs1{
		height:198rpx !important;
		.cents{
			border-bottom: none   !important;
		}
	}
	.imgbox{
		image{
			width: 300rpx;
			height: 260rpx;
			display: block;
			margin: 206rpx auto 54rpx;
		}
		.zw{
			width:100%;
			height:40rpx;
			text-align: center;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:400;
			line-height:32rpx;
			color:rgba(51,51,51,1);
			opacity:1;
			margin: 0 auto 8rpx;
		}
		.qsz{
			width:100%;			font-size:24rpx;	color: #7CC457;		text-align: center;
		}
		.xm{
		width:100%;
			height:78rpx;
			font-size:24rpx;
			text-align: center;
			font-family:PingFang SC;
			font-weight:400;
			line-height:22rpx;
			color:#999999;
			opacity:1;
			margin-bottom:10rpx ;
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
