<template>
	<view class="app">
		<view class="head">
			<view class="headtext">
				今日收入(元)
			</view>
			<view class="qian" >
				<text v-if="form.now">￥</text> {{form.now}}


			</view>
			<view class="foot">
				<view class="mok">
					<text>
						{{form.sevenDays}}
					</text>
					<view>
						近7日收入
					</view>
				</view>
				<view class="mok">
					<text>
						{{form.thirtyDays}}
					</text>
					<view>
						近30日收入
					</view>
				</view>
				<view class="mok">
					<text>
						{{form.amount}}
					</text>
					<view>
						可提现收益
					</view>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="fistbox">
				<view class="txbox" @click="ljtx">
					<image src="../../static/img/home/tx.png" mode=""></image>
					<text>立即提现</text>
				</view>
				<view class="txbox" @click="txjl">
					<image src="../../static/img/home/jl.png" mode=""></image>
					<text>提现记录</text>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="centr">
				<u-tabs class="dx" :list="list" inactive-color='black' active-color='black' :is-scroll="false" :current="current" @change="change"></u-tabs>
				<view class="lin">
				</view>
				<view v-if="current==1" class="mx" v-for="(item,index) in srlist" :key='index'  @click="add(item.id,2)">
					<view class="xxxr">
						<view class="leftbox">
							<view class="xxxr-text">
								销售收入
							</view>
							<view class="times">
								{{item.xsrq}}
							</view>
							<view class="orderid">
								订单编号:{{item.xslsh}}
							</view>
						</view>
						<view class="rightbox">
							<text>+{{item.zkze}}</text>
							<image src="../../static/img/home/y.png" mode=""></image>
						</view>
					</view>
				</view>
				<view v-if="current==2" class="mx" v-for="(item,index) in zclist"  :key='index'  @click="add(item.id,1)">
					<view class="xxxr">
						<view class="leftbox">
							<view class="xxxr-text">
								提现
							</view>
							<view class="times">
								{{item.xsrq}}
							</view>
							<view class="orderid">
								订单编号:{{item.xslsh}}
							</view>
						</view>
						<view class="rightbox">
							<text class="reds">-{{item.zkze}}</text>
							<image src="../../static/img/home/y.png" mode=""></image>
						</view>
					</view>
				</view>
				<view v-if="current==0" class="mx" v-for="(item,index) in alllist" :key='index' @click="add(item.id,item.type)">
					<view class="xxxr">
						<view class="leftbox">
							<view class="xxxr-text">
								{{item.type==1?'销售收入':'提现'}}
							</view>
							<view class="times">
								{{item.xsrq}}
							</view>
							<view class="orderid">
								订单编号:{{item.xslsh}}
							</view>
						</view>

						<view class="rightbox">
							<text :class="item.type==1?'':'reds'">{{item.type==1?'+':'-'}}{{item.zkze}}</text>
							<image src="../../static/img/home/y.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal v-model="show" @confirm='bk' title="未绑定银行卡" show-cancel-button=true confirm-text='去绑卡' :content="content"></u-modal>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登录' content="登录后才能继续当前操作"></u-modal>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				form:{
					now:'',
					sevenDays:'',
					thirtyDays:'',
					amount:''
				},
				alllist:[],
				show:false,
				shows:false,
				content:'需要绑定银行卡后,才可显示可提现金额',
				srlist:[],
				zclist:[],
				list: [{
						name: '明细'
					},
					{
						name: '收入'
					},
					{
						name: '支出'
					}
				],
				current: 0
			}
		},
		computed:{
			
		},
		onShow() {
			if(uni.getStorageSync('num')){
				this.getall()
				this.getlist()
			}else{
				this.shows=true
			}
			
		
		},
		methods: {
			add(val,val1) {
				uni.navigateTo({
					url: `/pages/ditle/ditle?id=${val}&type=${val1}`
				});
			},
			getall(){
				const shyc =JSON.parse(uni.getStorageSync('num'))
				homeApi.income({
					id:shyc.id
				}).then(res=>{
					this.form.now=res.data.now.total
					this.form.sevenDays=res.data.sevenDays.total
					this.form.thirtyDays=res.data.thirtyDays.total
					this.form.amount=res.data.amount
				})
			},
		async	getlist(){
				const shyc =JSON.parse(uni.getStorageSync('num'))
				const obj={
						size:null,
						current:null,
						shyh:shyc.bm
					}
					const objs={
							size:null,
							current:null,
							bm:shyc.bm
						}
				await	homeApi.business(JSON.stringify(obj)).then(res=>{
					if(res.data.records.length>0){
						this.srlist=res.data.records
						this.srlist.map(e=>{
							e.type=1
						})
						
					}
					    
					});
				await	homeApi.cash(JSON.stringify(objs)).then(res=>{
					  
						if(res.data.records.length>0){
							  this.zclist=res.data.records
							this.zclist.map(e=>{
								e.type=2
							})
							
						}
					
						console.log(res)
					})
					this.alllist = this.srlist.concat(this.zclist);
					this.alllist.sort(function (a, b) {
					    return a.xsrq>b.xsrq?-1:1;
					});
			},
			txjl(){
				if(uni.getStorageSync('num')){
					uni.navigateTo({
					    url: '/pages/txjl/txjl'
					});
				}else{
					this.shows=true
				}
				
			},
			dl(){
				uni.navigateTo({
				    url: '/pages/login/logs'
				});
			},
			//绑卡
			bk(){
				uni.navigateTo({
				    url: '/pages/zaH/zaH'
				});
			},
			ljtx(){
				if(uni.getStorageSync('num')){
					const shyc =JSON.parse(uni.getStorageSync('num'))
					if(shyc.card){
						uni.navigateTo({
						    url: '/pages/ljtx/ljtx'
						});
					}else{
						this.show=true
					}
				}else{
					this.shows=true
				}
			
			},
			change(index) {
			  this.current = index;
			},
						
			// tabck(val){
			// 	this.current=val
			// },
			// tabSelect(e) {
			// 	this.TabCur = e.currentTarget.dataset.id;
			// 	this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			// }
		}

	}
