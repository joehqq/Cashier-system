<template>
	<view class="app">
		<view class="head">
			<view class="rq" @click="show=true">
				<text>{{tYear}} 年 {{m}} 月 </text>
				<image src="../../static/img/home/y.png" mode=""></image>
			</view>
			<view class="qianbox">
				<view class="fist">
					<!-- :class="dzje==0?'xzt':''" -->
					<!-- ==0?'暂无数据':dzje -->
					<text>{{dzje}}</text>
					<view>
						到账金额(元)
					</view>
				</view>
				<view class="fist">
					<!-- ==0?'暂无数据':xsje -->
					<!-- :class="xsje==0?'xzt':''" -->
					<text>{{xsje}}</text>
					<view>
						销售金额(元)
					</view>
				</view>
			</view>
		</view>
		<view class="cardboxs">

			<view class="card" v-for="(item,index) in list" :key='index'>
				<view class="heads">
					<text :class="item.ztbz==0?'':'red'">{{item.ztbz==0?'已付款':'已完成'}}</text>
					<view>
						{{item.xsrq}} &nbsp {{item.xssj==null?'':item.xssj}}
					</view>
				</view>
				<view class="dabh">
					<text v-if="item.xslsh">订单编号 :</text>
					<view v-if="item.xslsh">
						{{item.xslsh}}
					</view>
				</view>
				<view class="center" v-for="(itms,ind) in item.xsMxList" :key='ind'>
					<view style="display: flex;">
						<image :src="itms.avatar?itms.avatar:'../../static/img/home/yu.png'" mode=""></image>
						<view class="centerbox">
							<view class="title">
								{{itms.SPMC ==null?'':itms.SPMC}} 
							</view>
							<text class="dis">{{itms.BZ==null?'':itms.BZ}}</text>
							<view class="num">
								<text class="zkze" v-if="itms.ZKJE">x</text><text class="cui">{{itms.XSSL==null?'':itms.XSSL}}</text>
								 </view>

						</view>
					</view>
					<view class="nums" v-if="itms.XSSL"> 
						<text class="hwz" >¥</text> {{itms.cui}}.<text class="cuiend">{{itms.cuiend}}</text>
					</view>
					<view class="footes">
						商品编号: {{itms.SPBM==null?'':itms.SPBM}}
					</view>
				</view>
				<view class="footesbox">
					<view class="somes" v-if="item.yhze">
						已优惠 ¥{{item.yhze |yhnm}}
					</view>
					<view v-if="!item.yhze">

					</view>
					<view class="sonmeqian">
						合计 ({{item.xsMxList.length}}) : <view>
							<text class="fh">¥</text> <text class="cui">{{item.cui}}.</text><text class="cuiend">{{item.cuiend}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="status=='nomore'?false:true" :is-dot='true' :status="status" />
		<u-picker confirm-color='#7CC457' @cancel="show=false" @confirm="sjqr" mode="time" v-model="show" :params="params"
		 :end-year='ys'></u-picker>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登录' content="登录后才能继续当前操作"></u-modal>
		<view class="linsq">

		</view>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				dzje: 0,
				xsje: 0,
				list: [],
				ys: '',
				status: 'loadmore',
				current: 1,
				size: 5,
				pagesice: 5,
				ms: '',
				tYear: '',
				m: '',
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				show: false,
				total: 0,
				shows: false
			};
		},
		filters: {
			yhnm(val) {
				if (val) {
					const vals = val + ''
					const index = vals.indexOf('-');
					if (index == -1) {
						return vals
					} else if (index == 0) {

						return vals.substr(1, vals.length - 1);
					} else {
						return ''
					}
				} else {
					return ''
				}
			}
		},
		async onPullDownRefresh() {

			this.size = 5
			this.current = 1
			this.list = []
			this.doHandleYear()
			this.doHandleMonth()
			if (uni.getStorageSync('num')) {
				this.getday()
			} else {
				this.shows = true
			}
			uni.stopPullDownRefresh();
			this.$u.toast(`刷新成功`);
		},
		onReachBottom() {

			if (this.total - (this.current * this.size) > 0) {
				this.current = ++this.current
				this.getday()
			} else {
				this.status = 'nomore';
			}
			

		},
		onHide() {
			this.list = []
			this.show = false
			this.current = 1
			this.size = 5
		},
		onShow() {
			this.show = false
			this.doHandleYear()
			this.doHandleMonth()
			if (uni.getStorageSync('num')) {
				this.getday()
				// this.getlist()
			} else {
				this.status = 'nomore',
					this.shows = true
			}
		},
		onLoad(e) {
		},
		methods: {
			hasDot(num) {
				if (!isNaN(num)) {
					
					num = (num-0).toFixed(2);
					return num
				}
			},
			getlist() {

				// const obj = JSON.parse(uni.getStorageSync('num'))
				// const ids = {
				// 	id: obj.id,
				// 	year: this.tYear,
				// 	month: this.m,
				// 	current: this.current,
				// 	size: this.size
				// }
				// homeApi.orderall(JSON.stringify(ids)).then(res => {
				// 	if (res.data.mxList.records.length == 0 || this.current * this.size > res.data.mxList.total || this.current * this.size == res
				// 		.data.total) {
				// 		this.status = 'nomore';
				// 	}
				// 	this.list.push(...res.data.mxList.records)
				// 	this.list.map(e => {
				// 		e.xsMxList.map(rq => {
				// 			rq.LSDJ = this.hasDot(rq.LSDJ)
				// 		})
				// 		e.xsze = this.hasDot(e.xsze)
				// 		this.total = res.data.mxList.total
				// 	})
				// 	this.list.map(es => {
				// 		const munsel = (es.xsze + '').indexOf('.')
				// 		es.cui = (es.xsze + '').slice(0, munsel)
				// 		es.cuiend = (es.xsze + '').slice(munsel + 1, (es.xsze + '').length)
				// 		es.xsMxList.map(e => {
				// 			const munse = (e.LSDJ + '').indexOf('.')
				// 			e.cui = (e.LSDJ + '').slice(0, munse)
				// 			e.cuiend = (e.LSDJ + '').slice(munse + 1, (e.LSDJ + '').length)
				// 		})
				// 	})
				// })


			},
			dl() {
				uni.navigateTo({
					url: '/pages/login/logs'
				});
			},
			getday() {
				const obj = JSON.parse(uni.getStorageSync('num'))

				homeApi.amount({
					year: this.tYear,
					month: this.m,
					id: obj.id,
					current: this.current,
					size: this.size
				}).then(res => {
					this.xsje = res.data.amount
					this.dzje = res.data.xsze
					if (res.data.mxList.records.length == 0 || (this.current == 0 ? 1 : this.current) * this.size > res.data.mxList.total ||
						(this.current == 0 ? 1 : this.current) * this.size == res
						.data.total) {
						this.status = 'nomore';
					}
					this.list.push(...res.data.mxList.records)
					this.list.map(e => {
						e.xsMxList.map(rq => {
							rq.ZKJE = this.hasDot(rq.ZKJE)
						})
						e.xsze = this.hasDot(e.xsze)
						this.total = res.data.mxList.total
					})
					this.list.map(es => {
						const munsel = (es.xsze + '').indexOf('.')
						es.cui = (es.xsze + '').slice(0, munsel)
						es.cuiend = (es.xsze + '').slice(munsel + 1, (es.xsze + '').length)
						es.xsMxList.map(e => {
							const munse = (e.ZKJE + '').indexOf('.')
							e.cui = (e.ZKJE + '').slice(0, munse)
							e.cuiend = (e.ZKJE + '').slice(munse + 1, (e.ZKJE + '').length)
						})
					})
				})
			},
			async sjqr(val) {
				this.size = 5,
					this.current = 1
				this.list = []
				this.m = val.month
				this.tYear = val.year
				await this.getday()
				// await this.getlist()

			},
			doHandleYear(tYear) {
				var myDate = new Date();
				var tYear = myDate.getFullYear();
				this.ys = tYear
				this.tYear = tYear
			},
			doHandleMonth() {
				var myDate = new Date();
				var tMonth = myDate.getMonth();

				var m = tMonth + 1;
				if (m.toString().length == 1) {
					m = '0' + m;
				}
				this.m = m
				this.ms = m
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/.u-more-text {
		color: #999999 !important;
	}

	.linsq {
		position: fixed;
		top: 132rpx;
		left: 374rpx;
		z-index: 25;
		width: 2rpx;
		height: 120rpx;
		background-color: #F3F3F3;
	}

	.cui {
		padding-left: 0rpx !important;
		font-size: 32rpx !important;
	}

	.cuiend {
		padding-left: 0rpx !important;
		font-size: 24rpx !important;
	}

	/deep/.u-mode-center-box {
		border: 1px solid #E6e6e6;
	}

	.fh {
		padding-left: 10rpx;
		font-size: 20rpx;
		padding-right: 5rpx;
		color: rgba(250, 77, 77, 1);
	}
.hwz{
	font-size: 20rpx !important;
	}
	.footesbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 112rpx;
		box-sizing: border-box;
		padding-right: 24rpx;

		.sonmeqian {
			display: flex;
			align-items: center;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			opacity: 1;

			text {
				padding-left: 10rpx;
				font-size: 20rpx;
				padding-right: 5rpx;
				color: rgba(250, 77, 77, 1);
			}

			view {
				font-family: SF Pro Text;
				font-weight: 600;
				color: rgba(250, 77, 77, 1);
				opacity: 1;
			}
		}

		.somes {
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 34rpx;
			color: #333333;
			opacity: 1;
		}
	}

	.red {
		color: black !important;
	}

	.dabh {
		width: 100%;
		text-align: left;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 40rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
		margin: 12rpx 0 42rpx 0rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
.zkze{
	
}
	.card {
		margin-bottom: 24rpx;
		padding: 0 24rpx 0;
		box-sizing: border-box;

		.footes {
			position: absolute;
			width: 100%;
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			opacity: 1;
			bottom: 24rpx;

		}

		.heads {
			width: 100%;
			background: rgba(255, 255, 255, 1);
			padding: 24rpx 0 0;
			border-radius: 16rpx 16rpx 0 0;

			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				width: 260rpx;
				height: 44rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				// line-height:44px;
				color: rgba(124, 196, 87, 1);
				opacity: 1;
			}


			view {
				height: 34rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(187, 187, 187, 1);
				opacity: 1;
				margin-top: 16rpx;
			}
		}

		width:100%;
		// height:768px;
		background:rgba(255, 255, 255, 1);
		box-shadow:0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
		opacity:1;
		border-radius:16rpx;

		// overflow: hidden;
		.center {
			position: relative;
			padding: 24rpx 40rpx 85rpx 6rpx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			border-bottom: 1px solid #F3F3F3;

			.nums {
				margin-top: 56rpx;
				height: 38rpx;
				
				line-height: 160rpx;
				color: rgba(51, 51, 51, 1);
				opacity: 1;
				font-size: 32rpx;
				font-family: SF Pro Text;
				font-weight: 600;
				color: rgba(250, 77, 77, 1);
			}

			.centerbox {
				display: flex;
				justify-content: start;
				// align-items: ;
				flex-wrap: wrap;

				.num {
					font-size: 32rpx;
					font-family: SF Pro Text;
					font-weight: 400;
					// width:124px;
					height: 40rpx;
					
					opacity: 1;

					text {
						font-size: 20rpx;
					}
				}

				.dis {
					width: 100%;
					height: 34rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 34rpx;
					color: rgba(187, 187, 187, 1);
					opacity: 1;
					margin-bottom: 24rpx;
				}

				.title {
					width: 100%;
					height: 40rpx;
					font-size: 28rpx;
					margin-bottom: 4rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 40rpx;
					color: rgba(51, 51, 51, 1);
					opacity: 1;
				}
			}

			image {
				width: 154rpx;
				height: 162rpx;
				margin-right: 28rpx;
			}
		}

	}

	.xzt {
		font-size:
			28rpx !important;
	}

	.cardboxs {
		margin-top: 324rpx;
	}

	.qianbox {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;

		.fist {
			width: 50%;
			padding: 16rpx 0 46rpx;
			box-sizing: border-box;
			text-align: center;

			text {
				width: 100%;
				text-align: center;
				height: 58rpx;
				font-size: 48rpx;
				display: block;
				font-family: dinbold;
				font-weight: bold;
				color: rgba(250, 77, 77, 1);
				opacity: 1;
			}

			view {
				margin-top: 4rpx;
				width: 100%;
				text-align: center;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 40rpx;
				color: rgba(51, 51, 51, 1);
				opacity: 1;
			}
		}
	}

	/deep/.u-mask-zoom {
		// background-color: transparent !important;
	}

	.head {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 702rpx;
		height: 300rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 16rpx;
		padding: 48rpx 0 4rpx;
		box-sizing: border-box;
		margin-bottom: 24rpx;
		z-index: 9;

		.rq {
			display: flex;
			justify-content: center;
			margin-bottom: 40rpx;

			text {
				text-align: center;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				// line-height:40px;
				color: rgba(51, 51, 51, 1);
				opacity: 1;
				margin-right: 14rpx;
			}

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.app {
		padding: 0 24rpx 0;
		box-sizing: border-box;
	}
</style>
