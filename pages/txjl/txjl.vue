<template>
	<view class="app">
		<view class="center">
			<view class="fist" :class="index+1==list.length?'bord':''" v-for="(item,index) in list" :key='index' @click="add(item.id)">
				<view class="centeres">
					<view class="sh">
						{{item.flag |sh}}
						<!-- [ {{item.sdtype |sd}} ] -->
					</view>
					<view class="rq">
						{{item.xsrq}}
					</view>
					<view class="num">
						订单编号 : {{item.xslsh}}
					</view>
				</view>
				<view class="rights" >
					<view>
						- {{ item.zkze }}
					</view>
					<image src="../../static/img/home/y.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="btn" @click="gohome">
			回到首页
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
		methods: {
			add(val) {
				uni.navigateTo({
					url: `/pages/ditle/ditle?id=${val}`
				});
			},
			getlist() {
				const shyc = JSON.parse(uni.getStorageSync('num'))
				const objs = {
					size: null,
					current: null,
					bm: shyc.bm
				}
				homeApi.cash(
					JSON.stringify(objs)
				).then(res => {
					this.list = res.data.records
				})
			},
			gohome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
		filters: {
			zfh(val, val1) {
				console.log(val)
				console.log(val1)
			},
			sh(val) {
				if (val == 0) {
					return '提现成功'
				} else if (val == 1) {
					return '提现成功'
				} else {
					return '提现失败'
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
