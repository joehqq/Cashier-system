<template>
	<view class="app">
		<view v-if="list.length">
			<view class="center">
				<view class="fist" :class="index+1==list.length?'bord':''" v-for="(item,index) in list" :key='index' @click="add(item.id,1)">
					<view class="centeres">
						<view class="sh">
							{{item.type |sh(item.status)}}
							<!-- [ {{item.sdtype |sd}} ] -->
						</view>
						<view class="rq">
							{{item.createTime}}
						</view>
						<view class="num">
							订单编号 : {{item.xslsh}}
						</view>
					</view>
					<view class="rights">
						<view>
							- <text class="cuiz">{{item.bsGet}}</text>

						</view>
						<image src="../../static/img/home/y.png" mode=""></image>
					</view>
				</view>
			</view>

		</view>
		<view v-else class='imgbox'>
			<image src="../../static/img/home/zwph.png" mode=""></image>
			<view class="zw">
				暂无提现记录
			</view>
			<view class="xm">
				小MO这里暂无提现记录哟~
			</view>
			<view class="qsz" @click="gohome">
				回到首页
			</view>
		</view>
	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getlist()
		},
		async onPullDownRefresh() {
			if (uni.getStorageSync('num')) {
				await this.getlist()
			} else {
				this.shows = true
			}

			uni.stopPullDownRefresh();
			this.$u.toast(`刷新成功`);
		},
		methods: {
			hasDot(num) {
				if (!isNaN(num)) {
					return ((num + '').indexOf('.') != -1) ? num : num.toFixed(2);
				}
			},
			add(val, val1) {
				uni.navigateTo({
					url: `/pages/ditle/ditle?id=${val}&type=${val1}`
				});
			},
			getlist() {
				const shyc = JSON.parse(uni.getStorageSync('num'))
				homeApi.txjl({
					size: null,
					current: null,
					id: shyc.id
				}).then(res => {
					if (res.data.length > 0) {
						this.list = res.data
						this.list.map(e => {
							e.zkze = this.hasDot(e.zkze)
						})
					}

				})
			},
			gohome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
		filters: {
			zfh(val, val1) {},
			sh(val, val1) {
				let str = ''
				if (val == 0) {
					str = '【自动】'
				} else {
					str = '【手动】'
				}
				if (val1 == 0) {
					return '提现失败' + str
				} else if (val1 == 1) {
					return '提现成功' + str
				} else {
					return '审核中' + str
				}
			},
			sd(val) {
				if (val == 1) {
					return '手动'
				} else {
					return '自动'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cuiz {
		font-size: 32rpx !important;
	}

	.cuiend {
		font-size: 16rpx !important;
	}

	.imgbox {
		image {
			width: 300rpx;
			height: 260rpx;
			display: block;
			margin: 206rpx auto 54rpx;
		}

		.zw {
			width: 100%;
			height: 40rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 32rpx;
			color: rgba(51, 51, 51, 1);
			opacity: 1;
			margin: 0 auto 8rpx;
		}

		.qsz {
			width: 100%;
			font-size: 24rpx;
			color: #7CC457;
			text-align: center;
		}

		.xm {
			width: 100%;
			height: 78rpx;
			font-size: 24rpx;
			text-align: center;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 22rpx;
			color: #999999;
			opacity: 1;
			margin-bottom: 10rpx;
		}
	}

	.bord {
		border-bottom: none !important;
	}

	.btn {
		position: fixed;
		bottom: 298rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 544rpx;
		height: 80rpx;
		background: rgba(124, 196, 87, 1);
		opacity: 1;
		border-radius: 8rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 80rpx;
		color: rgba(255, 255, 255, 1);
		opacity: 1;
	}

	.num {
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 34rpx;
		color: rgba(153, 153, 153, 1);
		opacity: 1;
	}

	.rq {
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 34rpx;
		color: rgba(153, 153, 153, 1);
		opacity: 1;
		margin-bottom: 8rpx;
	}

	.sh {
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 40rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
		margin-bottom: 12rpx;
	}

	.rights {
		display: flex;
		justify-content: space-between;
		align-items: center;

		view {
			font-size: 32rpx;
			font-family: SF Pro Text;
			font-weight: 600;
			color: rgba(153, 153, 153, 1);
			opacity: 1;
		}

		image {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.jes {
		height: 48rpx;
		font-size: 32rpx;
		font-family: SF Pro Text;
		font-weight: 600;
		line-height: 48rpx;
		color: rgba(124, 196, 87, 1);
		opacity: 1;
	}

	.jes1 {
		height: 48rpx;
		font-size: 32rpx;
		font-family: SF Pro Text;
		font-weight: 600;
		line-height: 48rpx;
		color: rgba(250, 77, 77, 1);
		opacity: 1;
	}

	.fist {
		margin: 0 auto;
		width: 652rpx;
		height: 176rpx;
		background: rgba(255, 255, 255, 1);
		opacity: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px #E6E6E6 solid;
	}

	.app {
		padding: 24rpx;
		box-sizing: border-box;
	}

	.center {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		padding: 24rpx 26rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 16rpx;
	}
</style>
