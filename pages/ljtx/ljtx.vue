<template>
	<view >
		<view class="head">
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
					<view class="gh"  @click="add">
						<u-cell-item  title="绑卡信息" value="去更换"></u-cell-item>
					</view>
					<u-cell-item  title="姓名" :value="form.name" :arrow="false"></u-cell-item>
					<u-cell-item  title="收款账号"  :value="form.card"  :arrow="false"></u-cell-item>
				</u-cell-group>
		</view>
		<view class="boxsbtn">
			<view class="btn">
				立即申请
			</view>
			<text>
				每日自动发起提现到账，预计2小时内到达绑定银行卡
			</text>
		</view>
		
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登陆' content="登录后才能继续当前操作"></u-modal>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				shows:false,
				form:{
					card: "",
					je: '',
					ljje: '',
					name: ""
				}
			};
		},
		methods:{
			add(){
				if(uni.getStorageSync('num')){
				uni.navigateTo({
				    url: '/pages/zaH/zaHupdata/zaHupdata'
				});
				}else{
					this.shows=true
				}
			},
			dl(){
				uni.navigateTo({
				    url: '/pages/login/logs'
				});
			}
		},
	async	onLoad() {
			
			if(uni.getStorageSync('num')){
				const obj=JSON.parse(uni.getStorageSync('num'))
				console.log(obj)
				console.log(obj.card)
				await homeApi.payed({bm:obj.bm}).then(res=>{
					this.form.ljje=res.data.amount
				}) 
				this.form.je=obj.cashOut
				// this.form.ljje=
				this.form.name=obj.payee
				this.form.card=obj.card
				console.log(this.form,111111111111)
			}else{
				this.shows=true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.imgs{
		position: absolute;
		top: 68rpx;
		left: 24rpx;
	}
 .app{
	 padding: 24rpx;
	 box-sizing: border-box;
 }
 .ljje{
	 width:100%;
	 height:34rpx;
	 font-size:24rpx;
	 text-align: center;
	 font-family:PingFang SC;
	 font-weight:500;
	 line-height:34rpx;
	 color:rgba(102,102,102,1);
	 opacity:1;
	 text{
		 width:100%;
		 height:38rpx;
		 font-size:32rpx;
		 font-family:SF Pro Display;
		 font-weight:bold;
		 line-height:38rpx;
		 color:rgba(102,102,102,1);
		 opacity:1;
	 }
 }
 .btn{
	 width:542rpx;
	 height:80rpx;
	 text-align: center;
	 line-height: 80rpx;
	 background:rgba(124,196,87,1);
	 opacity:1;
	 border-radius:8rpx;
	 font-size:28rpx;
	 font-family:PingFang SC;
	 font-weight:500;
	 line-height:80rpx;
	 color:rgba(255,255,255,1);
	 opacity:1;
	margin: 0 auto  48rpx;
 }

 .gh{
	 /deep/.u-cell__value{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(250,77,77,1) !important;
		opacity:1;
	 }
	 /deep/.u-icon__icon{
		 color:rgba(250,77,77,1) !important;
	 }
 }
 .boxsbtn{
	 position: fixed;
	 bottom: 80rpx;
	 left: 50%;
	 width: 100%;
	 transform: translateX(-50%);
	 text{
		 display: block;
		 margin: 0 auto;
		 height:34rpx;
		 text-align: center;
		 font-size:24rpx;
		 font-family:PingFang SC;
		 font-weight:500;
		 line-height:34rpx;
		 color:rgba(153,153,153,1);
		 opacity:1;
	 }
 }
 .je{
	 color:rgba(235,96,15,1);
	 margin-bottom: 24rpx;
	 text-align: center;
	text{
		text-align: center;
		width:100%;
		height:80rpx;
		font-size:64rpx;
		font-family:DIN;
		font-weight:400;
		line-height:80rpx;
		color:rgba(235,96,15,1);
		opacity:1;
	}
 }
 .center{
	 margin: 24rpx auto 0;
	 .txje{
		 margin:  0 auto 14rpx;
		 width:168rpx;
		 height:40rpx;
		 font-size:28rpx;
		 font-family:PingFang SC;
		 font-weight:400;
		 line-height:40rpx;
		 color:rgba(235,96,15,1);
		 opacity:1;
	 }
 }
 .jssq{
	 width:128rpx;
	 height:44rpx;
	 margin-left: 72rpx;
	 font-size:32rpx;
	 font-family:PingFang SC;
	 font-weight:bold;
	 line-height:44rpx;
	 color:rgba(51,51,51,1);
	 opacity:1;
	 display: block;
	 margin-top: 64rpx;
 }
 .head{
	 position: relative;
	 background-image: url(../../static/img/home/ljtx.png);
	 background-size: 100%;
	 width: 100%;
	 height: 440rpx;
 }
</style>
