<template>
	<view class="app">
		<view class="head">
			<view class="head1">
				<view class="heads">
					<view class="rq" @click="show=true">
						{{tYear}}年 {{m}}月 {{ds}}日
					</view>
					<image @click="show=true" src="../../static/img/home/y.png" mode=""></image>
					<image class="tszp" @click="show1=true" src="../../static/img/home/tss.png" mode=""></image>
				</view>
				<view class="headss">
					<image @click="rights" src="../../static/img/home/righticon.png" mode=""></image>
					<text @click="xzrq">{{datas |myday(day,tYear,m)}}</text>
					<image @click="lefts" src="../../static/img/home/y.png" mode=""></image>
				</view>
			</view>
			<view class="boxs">
				<view class="je1">
					<view class="je">
						{{form.all==null?0:form.xs }}
					</view>
					<view class="wz">
						总销售 (元)
					</view>
				</view>
				<view class="je1 jiebk">
					<view class="je">
						{{form.zdz==null?0:form.zdz}}
						
					</view>
					<view class="wz">
						总到账 (元)
					</view>
				</view>
				<view class="je1">
					<view class="je">
						{{form.xs==null?0:form.all}}
					</view>
					<view class="wz">
						总销量 (斤)
					</view>

				</view>
			</view>
		</view>
		<view class="pm">
			<view class="as">
				成交排名
			</view>
			<view class="boxpm">

				<view class="headpm">
					<view class="gr" :class="type==1?'add':''" @click="gr">
						金额
					</view>
					<view class="gr" :class="type==2?'add':''" @click="qy">
						数量
					</view>
				</view>
				<view class="centerpm">
					<view v-for="(item,index) in lists" :key='index' class="centerpms" v-show="type==2">
						<view class="paiming">
							<view class="textbox">
								<image v-if="index>2?false:true" :src="'../../static/img/home/264'+index+'.png'" mode=""></image>
								<view class="boxims" v-else>
									<text v-if="index+1>9?false:true">0</text> {{ index+1 }}
								</view>
								<text class="hsy">{{item.SPMC==null?'':item.SPMC}}</text>
							</view>
							<text class="js">{{item.total | nums(type)}} </text>
						</view>
						<u-line-progress active-color="linear-gradient(90deg,rgba(255,235,187,1) 0%,rgba(250,77,77,1) 100%);" height='16'
						 :show-percent="false" :percent="item.num"></u-line-progress>
					</view>
					<view v-for="(item,index) in list" :key='index' class="centerpms" v-show="type==1">
						<view class="paiming">
							<view class="textbox">
								<image v-if="index>2?false:true" :src="'../../static/img/home/264'+index+'.png'" mode=""></image>
								<view class="boxims" v-else>
									<text v-if="index+1>9?false:true">0</text> {{ index+1 }}
								</view>
								<text class="hsy">{{item.SPMC==null?'':item.SPMC}}</text>
							</view>
							<text class="js">{{item.amount | nums(type)}} </text>
						</view>
						<u-line-progress active-color="linear-gradient(90deg,rgba(255,235,187,1) 0%,rgba(250,77,77,1) 100%);" height='16'
						 :show-percent="false" :percent="item.nums"></u-line-progress>
					</view>
					<view class="asdimg" v-if="hga">
						<image src="../../static/img/home/zwph.png" mode=""></image>
						<view>
							暂无成交排行
						</view>
						<text>客官请耐心等待 !</text>
					</view>
				</view>
			</view>
		</view>
		<u-modal v-model="show1" title="每日报表" content='每日早晨7:00更新当日销售数据的统计情况' :show-confirm-button='false' cancel-color='#7CC457'
		 :show-cancel-button='true' cancel-text='知道了'></u-modal>
		<u-picker @cancel="show=false" @confirm="sjqr" mode="time" v-model="show" :params="params" :end-year='tYear'></u-picker>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登录' content="登录后才能继续当前操作"></u-modal>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	var myDate = new Date();
	export default {
		data() {
			return {
				show1: false,
				showwu: false,
				form: {
					all: 0,
					zdz:0,
					dz: 0,
					xs: 0
				},
				datas: myDate.getDate(),
				shows: false,
				lists: [],
				list: [],
				ds: '',
				show: false,
				time: '2020-0602 10:23',
				tYear: '',
				m: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				xgcg: false,
				phflangs: false,
				type: 1,
				day: ''
			};
		},
		async onPullDownRefresh() {
			await this.doday()
			this.datas = myDate.getDate(),
				await this.doHandleYear()
			await this.doHandleMonth()
			if (uni.getStorageSync('num')) {
				this.shows = false
				await this.getbb()
				await this.getmrdz()
				// await this.getzdz()
				await this.getday()

			} else {
				this.shows = true
			}
			uni.stopPullDownRefresh();
			await this.$u.toast(`刷新成功`);
		},
		computed: {
			hga() {
				if (this.type == 1 && this.phflangs) {
					return true
				}
				if (this.type == 1 && !this.phflangs) {
					return false
				}
				if (this.type == 2 && !this.phflang) {
					return false
				}
				if (this.type == 2 && this.phflang) {
					return true
				}

			},
			styles(val) {
				var str = `background:url(../../static/img/home/264${val+1}.png)`
				return str
			}

		},
		filters: {
			myday(val, val1, val2, val3) {
				// val1==this


				var Year = myDate.getFullYear();
				var onth = myDate.getMonth();
				var ms = onth + 1;
				if (ms.toString().length == 1) {
					ms = '0' + ms;
				}

				if (val1 == val) {
					return '今日'
				} else if (val1 - 1 == val) {
					return '昨日'
				} else if (val1 - 2 == val) {
					return '前天'
				}
				// console.log(val)
				// console.log(val1)
			},
			nums(val, val1) {
				if (val1 == 1) {
					return `${val}   元`
				} else {
					return `${val}   斤`
				}
			}
		},
		async created() {
			await this.doday()
			this.doHandleYear()
			this.doHandleMonth()
			this.getday()
			if (uni.getStorageSync('num')) {
				this.getmrdz()
				this.getbb()
				// this.getzdz()
			} else {
				this.shows = true
			}


		},
		methods: {
			xzrq() {

			},
			getday(val) {
				if (val) {
					if (val.toString().length == 1) {
						val = '0' + val;
					}
				}
				const tYearqq = myDate.getFullYear();
				let tMonthesqqnm = myDate.getMonth();
				let mwsqnm = tMonthesqqnm + 1;

				if (mwsqnm.toString().length == 1) {
					mwsqnm = '0' + mwsqnm;
				}
				const date = new Date()
				const obj = JSON.parse(uni.getStorageSync('num'))
				homeApi.day({
					id: obj.id,
					xsrq: val ? `${tYearqq}-${mwsqnm}-${val}` : this.tYear + '-' + this.m + '-' + this.ds
				}).then(res => {
					if (res.code == 100) {
						if (res.data.amountAndTotal != null) {
							this.form.all = res.data.amountAndTotal.total == null ? 0 : res.data.amountAndTotal.total
							this.form.xs = res.data.amountAndTotal.amount == null ? 0 : res.data.amountAndTotal.amount
							this.form.dz = res.data.real.total == null ? 0 : res.data.real.total
						} else {
							this.$u.toast('当前日期无汇总数据');
							this.form.all = 0
							this.form.xs = 0
							this.form.dz = 0
						}

					} else {
						this.$u.toast('请求失败，请稍后重试');
					}
				})
			},
			dl() {
				uni.navigateTo({
					url: '/pages/login/logs'
				});
			},
			getzdz(val) {
				if (val) {
					if (val.toString().length == 1) {
						val = '0' + val;
					}
				}
				const obj = JSON.parse(uni.getStorageSync('num'))
				const tYearqq = myDate.getFullYear();
				let tMonthesqqnm = myDate.getMonth();
				let mwsqnm = tMonthesqqnm + 1;

				if (mwsqnm.toString().length == 1) {
					mwsqnm = '0' + mwsqnm;
				}

			},
			getmrdz(val) {
				if (val) {
					if (val.toString().length == 1) {
						val = '0' + val;
					}
				}
				const tYearqq = myDate.getFullYear();
				let tMonthesqqnm = myDate.getMonth();
				let mwsqnm = tMonthesqqnm + 1;
				
				if (mwsqnm.toString().length == 1) {
					mwsqnm = '0' + mwsqnm;
				}
				const obj = JSON.parse(uni.getStorageSync('num'))
				homeApi.ledz({
					id: obj.id,
					rq:	val ? `${tYearqq}-${mwsqnm}-${val}` : this.tYear + '-' + this.m + '-' + this.ds
				}).then(res => {
					this.form.zdz= res.data.amount
				})
			},
			getbb(val) {
				if (val) {
					if (val.toString().length == 1) {
						val = '0' + val;
					}
				}
				const tYearqq = myDate.getFullYear();
				let tMonthesqqnm = myDate.getMonth();
				let mwsqnm = tMonthesqqnm + 1;

				if (mwsqnm.toString().length == 1) {
					mwsqnm = '0' + mwsqnm;
				}
				const obj = JSON.parse(uni.getStorageSync('num'))
				homeApi.total({
					id: obj.id,
					xsrq: val ? `${tYearqq}-${mwsqnm}-${val}` : this.tYear + '-' + this.m + '-' + this.ds
				}).then(res => {
					if (res.data.length > 0) {
						this.lists = res.data
						this.phflangs = false
						let big = this.lists[0].total
						this.lists.map((ele, index) => {
							ele.num = ele.total / big * 100
						})
					} else {
						this.phflangs = true
					}

				})

				homeApi.businessamount({
					id: obj.id,
					xsrq: val ? `${tYearqq}-${mwsqnm}-${val}` : this.tYear + '-' + this.m + '-' + this.ds

				}).then(res => {
					if (res.data.length > 0) {
						this.list = res.data
						this.phflang = false
						let bigs = this.list[0].amount
						this.list.map((ele, index) => {
							ele.nums = ele.amount / bigs * 100
						})
					} else {
						this.phflang = true
					}


				})
			},
			lefts() {
				this.type = 1
				this.lists = []
				this.list = []
				var tMonthesq = myDate.getMonth();
				const das = myDate.getDate()
				var mwsq = tMonthesq + 1;
				// tYear//当前年
				//mwsq当前月
				//das当前日
				//datas变化日
				if (mwsq.toString().length == 1) {
					mwsq = '0' + mwsq;
				}
				if (this.datas == das) {
					this.datas = das
				} else {
					this.datas++
				}
				 this.getmrdz(this.datas)
				this.getday(this.datas)
				this.getbb(this.datas)
				this.doHandleYear()
				this.doHandleMonth()
				if (this.datas.toString().length == 1) {
					this.ds = '0' + this.datas;
				}
			},
			rights() {
				this.type = 1
				this.lists = []
				this.list = []
				const das = myDate.getDate()
				var tYearqs = myDate.getFullYear();

				if (this.datas == (das - 2)) {
					this.datas = das - 2
				} else {
					this.datas--
				}
				if (this.datas.toString().length == 1) {
					this.ds = '0' + this.datas;
				}
				this.getmrdz(this.datas)
				this.getday(this.datas)
				this.getbb(this.datas)
				this.doHandleYear()
				this.doHandleMonth()
			},
			gr() {
				this.type = 1
			},
			qy() {
				this.type = 2
			},
			// getCountDays(ym) {
			// 	var curDate = new Date(ym);
			// 	var curMonth = curDate.getMonth();
			// 	curDate.setMonth(curMonth + 1);
			// 	curDate.setDate(0);
			// 	this.datas = curDate.getDate();
			// },
			sjqr(val) {
				this.type = 1
				this.list = []
				this.lists = []
				var th = myDate.getMonth();
				var ear = myDate.getFullYear();
				var mq = th + 1;
				if (mq.toString().length == 1) {
					mq = '0' + mq;
				}
				// if (val.month != mq || ear != val.year) {
				// 	this.getCountDays(val.year)
				// }

				this.m = val.month
				this.tYear = val.year
				this.ds = val.day
				this.getday()
				this.getbb()
				this.getmrdz()
			},
			doHandleYear(tYear) {

				var tYear = myDate.getFullYear();
				this.day = myDate.getDate();

				this.tYear = tYear
			},
			doday() {

				var dast = myDate.getDate();
				if (dast.toString().length == 1) {
					dast = '0' + dast;
				}
				this.ds = dast
			},
			doHandleMonth() {
				var tMonthesw = myDate.getMonth();

				var m = tMonthesw + 1;
				if (m.toString().length == 1) {
					m = '0' + m;
				}
				this.m = m
			}
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

	.centerpms {
		margin-bottom: 48rpx;
	}

	.boxims {
		width: 44rpx;
		height: 44rpx;
		margin-right: 20rpx;
		display: block;
		margin-top: 12rpx;
		background: rgba(187, 187, 187, 1);
		border-radius: 50%;
		opacity: 1;
		text-align: center;
		line-height: 44rpx;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		opacity: 1;
		margin-right: 20rpx;
		margin-left: 20rpx;
		margin-bottom: 20rpx;

	}

	/deep/.u-progress {
		width: 604rpx !important;
		margin: 0 auto !important;
		display: block !important;
		height: 16rpx !important;

	}

	.jiebk {
		border-right: 2rpx solid #F3F3F3;
		border-left: 2rpx solid #F3F3F3;
	}

	.centerpm {
		padding: 24rpx;
		box-sizing: border-box;

		.js {
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 40rpx;
			color: rgba(153, 153, 153, 1);
			opacity: 1;
		}

		.hsy {
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 40rpx;
			color: rgba(51, 51, 51, 1);
			opacity: 1;
			vertical-align: middle;
			margin-top: 16rpx;
			display: block;

		}

		.paiming {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.textbox {
			display: flex;
			justify-content: space-between;

			image {
				width: 65rpx;
				height: 65rpx;
				margin-right: 20rpx;
				display: block;
				margin-bottom: 20rpx;
			}
		}
	}

	.boxs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		.je1 {
			width: 33%;
			padding-top: 10rpx;
			padding-bottom: 10rpx;

			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;

			.je {
				width: 100%;
				height: 48rpx;
				font-size: 40rpx;
				font-family: dinbold;
				font-weight: bold;
				line-height: 48rpx;
				color: rgba(250, 77, 77, 1);
				opacity: 1;
				text-align: center;
			}

			.wz {
				width: 100%;
				height: 34rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 34rpx;
				text-align: center;
				color: rgba(51, 51, 51, 1);
				opacity: 1;
			}
		}
	}

	.tszp {
		position: absolute;
		top: 0;
		left: 280rpx;
		width: 44rpx;
		height: 44rpx;
	}

	.xzt {
		font-size:
			28rpx !important;
	}

	.pm {
		margin-bottom: 196rpx;

		.as {
			margin: 44rpx 24rpx 20rpx;
			width: 100%;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 40rpx;
			color: rgba(51, 51, 51, 1);
			opacity: 1;
		}

		.boxpm {
			width: 702rpx;
			margin: 0 auto;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
			opacity: 1;
		}

		.headpm {
			display: flex;
			align-items: center;
			background-color: #fff;
		}

		.add {

			box-shadow: 0px 0rpx 0rpx rgba(0, 0, 0, 0.08) !important;
			border-radius: 0 !important;
			background-color: #fff !important;
			font-weight: bold !important;
		}

		.gr {
			background-color: #F9F9F9;
			width: 50%;
			box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
			border-radius: 16rpx 0 16rpx 0;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			opacity: 1;
			height: 80rpx;
			line-height: 80rpx;
		}
	}

	.jebox {
		border-left: 1px solid #E6E6E6;
		border-right: 1px solid #E6E6E6;
	}

	.head1 {
		margin-bottom: 48rpx;
		width: 100%;
		justify-content: space-between;
		display: flex;
		align-items: center;
	}

	.heads {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 280rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 40rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.headss {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 184rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 40rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 300rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 16rpx;
		padding: 48rpx 24rpx 24rpx;
	}

	.app {
		padding: 24rpx 24rpx;
		box-sizing: border-box;
	}
</style>
