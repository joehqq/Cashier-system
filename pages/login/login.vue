<template>
	<view class="login">
	   <view class="head">
			<image src="../../static/img/home/log.png" mode=""></image>
			<view >
				洪湾渔港
			</view>
			<text>登录后才能继续当前操作</text>
	   </view>
	   <view class="center">
	   	<text>手机号</text>
		<u-input v-model="value" placeholder='请输入手机号' :clearable='false' :type="type" :border="border" />
	   </view>
	   <view class="center">
	   	<text>验证码</text>
	   		<u-input :clearable='false' placeholder='请输入验证码' v-model="values" :type="type" :border="border" />
			<view class="wrap">
					<u-toast ref="uToast"></u-toast>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
					@change="codeChange"></u-verification-code>
					<view class="btnqq" @click="getCode">{{tips}}</view>
				</view>
	   </view>
	   <view class="endbtn" @click="dl">
	   	注册/登录
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
				value:'',
				tips: '',
				tes:'《用户服务协议》',
				texts:'确认认证',
				values: '',
				seconds: 20,
				code: '',
				codeText: ''
			};
		},
		methods: {
			dl(){
				if(this.value!=''&&this.values!=''){
					
				const uuid=uni.getStorageSync('uuid')
				const obj={
					mobile:this.value,
					code:this.values,
					uuid:uuid,
					js_code:uni.getStorageSync('code')
				}
				console.log(obj)
				homeApi.login(JSON.stringify(obj)).then(res=>{
					console.log(res)
					if(res.code==100){
						uni.setStorageSync('token',res.data.token)
						uni.setStorageSync('num',JSON.stringify(res.data.businessInfo))
					uni.switchTab({
						  url: '/pages/home/home'
					})
					}else{
						this.$u.toast(`${res.message}`);
					}
				})
				}
			},
			ty(){
				uni.navigateTo({
				    url: '/pages/login/xy'
				});
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.value==''){
					this.$u.toast('请输入手机号码');
					
				} else if(!(/^1[3456789]\d{9}$/.test(this.value))){
					this.$u.toast('请输入正确手机号码');
				} else{
				console.log(this.$refs.uCode.canGetCode)
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
						homeApi.yzm({mobile:this.value}).then(res=>{
							uni.setStorageSync('uuid',res.data)
							this.$refs.uCode.start();
						})
				} else {
					this.$u.toast('请耐心等待');
				}
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('验证码已发送请注意查收');
			}
			// ,
			// getcode() {
			
			// }

		},
		components: {

		},
		mounted() {

		}
		
	}
</script>

<style lang="scss" scoped>
	/deep/.u-input__input{
		margin-right: 0 !important;
	}
	.bar{
		width:100%;
		margin-top: 50rpx;
		text-align: center;
		height:34rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:34rpx;
		color:rgba(124,196,87,1);
		opacity:1;
		color:#999999;
		text{
		color:#7CC457;
		}
	}
	.zcend{
		display: flex;
		align-items: center;
		view{
			width:432px;
			height:34px;
			font-size:24px;
			font-family:PingFang SC;
			font-weight:400;
			line-height:34px;
			color:rgba(124,196,87,1);
			opacity:1;
		}
	}
	.endbtn{
		margin-top: 92rpx;
		margin: 92rpx auto 0;
		width:542rpx;
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
	.btnqq{
		width:176rpx;
		height:64rpx;
		background:rgba(255,255,255,1);
		border:2rpx solid rgba(124,196,87,1);
		opacity:1;
		border-radius:16rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		text-align: center;
		line-height:64rpx;
		color:rgba(124,196,87,1);
		opacity:1;
	}
 .login{
	 padding:0 48rpx 0;
	 box-sizing: border-box;
 }
 .center{
	 width: 654rpx;
	 height: 122rpx;
	 margin: 0 auto;
	 display: flex;
	 align-items: center;
	 text{
		 height:48rpx;
		 font-size:34rpx;
		 font-family:PingFang SC;
		 font-weight:400;
		 line-height:48rpx;
		 color:rgba(0,0,0,1);
		 opacity:1;
		 display: block;
		 margin-right: 30rpx;
	 }
	 
 }
 .head{
	 image{
		 display: block;
		 margin: 174rpx auto 48rpx;
		 width: 144rpx;
		 height: 144rpx;
	 }
	 view{
		 width:100%;
		 text-align: center;
		 height:44rpx;
		 font-size:32rpx;
		 font-family:PingFang SC;
		 font-weight:500;
		 margin-bottom: 20rpx;
		 line-height:44rpx;
		 color:rgba(51,51,51,1);
		 opacity:1;
	 }
	 text{
		 display: block;
		 width:100%;
		 text-align: center;
		 height:40rpx;
		 font-size:28rpx;
		 font-family:PingFang SC;
		 font-weight:400;
		 line-height:40rpx;
		 color:rgba(153,153,153,1);
		 opacity:1;
		 margin-bottom: 76rpx;
	 }
 }
</style>
