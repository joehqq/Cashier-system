<template>
	<view class="app">

		<view class="box">
			<view class="head">
				<view class="gr" :class="type==1?'font':''"  @click="gr">
				<text  :class="type==1?'':'grays'" >1</text>	验证原号码
				</view>
				<view class="gr " :class="type==2?'font':''"  @click="qy">
				<text :class="type==2?'':'grays'">2</text>	绑定新号码
				</view>
			</view>
			<view class="center" >
				<view class="btnsyzm">
					<view class="ipnum" v-if="type==1">
						{{iphon}}
					</view>
					<u-input v-else placeholder='请输入新手机号' v-model="mobile" :type="type" />
					<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
						<view class="btnqq" @click="getCode">{{tips}}</view>
					</view>
				</view>
				<u-input style="margin-left: 24rpx;" placeholder='请输入验证码' v-model="mobiles" :type="type" />
			</view>
			<view class="lins">
				
			</view>
		</view>
			<u-button  class="btn" @click="gohome"  :ripple="true">{{texts}}</u-button>
	
		<view class="endcalss">
			手机号修改成功后需使用新号码登录
		</view>
		<view class="lxkf">
			<button class="kf" open-type="contact">
				<image src="../../static/img/bar/wx.png" mode=""></image> <text>联系客服</text>
			</button>
		</view>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {

		data() {
			return {
				tips: '',
				texts: '确认认证',
				// refCode: null,
				iphon:'',
				seconds: 60,
				code: '',
				codeText: '',
				xgcg: false,
				mobile: '',
				mobiles: '',
				type: 1

			};
		},
		onShow() {
			const num = JSON.parse(uni.getStorageSync('num'))
			this.iphon=num.mobile
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				const num = JSON.parse(uni.getStorageSync('num'))
				
				if (this.type == 1) {
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: '正在获取验证码'
						})
						homeApi.yzms({
							id: num.id
						}).then(res => {
							if(res.code==100){
								uni.setStorageSync('uuid', res.data)
							}else{
								this.$u.toast(res.message);
							}
							this.$refs.uCode.start();
						})
					} else {
						this.$u.toast('请耐心等待');
					}
				} else {

					if (this.mobile == '') {
						this.$u.toast('请输入手机号码');

					} else if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
						this.$u.toast('请输入正确手机号码');
					} else {
						if (this.$refs.uCode.canGetCode) {
							// 模拟向后端请求验证码
							uni.showLoading({
								title: '正在获取验证码'
							})
							homeApi.mobile({
								mobile: this.mobile
							}).then(res => {
								if(res.code==100){
									uni.setStorageSync('uuid', res.data)
								}else{
									this.$u.toast(res.message);
								}
								this.$refs.uCode.start();
							
							})
						} else {
							this.$u.toast('请耐心等待');
						}
					}
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('验证码已发送请注意查收');
			},
			gr() {

				this.mobile = ''
				this.mobiles = ''
			},
			qy() {
				this.mobiles = ''

				this.mobile = ''
			},
			gohome() {
			if(this.type==1){
				if(this.mobiles!=''){
						let user=JSON.parse(uni.getStorageSync('num'))
					const obj={
							id:user.id,
							code:this.mobiles
						}
					homeApi.update(JSON.stringify(obj)).then(res=>{
						if(res.code==100){
							this.type=2
							this.$refs.uCode.reset();
							this.$u.toast('操作成功,请输入新手机号');
							this.mobiles=''
						}else{
								this.$u.toast(res.message);
						}
					})
				}else{
					this.$u.toast('请输入验证码');
				}
			}else{
				this.texts='确认修改'
				let user=JSON.parse(uni.getStorageSync('num'))
				if(this.mobile==''||this.mobiles==''){
					this.$u.toast('请输入完整手机号或验证码');
				}else{
					const obj={
						id:user.id,
						code:this.mobiles,
						uuid:uni.getStorageSync('uuid'),
						mobile:this.mobile
					}
					homeApi.updatemobile(JSON.stringify(obj)).then(res=>{
						if(res.code==100){
							var tel = this.mobile;
							tel = "" + tel;
							user.mobile = tel.substr(0,3) + "****" + tel.substr(7)
							uni.setStorageSync('num',JSON.stringify(user))
							this.$u.toast('修改成功');
							uni.switchTab({
							  url: '/pages/home/home'
							});
							
						}else{
								this.$u.toast(res.message);
						}
					})
				}
			}



				// uni.redirectTo({
				//   url: '/pages/invoice/invoices/invoices'
				// });
				// uni.redirectTo({
				//     url: '/pages/home/home'
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		margin-right: 24rpx;
	}
	/deep/u-input{
		margin-left: 0 !important;
	}
	.center{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 24rpx;
		box-sizing: border-box;
		overflow: hidden;
		width:702rpx;
		height:224rpx;
		margin:  0 auto;
		background:rgba(255,255,255,1);
		box-shadow:0px 2rpx 12rpx rgba(0,0,0,0.08);
		opacity:1;
		border-radius:16rpx;
	}
	.font{
		font-weight: bold !important;
	}
	.lxkf {
		width: 100%;
		position: fixed;
		bottom: 48rpx;
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
	.kf {
		background-color: transparent !important;
		display: flex;
		align-items: center;
	}

	.kf::after {
		border: none !important;
	}
	/deep/.u-input__input{
		margin-left: 24rpx;

	}
	.grays{
		
		background-color: #fff !important;
		border: 1px solid #999999 !important;
		color: #999999 !important;
		box-sizing: border-box !important;
			line-height: 47rpx !important;
	}
	/deep/.u-btn--default{
		background-color:rgba(124,196,87,1) !important;
		color: #fff !important;
	}
	.btnqq {
		width: 176rpx;
		height: 64rpx;
		background: rgba(255, 255, 255, 1);
		border: 2rpx solid rgba(124, 196, 87, 1);
		opacity: 1;
		border-radius: 16rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		text-align: center;
		line-height: 64rpx;
		color: rgba(124, 196, 87, 1);
		opacity: 1;
	}

	.endcalss {
		width: 384rpx;
		height: 34rpx;
		position: fixed;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 34rpx;
		color: rgba(153, 153, 153, 1);
		opacity: 1;
		bottom: 200rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.ipnum {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		// line-height: 40rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
		margin-left: 26rpx !important;
	}

	.btnsyzm {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		// height: 112rpx;
		background: rgba(255, 255, 255, 1);
	}

	.u-input__input {
		margin-left: 26rpx !important;
	}

	.tsbox {
		width: 360rpx;
		height: 112rpx;
		background: rgba(17, 17, 17, 1);
		opacity: 0.7;
		text-align: center;
		line-height: 112rpx;
		border-radius: 10rpx;
		position: fixed;
		top: 580rpx;
		color: #FFFFFF;
		left: 50%;
		transform: translateX(-50%);
	}
	/deep/.u-input{
		margin-right: 48rpx;
	}
	.btn {
		position: fixed;
		bottom: 298rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 544rpx;
		height: 80rpx;
		background: rgba(124, 196, 87, 1);
		opacity: 1;
		border-radius: 8rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 80rpx;
		color: rgba(255, 255, 255, 1);
		opacity: 1;
	}

	.add {

		box-shadow: 0px 0rpx 0rpx rgba(0, 0, 0, 0.08) !important;
		border-radius: 0 !important;
		background-color: #fff !important;
	}

	.gr {
		background-color: #F9F9F9;
		width: 50%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		// font-weight: bold;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
		height: 80rpx;
		line-height: 80rpx;
		text{
			font-family: dinbold;
			width: 48rpx;
			height: 48rpx;
			color: #fff;
			text-align: center;
			line-height: 48rpx;
			background-color:#7CC457 ;
			margin-right:10rpx ;
			border-radius: 50%;
		}
	}

	.head {
	height:80rpx;
	background:rgba(249,249,249,1);
	opacity:0.8;
	border-radius:16rpx 16rpx 0px 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 12rpx;
	}

	/deep/.u-field {
		padding: 30rpx 28rpx !important;

	}

	.box {
		position: relative;
		.lins{
		position: absolute;
		width: 654rpx;
		height: 2rpx;
		top: 200rpx;
		left: 48rpx;
		background-color:#F3F3F3;

		}
		
	}
</style>
