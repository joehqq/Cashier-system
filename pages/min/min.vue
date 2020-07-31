<template>
	<view class="app">
		<view class="head" @click="dl">
			<open-data default-avatar='../../static/img/home/log.png' class="ope" type="userAvatarUrl"></open-data>
			<view class="headbox">
					<open-data class='nkname' default-text='欢迎登录' type="userNickName"></open-data>
				<text>
					{{form.num}}
				</text>
			</view>
		</view>
		<view class="bodys">
			<view class="ye" v-if="zhye">
				账户余额
			</view>
			<view class="je" v-if="zhye">
				￥<text>{{zhye}}</text>
			</view>
			<view class="boxs">
				<view class="box">
					<view class="jrsr">
						今日收入
					</view>
					<view class="qian">
						{{allday.day.amount |sr}}
					</view>
				</view>
				<view class="box">
					<view class="jrsr">
						本月收入
					</view>
					<view class="qian">
						{{allday.month.amount |srs}}
					</view>
				</view>
			</view>
		</view>
		<view class="min">
			<view class="minxx">
				我的信息
			</view>
			<u-cell-group>
				<u-cell-item title="我的账号" @click='xgzh' :value="form.company">
					<image slot="icon" style="width: 48rpx; height: 48rpx;margin-right: 24rpx;" src="../../static/img/home/2598.png"
					 mode=""></image>
				</u-cell-item>
				<u-cell-item title="修改手机" :value="form.num" @click='xgsj'>
					<image slot="icon" style="width: 48rpx; height: 48rpx;margin-right: 24rpx;" src="../../static/img/home/2595.png"
					 mode=""></image>
				</u-cell-item>
				<u-cell-item title="收款账号" :value="form.payee" @click='skzh'>
					<image slot="icon" style="width: 48rpx; height: 48rpx;margin-right: 24rpx;" src="../../static/img/home/2594.png"
					 mode=""></image>
				</u-cell-item>
				<u-cell-item title="发票信息" :value="form.fp" @click='fpxx'>
					<image slot="icon" style="width: 48rpx; height: 48rpx;margin-right: 24rpx;" src="../../static/img/home/2596.png"
					 mode=""></image>
				</u-cell-item>
				<u-cell-item title="每日报表" @click='mrbb'>
					<image slot="icon" style="width: 48rpx; height: 48rpx;margin-right: 24rpx;" src="../../static/img/home/2599.png"
					 mode=""></image>
				</u-cell-item>
			</u-cell-group>
		</view>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登陆' content="登录后才能继续当前操作"></u-modal>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		
		data() {
			return {
				zhye:'',
				allday:{
					day:{amount:null},
					month:{amount:null}
				},
				shows:false,
			// {"id":5,"bm":"1","mc":"234234","sm":"234","mobile":"131****8456","openId":"oZCyb5Z2GgAx-OifFcxwUWUyO4Fs","cashOut":99999,"card":"2134","payee":"ljm","company":null,"personInvoiceHead":null,"companyInvoiceHead":null,"companyInvoiceNum":null}
				form: {
					img: '../../static/img/home/log.png',
					num: '请先登录吧~',
					payee:'',
					fpxx:'',
					fp:''
				},
				listabc: [{
										iconPath: "home",
										selectedIconPath: "home-fill",
										text: '首页',
										count: 2,
										isDot: true,
										customIcon: false,
									},
									{
										iconPath: "photo",
										selectedIconPath: "photo-fill",
										text: '放映厅',
										customIcon: false,
									},
									{
										iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
										selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
										text: '发布',
										midButton: true,
										customIcon: false,
									},
									{
										iconPath: "play-right",
										selectedIconPath: "play-right-fill",
										text: '直播',
										customIcon: false,
									},
									{
										iconPath: "account",
										selectedIconPath: "account-fill",
										text: '我的',
										count: 23,
										isDot: false,
										customIcon: false,
									},
								],
								current: 0
			};
		},
		onShow() {
			this.iPhone()
			this.getlists()
			if(uni.getStorageSync('num')){
				const num=JSON.parse(uni.getStorageSync('num'))
				this.form.num=num.mobile
				this.form.company=num.company
				this.form.payee=num.payee
				console.log(this.form)
				if(num.personInvoiceHead){
					this.form.fp=num.personInvoiceHead
				}else if(num.companyInvoiceHead){
					this.form.fp=num.companyInvoiceHead
				}else{
					this.form.fp=''
				}
				
				
			}else{
				this.shows=true
			}
			
		},
		filters:{
			sr(val){
				if(val!=null){
					return val
				}else{
					return ''
				}
			},
			srs(val){
				if(val!=null){
					return val
				}else{
					return ''
				}
			}
		},
		methods: {
			dl() {
				uni.navigateTo({
					url: '/pages/login/logs'
				});
			},
			getlists(){
				if(uni.getStorageSync('num')){
					const objs=JSON.parse(uni.getStorageSync('num'))
					this.zhye=objs.cashOut
					var currTime=new Date()
					var year = currTime.getFullYear();   
					var month = currTime.getMonth() + 1
					var day = currTime.getDate(); 
					homeApi.outam({
						bm:objs.bm,
						month:month,
						year:year,
						day:day
					}).then(res=>{
						this.allday=res.data
					})
				}else{
					this.shows=true
				}
				
			},
			dl(){
				if(uni.getStorageSync('num')){
					
				
				
				}else{
					uni.navigateTo({
						url: '/pages/login/logs'
					});
				}
			},
			xgsj() {
				if(uni.getStorageSync('num')){
					uni.navigateTo({
						url: '/pages/iphon/iphon'
					});
				}else{
					this.shows=true
				}
			},
			xgzh() {
				if(uni.getStorageSync('num')){
					uni.navigateTo({
						url: '/pages/zaH/zhxx/zhxx'
					});
				}else{
					this.shows=true
				}
				
			},
			mrbb() {
				if(uni.getStorageSync('num')){
					uni.navigateTo({
						url: '/pages/baob/baob'
					});
				}else{
					this.shows=true
				}
				
			},
			skzh() {
				if(uni.getStorageSync('num')){
					uni.navigateTo({
						url: '/pages/zaH/zaH'
					});
				}else{
					this.shows=true
				}
				
			},
			fpxx() {
				if(uni.getStorageSync('num')){
					uni.navigateTo({
						url: '/pages/invoice/invoice'
					});
				}else{
					this.shows=true
				}
				
			},
			iPhone() {



			}


		}
	}
