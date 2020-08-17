<template>
	<view class="app">
		<view class="head" @click="dl">
			<view class="headcnms">
				<open-data default-avatar='../../static/img/home/log.png' class="ope" type="userAvatarUrl"></open-data>
			</view>
			<view class="headbox">
				<open-data class='nkname' default-text='欢迎登录' type="userNickName"></open-data>
				<text>
					{{form.num}}
				</text>
			</view>
		</view>
		<view class="bodys">
			<view class="je" v-if="zhye">
				<text>{{zhye}}</text>
			</view>
			<view class="boxs">
				<image class="bgdtp" src="../../static/img/home/bj.png" mode=""></image>
				<view class="box">
					<view class="jrsr">
						今日收入
					</view>
					<view class="qian" :class="allday.now.total==null?'xzt':''">
						{{allday.now.total |sr}}
					</view>
				</view>

				<view class="box">
					<view class="jrsr">
						本月收入
					</view>
					<view class="qian" :class="allday.month.total==null?'xzt':''">
						{{allday.month.total |srs}}
					</view>
				</view>
			</view>
		</view>
		<view class="min">
			<view class="minxx">
				我的信息
			</view>
			<u-cell-group>
				<u-cell-item title="商品管理" @click='ddgl' :value="form.orders">
					<image slot="icon" style="width: 48rpx; height: 48rpx;margin-right: 24rpx;" src="../../static/img/home/spgl.png"
					 mode=""></image>
				</u-cell-item>
							
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
				<view class="fsmx">
				<u-cell-item title="每日报表" @click='mrbb'>
					<image slot="icon" style="width: 48rpx; height: 48rpx;margin-right: 24rpx;" src="../../static/img/home/2599.png"
					 mode=""></image>
				</u-cell-item>
				</view>
			</u-cell-group>
		</view>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登录' content="登录后才能继续当前操作"></u-modal>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {

		data() {
			return {
				zhye: '0',
				allday: {
					now: {
						total: null
					},
					month: {
						total: null
					}
				},
				shows: false,
				form: {
					img: '../../static/img/home/log.png',
					num: '',
					payee: '',
					fpxx: '',
					fp: '',
					orders:''
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
		onHide() {
			this.shows = false
		},
		onShow() {
			this.iPhone()
			this.getlists()
			if (uni.getStorageSync('num')) {
				this.getsp()
				const num = JSON.parse(uni.getStorageSync('num'))
				homeApi.businesstxjs({id:num.id}).then(res=>{
					this.zhye=res.data.cashOut==null?'':res.data.cashOut
					this.form.company = res.data.company==null?'':res.data.company
					this.form.payee = res.data.payee==null?'':res.data.payee
					if (res.data.personInvoiceHead) {
						this.form.fp = res.data.personInvoiceHead
					} else if (res.data.companyInvoiceHead) {
						this.form.fp = res.data.companyInvoiceHead
					} else {
						this.form.fp = ''
					}
				})
				this.form.num = num.mobile
			} else {
				this.shows = true
			}

		},
		filters: {
			sr(val) {
				if (val != null) {
					return val
				} else {
					return '暂无数据'
				}
			},
			srs(val) {
				if (val != null) {
					return val
				} else {
					return '暂无数据'
				}
			}
		},
		methods: {
			getsp(){
				const objs = JSON.parse(uni.getStorageSync('num'))
				const xtDmb = JSON.parse(uni.getStorageSync('xtDmb'))
				xtDmb
				homeApi.spnum(JSON.stringify({
					id:xtDmb.id,
					spbm:''
				})).then(res=>{
					this.form.orders=res.data==null?0:res.data.length+'件'
				})
			},
			dl() {
				uni.navigateTo({
					url: '/pages/login/logs'
				});
			},
			getlists() {
				if (uni.getStorageSync('num')) {
					const objs = JSON.parse(uni.getStorageSync('num'))
					var currTime = new Date()
					var year = currTime.getFullYear();
					var month = currTime.getMonth() + 1
					var day = currTime.getDate();
					homeApi.outam({
						id: objs.id,
						month: month,
						year: year
					}).then(res => {
						this.allday = res.data
					})
				} else {
					this.shows = true
				}

			},
			dl() {
				if (uni.getStorageSync('num')) {



				} else {
					uni.navigateTo({
						url: '/pages/login/logs'
					});
				}
			},
			xgsj() {
				if (uni.getStorageSync('num')) {
					uni.navigateTo({
						url: '/pages/iphon/iphon'
					});
				} else {
					this.shows = true
				}
			},
			
			ddgl() {
				if (uni.getStorageSync('num')) {
					uni.navigateTo({
						url: '/pages/orderse/orderse'
					});
				} else {
					this.shows = true
				}
			
			},
			xgzh() {
				if (uni.getStorageSync('num')) {
					uni.navigateTo({
						url: '/pages/zaH/zhxx/zhxx'
					});
				} else {
					this.shows = true
				}

			},
			mrbb() {
				if (uni.getStorageSync('num')) {
					uni.navigateTo({
						url: '/pages/baob/baob'
					});
				} else {
					this.shows = true
				}

			},
			skzh() {
				if (uni.getStorageSync('num')) {
					uni.navigateTo({
						url: '/pages/zaH/zaH'
					});
				} else {
					this.shows = true
				}

			},
			fpxx() {
				if (uni.getStorageSync('num')) {
					uni.navigateTo({
						url: '/pages/invoice/invoice'
					});
				} else {
					this.shows = true
				}

			},
			iPhone() {



			}


		}
	}
</script>

<style scoped lang="scss">
	
	.fsmx{
		/deep/.u-border-bottom:after{
			border-bottom-width: 0px !important;

			}
	}
	.headcnms{
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-left: 24rpx;
	}
	/deep/.u-cell {
		width: 650rpx !important;
		margin: 0 auto !important;
		padding: 24rpx 0 !important
	}
	.bgdtp {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	page {
		height: 100%;
	}

	.app {
		height: 100%;
	}

	/deep/.u-mask-zoom {
		// background-color: transparent !important;
	}

	/deep/.u-mode-center-box {
		border: 1px solid #F5F5F5;
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
			position: relative;
			z-index: 9;
			margin-top: 175rpx;

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
				font-family: dinbold;
				font-weight: 400;
				line-height: 40rpx;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}
		}
	}
	
	/deep/.u-cell__value {
		overflow: hidden; /*自动隐藏文字*/
		
		text-overflow: ellipsis;/*文字隐藏后添加省略号*/
		
		white-space: nowrap;/*强制不换行*/
	}

	.xzt {
		font-size: 20rpx !important;
	}

	.app {
		padding: 24rpx 24rpx 0;

		.bodys {
			position: relative;
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
				position: absolute;
				z-index: 999;
				top: 102rpx;
				left: 80rpx;
				margin-bottom: 34rpx;
				color: #fff;
				font-size: 26rpx;

				text {
					width: 100%;
					height: 80rpx;
					font-size: 64rpx;
					font-family: dinbold;
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

				view,
				.nkname {
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
