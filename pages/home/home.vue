<template>
	<view class="app">

		<view class="head">
			<view class="headtext">
				今日收入(元)
			</view>
			<image class="imagese" @click="show2=true" src="../../static/img/home/ts.png" mode=""></image>
			<view class="qian">
				<text v-if="form.now">￥</text> {{form.now==null?0:form.now}}
			</view>
			<view class="foot">
				<view class="mok">
					<text>
						{{form.sevenDays==null?0:form.sevenDays}}
					</text>
					<view>
						近7日收入
					</view>
				</view>
				<view class="mok">
					<text>
						{{form.thirtyDays==null?0:form.thirtyDays}}
					</text>
					<view>
						近30日收入
					</view>
				</view>
				<view class="mok">
					<image class="imagesew" @click="show1=true" src="../../static/img/home/ts.png" mode=""></image>
					<text>
						{{form.amount==null?0:form.amount}}
					</text>
					<view>
						可提现收益
					</view>
				</view>
			</view>
		</view>
		<view class="center fst">
			<view class="fistbox">
				<!-- -->
				<view class="txbox" @click="ljtx">
					<image src="../../static/img/home/tx.png" mode=""></image>
					<text>立即提现</text>
				</view>
				<!--  -->
				<view class="txbox" @click="txjl">
					<image src="../../static/img/home/jl.png" mode=""></image>
					<text>提现记录</text>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="centr">
				<u-tabs class="dx" :list="list" inactive-color='black' active-color='black' :is-scroll="false" :current="current"
				 @change="change"></u-tabs>
				<view class="lin">
				</view>
				<view v-if="current==1" class="mx" v-for="(item,index) in srlist" :key='index' @click="add(item.id,1)">
					<view class="xxxr" v-if="srlist.length">
						<view class="leftbox">
							<view class="xxxr-text">
								销售收入
							</view>
							<view class="times">
								{{item.createTime}}
							</view>
							<view class="orderid">
								订单编号:{{item.xslsh}}
							</view>
						</view>
						<view class="rightbox">
							<!-- <text>+¥{{item.bsGet}}</text> -->
							<text>+ <text class="cuiz">{{item.cui}}</text> <text class="cuiz">.{{item.cuiend}}</text>
							</text>
							<image src="../../static/img/home/y.png" mode=""></image>
						</view>
					</view>

				</view>
				<view v-if="current==2" class="mx" v-for="(item,index) in zclist" :key='index' @click="add(item.id,2)">
					<view class="xxxr" v-if="zclist.length">
						<view class="leftbox">
							<view class="xxxr-text">
								提现
							</view>
							<view class="times">
								{{item.createTime}}
							</view>
							<view class="orderid">
								订单编号:{{item.xslsh}}
							</view>
						</view>
						<view class="rightbox">
							<!-- <text >-¥{{item.bsGet}}</text> -->
							<text class="reds">- <text class="cuiz reds">{{item.cui}}</text> <text class="cuiz reds">.{{item.cuiend}}</text>
							</text>
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
								{{item.createTime }}

							</view>
							<view class="orderid">
								订单编号:{{item.xslsh}}
							</view>
						</view>

						<view class="rightbox">

							<text :class="item.type==1?'':'reds'">{{item.type==1?'+':'-'}}
								<text :class="item.type==1?'':'reds'" class="cuiz">{{item.cui}}</text>
								<text class="cuiz" :class="item.type==1?'':'reds'">.{{item.cuiend}}</text> </text>
							<image src="../../static/img/home/y.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="asdimg" v-if="showwu">
					<image src="../../static/img/home/wsy.png" mode=""></image>
					<view>
						暂无收支信息
					</view>
					<text>快来加入获取收益吧 !</text>
				</view>
			</view>
		</view>
		<u-modal v-model="show1" title="可提现收益" content='每日早晨7:00自动提现,提现后2小时内到账' :show-confirm-button='false' cancel-color='#7CC457'
		 :show-cancel-button='true' cancel-text='知道了'></u-modal>
		<u-modal v-model="show2" title="今日收入" content='每晚到第二日凌晨实时收入统计' :show-confirm-button='false' cancel-color='#7CC457'
		 :show-cancel-button='true' cancel-text='知道了'></u-modal>
		<u-modal v-model="show" @confirm='bk' title="未绑定银行卡" show-cancel-button=true confirm-text='去绑卡' :content="content"></u-modal>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登录' content="登录后才能继续当前操作"></u-modal>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				form: {
					now: '',
					sevenDays: '',
					thirtyDays: '',
					amount: ''
				},
				alllist: [],
				showwu: false,
				show: false,
				shows: false,
				content: '需要绑定银行卡后,才可显示可提现金额',
				srlist: [],
				zclist: [],
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
		filters: {
			
		},
		async onPullDownRefresh() {
			if (uni.getStorageSync('num')) {
				await this.getall()
				await this.getlist()

			} else {
				this.shows = true
			}
			await this.change(0)
			uni.stopPullDownRefresh();
			this.$u.toast(`刷新成功`);
		},
		computed: {

		},
		async onShow() {
			if (uni.getStorageSync('num')) {
				await this.getall()
				await this.getlist()

			} else {
				this.shows = true
			}
			await this.change(0)

		},
		onLoad(val) {},
		onHide() {
			this.shows = false
		},
		methods: {
			tstx() {

			},
			add(val, val1) {
				if (val1 == 1) {
					uni.switchTab({
						url: '/pages/order/order'
					});
				} else {
					uni.navigateTo({
						url: `/pages/ditle/ditle?id=${val}&type=${val1}`
					});
				}

			},
			// 数字补0
			hasDot(num) {
				
				
				if (!isNaN(num)) {
					
					num = (num-0).toFixed(2);
					return num
				}
			},
			getall() {
				const shyc = JSON.parse(uni.getStorageSync('num'))
				homeApi.income({
					id: shyc.id
				}).then(res => {
					if (res.data.now) {
						this.form.now = res.data.now.amount == null ? 0 : res.data.now.amount
					} else {
						this.form.now = 0
					}
					if (res.data.sevenDays) {
						this.form.sevenDays = res.data.sevenDays.amount == null ? 0 : res.data.sevenDays.amount
					} else {
						this.form.sevenDays = 0
					}
					if (res.data.thirtyDays) {
						this.form.thirtyDays = res.data.thirtyDays.amount == null ? 0 : res.data.thirtyDays.amount
					} else {
						this.form.thirtyDays = 0
					}
					this.form.amount = res.data.amount == null ? 0 : res.data.amount
				})
			},
			async getlist() {
				const shyc = JSON.parse(uni.getStorageSync('num'))
				await homeApi.business({

					id: shyc.id
				}).then(res => {
					if (res.data.length > 0) {
						this.srlist = res.data
						this.srlist.map(e => {
							e.type = 1
							e.bsGet = this.hasDot(e.bsGet)
						})
						this.srlist.map(e => {
							const munse = (e.bsGet + '').indexOf('.')
							e.cui = (e.bsGet + '').slice(0, munse)
							e.cuiend = (e.bsGet + '').slice(munse + 1, (e.bsGet + '').length)
						})
					}
				});
				// 支出列表暂无
				await homeApi.txjl({
					id: shyc.id
				}).then(res => {

					if (res.data.length > 0) {
						let arr=[]
						this.zclist=[]
						arr=res.data
						arr.map(res=>{
							if(res.status==1){
								this.zclist.push(res)
							}
						})
						console.log(this.zclist,'this.zclist')
						this.zclist.map(e => {
							e.type = 2
							e.bsGet = this.hasDot(e.bsGet)
						})
						this.zclist.map(e => {
							const munse = (e.bsGet + '').indexOf('.')
							e.cui = (e.bsGet + '').slice(0, munse)
							e.cuiend = (e.bsGet + '').slice(munse + 1, (e.bsGet + '').length)
						})
					}
				})
				
				this.alllist = this.srlist.concat(this.zclist);
				

				this.alllist.sort(function(a, b) {
					return a.createTime > b.createTime ? -1 : 1;
				});
			},
			txjl() {
				if (uni.getStorageSync('num')) {
					uni.navigateTo({
						url: '/pages/txjl/txjl'
					});
				} else {
					this.shows = true
				}

			},
			dl() {
				uni.navigateTo({
					url: '/pages/login/logs'
				});
			},
			//绑卡
			bk() {
				uni.navigateTo({
					url: '/pages/zaH/zaHupdata/zaHupdata'
				});
			},
			ljtx() {
				if (uni.getStorageSync('num')) {
					// this.$u.toast(`此功能暂未开放`);
					const shyc = JSON.parse(uni.getStorageSync('num'))
					if (shyc.card) {
						uni.navigateTo({
							url: '/pages/ljtx/ljtx'
						});
					} else {
						this.show = true
					}
				} else {
					this.shows = true
				}

			},
			change(index) {
				this.current = index;
				if (this.current == 0 && this.alllist.length == 0) {
					this.showwu = true
				} else if (this.current == 1 && this.srlist.length == 0) {
					this.showwu = true
				} else if (this.current == 2 && this.zclist.length == 0) {
					this.showwu = true
				} else {
					this.showwu = false
				}
				console.log(this.showwu, 'this.showwu')
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
	.asdimg {
		height: 532rpx;
		width: 100%;

		image {
			display: block;
			width: 262rpx;
			height: 225rpx;
			margin: 68rpx auto 62rpx;
		}

		view {
			width: 100%;
			text-align: center;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 28rpx;
			color: rgba(51, 51, 51, 1);
			opacity: 1;
			margin-bottom: 8rpx;
		}

		text {
			width: 100%;
			height: 34rpx;
			display: block;
			text-align: center;
			margin: 0 auto;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 20rpx;
			color: rgba(153, 153, 153, 1);
			opacity: 1;
		}
	}

	/deep/.u-mode-center-box {
		border: 1px solid #E6e6e6;
	}

	.cuiq {
		margin-right: 2rpx;
		font-size: 28rpx !important;
		margin-left: 7rpx;
	}

	.cuiz {
		font-size: 28rpx !important;
	}

	.cuiend {
		font-size: 32rpx !important;
	}

	.reds {
		color: #333333 !important;
	}

	.mx {
		padding: 24rpx;
		box-sizing: border-box;

		.xxxr {
			padding: 0 0 0 0;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #F3F3F3;
			padding-bottom: 24rpx;
		}

		.rightbox {
			display: flex;
			align-items: center;
			width: 567rpx;

			justify-content: flex-end !important;

			text {
				width: 100%;
				text-align: right !important;
				height: 37rpx;
				font-size: 28rpx;
				font-family: dinbold;
				font-weight: 600;
				color: #FA4D4D;
				opacity: 1;
			}

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.xxxr {
			margin-top: 24rpx;

			.leftbox {
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.xxxr-text {
					width: 100%;
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 40rpx;
					color: rgba(51, 51, 51, 1);
					opacity: 1;
					margin-bottom: 12rpx;

				}

				.times,
				.orderid {
					width: 328rpx;
					text-overflow: ellipsis;
					// 文本溢出属性指定应向用户如何显示溢出内容
					// ellipsis是省略的意思
					// overflow 属性规定当内容溢出元素框时发生的事情。
					// hidden   内容会被修剪，并且其余内容是不可见的。
					white-space: nowrap;
					height: 34rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					margin-bottom: 8rpx;
					line-height: 34rpx;
					color: rgba(153, 153, 153, 1);
					opacity: 1;
				}
			}
		}
	}

	.fst {
		padding: 0 !important;
	}

	.imagese {
		width: 40rpx;
		height: 44rpx;
		position: absolute;
		top: 72rpx;
		right: 246rpx;

	}

	/deep/.u-tab-bar {
		height: 4rpx !important;
		background-color: #7CC457 !important;
	}

	.bigfont {
		font-weight: 600;
	}

	.lin {
		width: 100%;
		height: 1px;
		background-color: #ebeef5;
		margin-top: 14rpx;
	}

	.box-box {
		display: flex;
		justify-content: center;
		border-bottom: 1px solid #edeef5;

		.box {
			width: 100%;
			height: 88rpx;
			background: rgba(255, 255, 255, 1);
			opacity: 1;
			text-align: center;
			line-height: 88rpx;
		}
	}

	/deep/.u-mask-zoom {
		// background-color: transparent !important;
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
		padding-bottom: 24rpx;
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
		padding: 0 24rpx 0;
		box-sizing: border-box;
	}

	.imagesew {
		width: 40rpx;
		height: 44rpx;
		position: absolute;
		top: 42rpx;
		right: -50rpx;

	}

	.mok {
		position: relative;

		text {
			text-align: center;
			width: 100%;
			font-size: 32rpx;
			font-family: dinbold;
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
		position: relative;

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
			font-family: dinbold;
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
		padding: 22rpx 0 0;
		box-sizing: border-box;
		margin-bottom: 24rpx;
	}
</style>
