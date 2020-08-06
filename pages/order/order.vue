<template>
	<view class="app">
		<view class="head">
			<view class="rq" @click="show=true">
				<text>{{tYear}} 年 {{m}} 月 </text>
				<image src="../../static/img/home/y.png" mode=""></image>
			</view>
			<view class="qianbox">
				<view class="fist">
					<text :class="dzje==0?'xzt':''">{{dzje==0?'暂无数据':dzje}}</text>
					<view>
						到账金额(元)
					</view>
				</view>
				<view class="fist">
					<text :class="xsje==0?'xzt':''">{{xsje==0?'暂无数据':xsje}}</text>
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
						{{item.xsrq}} {{item.xssj==null?'':item.xssj}}
					</view>
				</view>
				<view class="dabh">
					<text v-if="item.xslsh">订单编号 :</text>
					<view v-if="item.xslsh">
						{{item.xslsh}}
					</view>
				</view>
				<view class="center" v-for="(itms,ind) in item.xsMxList" :key='ind'>
					<image src="../../static/img/home/log.png" mode=""></image>
					<view class="centerbox">
						<view class="title">
							{{itms.SPMC ==null?'':itms.SPMC}} {{itms.SPGG ==null?'':itms.SPGG}}
						</view>
						<text class="dis">{{itms.BZ==null?'':itms.BZ}}</text>
						<view class="num">
							<text v-if="itms.LSDJ">¥</text> <text class="cui">{{itms.cui}}</text>
							<text class="cuiend">.{{itms.cuiend}}</text> </view>

					</view>
					<view class="nums" v-if="itms.XSSL">
						x{{itms.XSSL==null?'':itms.XSSL}}
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
		<u-loadmore :is-dot='true' :status="status" />
		<u-picker @cancel="show=false" @confirm="sjqr" mode="time" v-model="show" :params="params" :end-year='ys'></u-picker>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登录' content="登录后才能继续当前操作"></u-modal>
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
				this.getlist()
			} else {
				this.shows = true
			}
			uni.stopPullDownRefresh();
			this.$u.toast(`刷新成功`);
		},
		onReachBottom() {

			if (this.total - (this.current * this.size) > 0) {
				this.current = ++this.current
				this.getlist()
			} else {
				this.status = 'nomore';
			}
			// if (this.page >= 3) return;
			// this.status = 'loading';
			// this.page = ++this.page;
			// setTimeout(() => {
			// 	this.list += 10;
			// 	if (this.page >= 3)
			// 	else 
			// }, 2000)
			console.log(this.current)
		},
		onHide() {
			this.list = []
			this.show = false
		},
		onShow() {
			this.show = false
			this.doHandleYear()
			this.doHandleMonth()
			if (uni.getStorageSync('num')) {
				this.getday()
				this.getlist()
			} else {
				this.status = 'nomore',
					this.shows = true
			}
		},

		methods: {
			hasDot(num) {
				console.log(num, '13113')
				if (!isNaN(num)) {
					return ((num + '').indexOf('.') != -1) ? num : num.toFixed(2);
				}
			},
			getlist() {

				const obj = JSON.parse(uni.getStorageSync('num'))
				const ids = {
					id: obj.id,
					year: this.tYear,
					month: this.m,
					current: this.current,
					size: this.size
				}
				homeApi.orderall(JSON.stringify(ids)).then(res => {
					if (res.data.records.length == 0 || this.current * this.size > res.data.total || this.current * this.size == res
						.data.total) {
						this.status = 'nomore';
					}
					this.list.push(...res.data.records)
					this.list.map(e => {
						e.xsMxList.map(rq => {
							rq.LSDJ = this.hasDot(rq.LSDJ)
						})
						e.xsze = this.hasDot(e.xsze)
						this.total = res.data.total

					})
					this.list.map(es => {

						const munsel = (es.xsze + '').indexOf('.')
						es.cui = (es.xsze + '').slice(0, munsel)
						es.cuiend = (es.xsze + '').slice(munsel + 1, (es.xsze + '').length)


						es.xsMxList.map(e => {
							const munse = (e.LSDJ + '').indexOf('.')
							e.cui = (e.LSDJ + '').slice(0, munse)
							e.cuiend = (e.LSDJ + '').slice(munse + 1, (e.LSDJ + '').length)
						})
					})
					console.log(this.list, 88888)
				})


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
					id: obj.id
				}).then(res => {
					this.xsje = res.data.lsze
					this.dzje = res.data.xsze
				})
			},
			async sjqr(val) {
				this.size = 5,
					this.current = 1
				this.list = []
				this.m = val.month
				this.tYear = val.year
				await this.getday()
				await this.getlist()
				
				console.log(this.list, 8888)
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

	.footesbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 112rpx;
		box-sizing: border-box;
		padding-right: 24rpx;
		padding-left: 24rpx;

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
			color: rgba(102, 102, 102, 1);
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
		margin: 12rpx 0 42rpx 24rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.card {
		margin-bottom: 24rpx;

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
			padding-top: 24rpx;
			background: rgba(255, 255, 255, 1);
			padding: 24rpx  24rpx 0;
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
			padding: 24rpx 40rpx 85rpx 30rpx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(230, 230, 230, 1);

			.nums {
				// width:32px;
				height: 38rpx;
				font-size: 32rpx;
				font-family: SF Pro Text;
				font-weight: 400;
				line-height: 160rpx;
				color: rgba(51, 51, 51, 1);
				opacity: 1;
			}

			.centerbox {
				display: flex;
				justify-content: start;
				// align-items: ;
				flex-wrap: wrap;

				.num {
					// width:124px;
					height: 40rpx;
					font-size: 32rpx;
					font-family: SF Pro Text;
					font-weight: 600;
					color: rgba(250, 77, 77, 1);
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
		margin-top: 340rpx;
	}

	.qianbox {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;

		.fist {
			padding: 16rpx 78rpx 46rpx;
			box-sizing: border-box;

			text {
				width: 100%;
				text-align: center;
				height: 58rpx;
				font-size: 48rpx;
				display: block;
				font-family: DIN;
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
