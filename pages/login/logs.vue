<template>
	<view class="app">
		<view class="head">
			<image src="../../static/img/home/log.png" mode=""></image>
			<view class="headdiv">
				<view class="dl">
					请先登录
				</view>
				<view class="dlcz">
					登录后才能继续当前操作
				</view>
			</view>
			<view class="btn">
				<!-- <view  @click="wx"></view> -->
				
				<button class="custom-style1" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"  >微信一键登录</button>
				<view class="custom-style" @click="iphon">手机号快捷登录</view>
			</view>
		</view>

		<view class="lxkf">
			<button class="kf" open-type="contact">
				<image src="../../static/img/bar/wx.png" mode=""></image> <text>联系客服</text>
			</button>
		</view>
		<view class="bar" @click="ty">
			点击注册即表示您同意<text>{{tes}}</text>
		</view>
	</view>
</template>

<script>
	
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				tes: '《用户服务协议》',
				openid:'',
				session_key:''
			};
		},
		onLoad() {
             uni.login({
               provider: 'weixin',
               success: function (loginRes) {
                uni.setStorageSync('code',loginRes.code)
               }
             }); 
		},
		created() {
		},
		methods: {
		
			bindGetUserInfo(e){
				console.log(e)
				console.log(11111)
			},
			iphon() {

				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			ty() {
				uni.navigateTo({
					url: '/pages/login/xy'
				});
			},
			
			getPhoneNumber(e) {
				
				const obj = {
					code: uni.getStorageSync('code'),
					ivData:e.detail.iv,
					encrypData:e.detail.encryptedData
				}
				homeApi.wx({js_code: uni.getStorageSync('code'),
					ivData:e.detail.iv,
					encrypData:e.detail.encryptedData}).then(res => {
					console.log(res)
					if(res.code==100){
						   uni.setStorageSync('token',res.data.token)
						   uni.setStorageSync('num',JSON.stringify(res.data.xtdmb))
						uni.switchTab({
							url: '/pages/home/home'
						});
					}else{
						this.$u.toast(`登录失败请重新点击或手机号登录`);
						uni.login({
						  provider: 'weixin',
						  success: function (loginRes) {
						   uni.setStorageSync('code',loginRes.code)
						  }
						}); 
					}
				})
				console.log(e)
			},

			wx() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.kf {
		background-color: transparent !important;
	}

	.kf::after {
		border: none !important;
	}

	.lxkf {
		width: 100%;
		position: fixed;
		bottom: 120rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 25rpx;

		}

		text {
			width: 112rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 40rpx;
			color: rgba(102, 102, 102, 1);
			opacity: 1;
		}
	}

	.bar {
		position: fixed;
		bottom: 48rpx;
		width: 100%;
		text-align: center;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 34rpx;
		color: rgba(124, 196, 87, 1);
		opacity: 1;
		color: #999999;

		text {
			color: #7CC457;
		}
	}

	/deep/.custom-style {
		margin: 0 auto;
		text-align: center;
		line-height: 80rpx;
		width: 542rpx;
		height: 80rpx;
		border: 2rpx solid rgba(124, 196, 87, 1);
		opacity: 1;
		border-radius: 8rpx;
		color: rgba(124, 196, 87, 1);
		font-size: 28rpx;
	}

	/deep/.custom-style1 {
		margin: 0 auto;
		font-size: 28rpx;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		width: 542rpx;
		height: 80rpx;
		background: rgba(124, 196, 87, 1);
		opacity: 1;
		border-radius: 8rpx;
		margin-bottom: 24rpx;
	}

	.app {
		height: 100%;
		position: relative;
	}

	.headdiv {
		margin-top: 48rpx;
		margin-bottom: 128rpx;
	}

	.head {
		position: absolute;
		top: 240rpx;
		width: 100%;
		text-align: center;

		image {
			width: 144rpx;
			height: 144rpx;
		}

		.dl {
			text-align: center;
			width: 100%;
			text-align: center;
			height: 44rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			// line-height:44px;
			color: rgba(51, 51, 51, 1);
			opacity: 1;
			margin-bottom: 20rpx;
		}

		.dlcz {
			text-align: center;
			// width:308rpx;
			width: 100%;
			// height:40px;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;

			// line-height:40px;
			color: rgba(153, 153, 153, 1);
			opacity: 1;
		}
	}
</style>