</script>

<style lang="scss" scoped>
	/deep/.u-mode-center-box{
		border:1px solid #E6e6e6;
	}
	.reds{
		color: red !important;
	}
	.mx{
		
		.xxxr{
			padding: 0 24rpx 0 24rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #ebeef5;
			padding-bottom: 24rpx;
		}
		.rightbox{
			display: flex;
			align-items: center;
			text{
				width:100%;
				height:48rpx;
				font-size:32rpx;
				font-family:SF Pro Text;
				font-weight:600;
				color:rgba(124,196,87,1);
				opacity:1;
			}
			image{
				width: 48rpx;
				height: 48rpx;
			}
		}
		.xxxr{
			margin-top: 24rpx;
			.leftbox{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.xxxr-text{
					width:100%;
					height:40rpx;
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:500;
					line-height:40rpx;
					color:rgba(51,51,51,1);
					opacity:1;
					margin-bottom: 12rpx;
					
				}
				.times,.orderid{
					width:100%;
					height:34rpx;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:500;
					margin-bottom: 8rpx;
					line-height:34rpx;
					color:rgba(153,153,153,1);
					opacity:1;
				}
			}
		}
	}
	/deep/.u-tab-bar{
		height: 4rpx !important;
		background-color:#7CC457 !important ;
	}
	.bigfont{
		font-weight: 600;
	}
	.lin{
		width: 100%;
		height: 1px;
		background-color: #ebeef5;
		margin-top: 14rpx;
	}
	.box-box{
		display: flex;
		justify-content: center;
		border-bottom: 1px solid #edeef5;
		.box{
			width: 100%;
			height:88rpx;
			background:rgba(255,255,255,1);
			opacity:1;
			text-align: center;
			line-height: 88rpx;
		}
	}
	/deep/.u-mask-zoom{
		background-color: transparent !important;
	}
	.card {
		padding: 0 22rpx 0;
		box-sizing: border-box;

		.centr {
			width: 100%;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
			opacity: 1;
			border-radius: 16rpx;
			position: relative;
			margin-bottom: 70rpx;
		}
	}

	.fistbox {
		display: flex;
		justify-content: center;
		box-shadow: 0px 4rpx 8rpx rgba(102, 102, 102, 0.1);
		opacity: 1;
		border-radius: 24rpx 0px 0px 24rpx;
	}

	.txbox {
		width: 50%;
		height: 144rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		image {
			margin-top: 36rpx;
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 6rpx;
		}

		text {
			width: 100%;
			height: 40rpx;
			font-size: 28rpx;
			text-align: center;

			font-family: PingFang SC;
			font-weight: bold;
			line-height: 40rpx;
			color: rgba(51, 51, 51, 1);
			opacity: 1;
		}
	}

	.foot {
		display: flex;
		justify-content: space-around;
		margin-top: 80rpx;
	}

	.mok {
		text {
			text-align: center;
			width: 100%;
			font-size: 32rpx;
			font-family: DIN;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			opacity: 1;
		}

		view {
			text-align: center;
			width: 100%;
			font-size: 24rpx;
			margin-top: 6rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			opacity: 1;
		}
	}

	.head {
		background-image: url(../../static/img/home/bane.png);
		background-size: 100%;
		height: 420rpx;
		width: 100%;
		overflow: hidden;

		.headtext {
			width: 100%;
			text-align: center;
			margin-top: 80rpx;
			margin-bottom: 35rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 28rpx;
			color: rgba(255, 255, 255, 1);
			opacity: 1;
		}

		.qian {
			text-align: center;
			width: 100%;
			height: 80rpx;
			font-size: 64rpx;
			font-family: DIN;
			font-weight: 400;
			line-height: 64rpx;
			color: rgba(255, 255, 255, 1);
			opacity: 1;

			text {
				font-size: 16rpx;
			}
		}

	}

	.center {
		padding: 22rpx;
		box-sizing: border-box;
		margin-bottom: 24rpx;
	}
</style>
