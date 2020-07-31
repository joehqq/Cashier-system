<template>
	<view class="app">
		<view class="head">
			<view class="head1">
				<view class="heads" @click="show=true">
					<view class="rq">
						{{tYear}}年 {{m}}月
					</view>
					<image src="../../static/img/home/y.png" mode=""></image>
				</view>
				<view class="headss">
					<image @click="rights" src="../../static/img/home/righticon.png" mode=""></image>
					<text>{{datas }}</text>
					<image @click="lefts" src="../../static/img/home/y.png" mode=""></image>
				</view>
			</view>
			<view class="boxs">
				<view class="je1">
					<view class="je">
						{{form.all}}
					</view>
					<view class="wz">
						总销售 (元)
					</view>
				</view>
				<view class="je1 ">
					<view class="je">
						{{form.dz}}
					</view>
					<view class="wz">
						总到账 (元)
					</view>
				</view>
				<view class="je1">
					<view class="je">
						{{form.xs}} 
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
						数量
					</view>
					<view class="gr" :class="type==2?'add':''" @click="qy">
						金额
					</view>
				</view>
				<view class="centerpm" :style="hga">
					<view v-for="(item,index) in lists" :key='index' class="centerpms" v-show="type==2">
						<view class="paiming">
							<view class="textbox">
								<image v-if="index>2?false:true" :src="'../../static/img/home/264'+index+'.png'" mode=""></image>
								<view class="boxims" v-else>
									0{{ index+1 }}
								</view>
								<text class="hsy">{{item.SPMC}}</text>
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
									0{{ index+1 }}
								</view>
								<text class="hsy">{{item.SPMC}}</text>
							</view>
							<text class="js">{{item.amount | nums(type)}} </text>
						</view>
						<u-line-progress active-color="linear-gradient(90deg,rgba(255,235,187,1) 0%,rgba(250,77,77,1) 100%);" height='16'
						 :show-percent="false" :percent="item.nums"></u-line-progress>
					</view>
				</view>
			</view>
		</view>
		<u-picker @cancel="show=false" @confirm="sjqr" mode="time" v-model="show" :params="params" :end-year='tYear'></u-picker>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登陆' content="登录后才能继续当前操作"></u-modal>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	var myDate = new Date();
	export default {
		data() {
			return {
				form:{
					all:0,
					dz:0,
					xs:0
				},
				shows: false,
				lists: [],
				list: [],
				show: false,
				time: '2020-0602 10:23',
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
				xgcg: false,
				phflangs:false,
				type: 1,
				day: ''
			};
		},
		computed: {
			hga(){
				console.log(this.type)
				console.log(this.phflangs,'phflangs')
				if(this.type==1&&this.phflangs){
					return 'height:300rpx'
				}
				else if(this.type==2&&this.phflang){
					return 'height:300rpx'
				}else{
					return 'height:100%'
				}
			},
			styles(val) {
				var str = `background:url(../../static/img/home/264${val+1}.png)`
				return str
			},
			datas() {
				const das = myDate.getDate()
				if (this.day == das) {
					return '今日'
				} else if (this.day - 1 == das) {
					return '昨日'
				} else {
					return this.day + '日'
				}

			}
		},
		filters: {
			
			nums(val, val1) {
				if (val1 == 1) {
					return val + '斤'
				} else {
					return val + '元'
				}
			}
		},
		created() {
			this.doHandleYear()
			this.doHandleMonth()
			if (uni.getStorageSync('num')) {

				this.getbb()
				this.getday()
			} else {
				this.shows = true
			}

			
		},
		methods: {
			getday(){
				const date =new Date()
				const obj = JSON.parse(uni.getStorageSync('num'))
				homeApi.day(JSON.stringify({
					shyh: obj.bm,
					xsrq:this.tYear+this.m+this.day
				})).then(res=>{
					if(res.code==100){
						if(res.data!=null){
							this.form.all=res.data.amount
							this.form.xs=res.data.total
						}else{
							this.$u.toast('当前日期无数据');
							this.form.all=0
							this.form.xs=0
							this.form.dz=0
						}
						
					}else{
							this.$u.toast('请求失败，请稍后重试');
					}
					console.log(res)
				})
			},
			dl() {
				uni.navigateTo({
					url: '/pages/login/logs'
				});
			},
			getbb() {
				const obj = JSON.parse(uni.getStorageSync('num'))
				const asd={
					shyh: obj.bm,
					xsrq:this.tYear+this.m+this.day
				}
				const asds={
					shyh: obj.bm,
					xsrq:this.tYear+this.m+this.day
				}
				homeApi.total(JSON.stringify(asds)).then(res => {
					this.lists = res.data
					if(res.data.length>0){
						this.phflang=false
						let big = this.lists[0].total
						this.lists.map((ele, index) => {
							ele.num = ele.total / big * 100
						})
					}else{
						this.phflangs=true
					}
					
				})
				homeApi.businessamount(JSON.stringify(asd)).then(res => {
					this.list = res.data
					if(res.data.length>0){
						this.phflang=false
						let bigs = this.list[0].amount
						this.list.map((ele, index) => {
							ele.nums = ele.amount / bigs * 100
						})
					}else{
						this.phflang=true
					}
					

				})
			},
			lefts() {
				const das = myDate.getDate()
				if (this.day == das) {
					this.day = das
				} else {
					this.day++
				}
				this.getday()
				
					this.getbb()
			},
			rights() {

				if (this.day == 1) {
					this.day = 1
				} else {
					this.day--
				}
				this.getday()
				this.getbb()
			},
			gr() {
				this.type = 1
			},
			qy() {
				this.type = 2
			},
			sjqr(val) {
				this.m = val.month
				this.tYear = val.year
				this.getday()
			},
			doHandleYear(tYear) {

				var tYear = myDate.getFullYear();
				this.day = myDate.getDate();

				this.tYear = tYear
			},
			doHandleMonth() {
				var tMonth = myDate.getMonth();

				var m = tMonth + 1;
				if (m.toString().length == 1) {
					m = '0' + m;
				}
				this.m = m

			}
		}
	}
</script>

<style lang="scss" scoped>
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
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;

			.je {
				width: 100%;
				height: 48rpx;
				font-size: 40rpx;
				font-family: DIN;
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

	.pm {
		margin-bottom: 196rpx;

		.as {
			margin: 44rpx 0 20rpx;
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
		}

		.gr {
			background-color: #F9F9F9;
			width: 50%;
			box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
			border-radius: 16rpx 0 16rpx 0;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 218rpx;
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
		width: 160rpx;
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