</script>

<style scoped lang="scss" >
	/deep/.u-mask-zoom{
		background-color: transparent !important;
	}
	/deep/.u-mode-center-box{
		border:1px solid #E6e6e6;
	}
	.min {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 8rpx 16rpx rgba(51, 51, 51, 0.05);
		opacity: 1;
		border-radius: 16rpx;
		margin-bottom: 130rpx;
	}

	.minxx {
		width: 100%;
		height: 112rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 112rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
		margin-left: 24rpx;
		background: rgba(255, 255, 255, 1);
	}

	.boxs {
		display: flex;
		justify-content: start;
		align-items: center;

		.box {
			width: 50%;
			.jrsr {
				width: 100%;
				height: 34rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 34rpx;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}

			.qian {
				text-align: start;
				width: 100%;
				height: 38rpx;
				font-size: 32rpx;
				font-family: DIN;
				font-weight: 400;
				line-height: 40rpx;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}
		}
	}

	.app {
		padding: 24rpx 24rpx 0;

		.bodys {
			background-image: url(../../static/img/home/bj.png);
			background-size: 100%;
			width: 100%;
			height: 336rpx;
			margin-bottom: 24rpx;
			padding: 48rpx 48rpx 0 48rpx;

			.ye {
				width: 112rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}

			.je {
				margin-bottom: 34rpx;
				color: #fff;
				font-size: 26rpx;

				text {
					width: 100%;
					height: 80rpx;
					font-size: 64rpx;
					font-family: DIN;
					font-weight: 400;
					line-height: 80rpx;
					color: rgba(255, 255, 255, 1);
					opacity: 1;
				}
			}
		}

		.head {
			display: flex;
			justify-content: start;
			align-items: center;
			margin-bottom: 48rpx;

			.ope {
				margin-right: 24rpx;
				width: 128rpx;
				height: 128rpx;
			}

			.headbox {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				view,.nkname {
					width: 100%;
					height: 44rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 44rpx;
					color: rgba(51, 51, 51, 1);
					opacity: 1;
					margin-bottom: 12rpx;
				}

				text {
					display: block;
					width: 100%;
					height: 28rpx;
					font-size: 24rpx;
					font-family: SF Pro Text;
					font-weight: 500;
					line-height: 28rpx;
					color: rgba(51, 51, 51, 1);
					opacity: 1;
				}
			}
		}
	}
</style>
