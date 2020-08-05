<template>
	<view class="app">
		<view class="head">
			<view class="zh">
				账户信息修改
			</view>
			<view class="gs">
				<view style="width: 160rpx;">
					公司名称
				</view>
				<u-input style="width: 100%;margin-right: 24rpx;
" v-model="value" type="text" />
			</view>
		</view>

		<u-button class="btn" @click="updata" :ripple="true">保存修改</u-button>
		<u-modal v-model="shows" @confirm='dl' title="暂未登录" show-cancel-button=true confirm-text='去登录' content="登录后才能继续当前操作"></u-modal>
	</view>
</template>

<script>
	import homeApi from '../../../api/home.js'
	export default {
		data() {
			return {
				value: '',
				shows: false
			};
		},
		onShow() {
			if (uni.getStorageSync('num')) {
				const nums = JSON.parse(uni.getStorageSync('num'))
				this.value = nums.company
			} else {
				this.shows = true
			}
		},
		methods: {
			dl() {
				uni.navigateTo({
					url: '/pages/login/logs'
				});
			},
			updata() {

				if (uni.getStorageSync('num')) {
					let num = JSON.parse(uni.getStorageSync('num'))
					homeApi.businessupdate(JSON.stringify({
						company: this.value,
						id: num.id
					})).then(res => {
						if (res.code == 100) {
							num.company = this.value
							uni.setStorageSync('num', JSON.stringify(num))
							uni.switchTab({
								url: '/pages/min/min'
							});
							this.$u.toast('修改成功');
						} else {
							this.$u.toast('修改失败，请稍后重试');
						}
					})
				} else {
					this.shows = true
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-input {
		width: 100%;
	}

	/deep/.u-btn--default {
		background-color: rgba(124, 196, 87, 1) !important;
		color: #fff !important;
	}

	.btn {
		width: 544rpx;
		height: 80rpx;
		text-align: center;
		left: 50%;
		transform: translateX(-50%);
		opacity: 1;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 80rpx;
		bottom: 300rpx;
		color: rgba(255, 255, 255, 1);
		opacity: 1;
		position: fixed;

	}

	.gs {
		margin-left: 24rpx;
		width: 100%;
		height: 96rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 96rpx;
		color: rgba(153, 153, 153, 1);
		opacity: 1;
		display: flex;
		justify-content: start;
		align-items: center;

		view {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 40rpx;
			color: rgba(153, 153, 153, 1);
			opacity: 1;
			margin-right: 40rpx;
		}
	}

	.zh {
		margin-top: 20rpx;
		width: 100%;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 40rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
		margin-left: 24rpx;
	}

	.head {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
		height: 172rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 12rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 16rpx;
	}

	.app {
		padding: 24rpx;
		box-sizing: border-box;
	}
</style>
