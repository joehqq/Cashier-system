<template>
	<view>
		<view class="head">
			<image class="headbg" src="../../static/img/home/ljtx.png" mode=""></image>
			<view style="overflow: hidden;">
				<image class="imgs" style="width: 8rpx;height: 40rpx;" src="../../static/img/home/jx.png" mode=""></image>
				<text class="jssq">极速申请</text>
			</view>
			<view class="center">
				<view class="txje">
					提现金额(元)
				</view>
				<view class="je">
					¥<text>{{form.je}}</text>
				</view>
				<view class="ljje">
					已累计提现金额 : <text>¥ {{form.ljje}}</text>
				</view>
			</view>
		</view>
		<view class="app">

			<u-cell-group>
				<view class="gh" @click="add">
					<u-cell-item title="绑卡信息" value="去更换"></u-cell-item>
				</view>
				<view class="gnm">
					<u-cell-item title="姓名" :value="form.name" :arrow="false"></u-cell-item>
				</view>
				<view class="asg">
					<u-cell-item title="收款账号" :value="form.card" :arrow="false"></u-cell-item>
				</view>
			</u-cell-group>
		</view>
		<view class="boxsbtn">
			<view class="btn" @click="starttx">
				立即申请
			</view>
			<text>
				每日自动发起提现到账，预计2小时内到达绑定银行卡
			</text>
		</view>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登录' content="登录后才能继续当前操作"></u-modal>
		<view class="boxzz" v-if="show">
			<u-loading class="ddjz" :show="show" mode="circle"></u-loading>
		</view>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				shows: false,
				show: false,
				form: {
					card: "",
					je: '',
					ljje: '',
					name: ""
				}
			};
		},
		methods: {
			 starttx() {
				 if(this.form.je==0){
					 this.$u.toast('当前账户余额为0');
				 }else{
					 this.show = true
					 const obj = JSON.parse(uni.getStorageSync('num'))
					 homeApi.ljtx(JSON.stringify({
					 	id: obj.id
					 })).then(res => {
					 	if (res.code == 100) {
					 		this.getlist();
					 		this.show = false
					 		this.$u.toast(res.message);
						}else {
							// 提现失败, 错误码(你定义一个),请联系客服
					 		this.$u.toast(res.message);
					 		this.show = false
					 	}
					 
					 })
				 }
				
			},
			add() {
				if (uni.getStorageSync('num')) {
					uni.navigateTo({
						url: '/pages/zaH/zaHupdata/zaHupdata'
					});
				} else {
					this.shows = true
				}
			},
		async	getlist() {
				if (uni.getStorageSync('num')) {
					const obj = JSON.parse(uni.getStorageSync('num'))
					await homeApi.businesstxjs({
						id: obj.id
					}).then(res => {
						this.form.je = res.data.cashOut == null ? 0 : res.data.cashOut
						this.form.card = res.data.card == null ? '' :
							`浦发银行 [${res.data.card.slice(res.data.card.length-4,res.data.card.length)}]`
						this.form.name = res.data.payee == null ? '' : res.data.payee
					})
					
					await homeApi.letxje({
						id: obj.id
					}).then(res => {
						this.form.ljje = res.data.total == null ? 0 : res.data.total
					})
				} else {
					this.shows = true
				}
			},
			dl() {
				uni.navigateTo({
					url: '/pages/login/logs'
				});
			}
		},
		 onShow() {
			this.getlist()
		}
	}
</script>

<style lang="scss" scoped>
	.asg {
		/deep/.u-cell__value {
			color: #333333 !important;
		}

		/deep/.u-cell {
			padding: 22rpx 0 !important;
			color: #333333 !important;
			font-size: 28rpx !important;
		}
	}

	.imgs {
		position: absolute;
		top: 68rpx;
		left: 30rpx;
		z-index: 999;
	}

	.app {
		width: 702rpx;
		margin: 0 auto;
		padding: 0 24rpx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 16rpx;
	}

	.gnm {
		/deep/.u-cell {
			padding: 22rpx 0 !important;
			border-bottom: 1rpx #f3f3f3 solid;
			color: #333333 !important;
			font-size: 28rpx !important;
			border-top: 1rpx #f3f3f3 solid;
		}

		/deep/.u-cell__value {
			color: #333333 !important;
			font-size: 28rpx !important;
		}
	}

	/deep/.u-border-bottom:after {
		border-bottom-width: 0rpx !important;
	}

	.ljje {
		width: 100%;
		height: 34rpx;
		font-size: 24rpx;
		text-align: center;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 34rpx;
		color: rgba(102, 102, 102, 1);
		opacity: 1;

		text {
			width: 100%;
			height: 38rpx;
			font-size: 32rpx;
			font-family: dinbold;
			font-weight: bold;
			line-height: 38rpx;
			color: rgba(102, 102, 102, 1);
			opacity: 1;
		}
	}

	.btn {
		width: 542rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background: rgba(124, 196, 87, 1);
		opacity: 1;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 80rpx;
		color: rgba(255, 255, 255, 1);
		opacity: 1;
		margin: 0 auto 48rpx;
	}

	/deep/.u-cell {
		padding: 20rpx 0 !important;
	}

	.gh {

		// margin-bottom: 20rpx;
		/deep/.u-cell__value {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(250, 77, 77, 1) !important;
			opacity: 1;

		}

		/deep/.u-cell {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333 !important;
			opacity: 1;
			padding: 22rpx 0 !important;
		}

		/deep/.u-icon__icon {
			color: rgba(250, 77, 77, 1) !important;
		}
	}

	.ddjz {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.boxsbtn {
		position: fixed;
		bottom: 80rpx;
		left: 50%;
		width: 100%;
		transform: translateX(-50%);

		text {
			display: block;
			margin: 0 auto;
			height: 34rpx;
			text-align: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 34rpx;
			color: rgba(153, 153, 153, 1);
			opacity: 1;
		}
	}

	.je {
		color: rgba(235, 96, 15, 1);
		margin-bottom: 24rpx;
		text-align: center;

		text {
			margin-left: 5rpx;
			text-align: center;
			width: 100%;
			height: 80rpx;
			font-size: 64rpx;
			font-family: dinbold;
			font-weight: 400;
			line-height: 80rpx;
			color: rgba(235, 96, 15, 1);
			opacity: 1;
		}
	}

	.boxzz {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 99;
	}

	.center {
		margin: 24rpx auto 0;
		z-index: 99;
		position: relative;

		.txje {
			margin: 0 auto 14rpx;
			width: 168rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 40rpx;
			color: rgba(235, 96, 15, 1);
			opacity: 1;
		}
	}

	.jssq {
		width: 128rpx;
		height: 44rpx;
		margin-left: 72rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 44rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
		display: block;
		margin-top: 64rpx;
	}

	.headbg {
		width: 100%;
		height: 440rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.head {
		z-index: 9;
		position: relative;
		background-size: 100%;
		width: 100%;
		height: 440rpx;
	}
</style>
