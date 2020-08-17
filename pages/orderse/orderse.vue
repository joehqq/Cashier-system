<template>
	<view class="app1">
		<view class="app">
			<view class="csa">
				<view class="head">
					<image src="../../static/image/sc.png" mode=""></image>
					<u-input :clearable='false' class="sear" placeholder="搜索货号/名称" @confirm="sera()" v-model="searval" type="search"
					 :border="false" />
				</view>
				<view class="ssk" v-if="isss">
					<text>“{{searvals}}”筛选结果：</text>
					<image @click="delss" src="../../static/img/home/yq.png" mode=""></image>
				</view>
			</view>
			<view class="head headnm">

			</view>
			<view class="ssk ssknm" v-if="isss">

			</view>
			<view class="qhbox">
				<image class="xz" v-show="type==1" src="../../static/image/qh.png" mode=""></image>
				<image class="mxz" v-show="type==2" src="../../static/image/qh1.png" mode=""></image>
				<view class="xzbox">
					<view class="qb" :class="type==1?'font':''" @click="add(1)">
						全部
					</view>
					<view class="yx" :class="type==2?'font':''" @click="add(2)">
						已选
					</view>
				</view>
			</view>

			<view class="center" :style="{top:isss?'287rpx':'216rpx'}">
				<view class="centerbox" v-if="type==1" :class="index==list.length-1?'clerboer':''" v-for="(item,index) in list"
				 :key='index'>
					<view class="num">
						{{item.spbm}}
						<text class="nickname">{{item.spmc}}</text>
					</view>
					<u-switch @change="del(item.flang,item.id,item.spbm,item.spmc)" v-model="item.flang" active-color="#7CC457"
					 inactive-color="#BBBBBB"></u-switch>
				</view>
				<view v-if="type==2" class="centerbox" :class="index==lists.length-1?'clerboer':''" v-for="(item,index) in lists"
				 :key='index'>
					<view class="num">
					
						{{item.spbm}}
						<text class="nickname">{{item.spmc}}</text>
					</view>
					<u-switch @change="del(item.flang,item.id,item.spbm,item.spmc)" v-model="item.flang" active-color="#7CC457"
					 inactive-color="#BBBBBB"></u-switch>
				</view>
				<view class="asdimg" v-if="hga">
					<image src="../../static/img/home/zwph.png" mode=""></image>
					<view>
						暂无商品
					</view>
					<text>老板快去添加吧 !</text>
				</view>
			</view>
			<u-toast ref="uToast" />
			<!-- 	<view class="footbox">
				<view class="leftbox">
					<view class="foot">
						合计({{list.length}})<text class="fh">¥</text> <text class="rednum"> 61.</text><text class="cnmui">32</text>
					</view>
					<view class="yxz">
						已选择  105斤
					</view>
				</view>
				<view class="qzf">
					去支付
				</view>
			</view> -->

		</view>

	</view>
</template>

<script>
	import homeApi from '../../api/home.js'
	export default {
		data() {
			return {
				searval: '',
				searvals: '',
				type: 1,
				checked: false,
				list: [],
				isss: false,
				lists: []
			}
		},
		computed: {
			hga() {
				if (this.type == 1 && this.list.length) {
					return false
				}
				if (this.type == 1 && !this.list.length) {
					return true
				}
				if (this.type == 2 && !this.lists.length) {
					return true
				}
				if (this.type == 2 && this.lists.length) {
					return false
				}

			}
		},
		async onLoad() {
			this.getlist()
			const objs = JSON.parse(uni.getStorageSync('xtDmb'))
			uni.setNavigationBarTitle({
				title: objs.mc == null ? '洪湾渔港' : `洪湾渔港#${objs.sm}`
			})
			//         await  uni.login({
			//             provider: 'weixin',
			//             success: function (loginRes) {
			//              uni.setStorageSync('code',loginRes.code)
			//             }
			//  }); 
			// await this.getopenid()
		},
		methods: {
			delss() {
				this.searvals = ''
				this.searval = ''
				this.getlist()
				this.type = 1
				this.isss = false
			},
			sera(e) {
				if (this.searval) {
					this.isss = true
					this.searvals = this.searval
				} else {
					this.isss = false
					this.searvals = this.searval
				}
				this.type = 1
				this.getlist()

			},
			del(val, val1, val2, val3) {
				if (val) {
					const objs = JSON.parse(uni.getStorageSync('num'))
					const obj = {
						bm: objs.bm,
						mc: '',
						spbm: val2,
						spmc: val3
					}
					homeApi.add(JSON.stringify(obj)).then(res => {
						if (res.code == 100) {
							this.$refs.uToast.show({
								title: '操作成功',
								type: 'default'
							})
						} else {
							this.$refs.uToast.show({
								title: '操作失败',
								type: 'default'
							})
						}
					})
				} else {
					const objs = JSON.parse(uni.getStorageSync('num'))
					homeApi.del(JSON.stringify({
						bm: objs.bm,
						spbm: val2
					})).then(res => {
						if (res.code == 100) {
							this.$refs.uToast.show({
								title: '操作成功',
								type: 'default'
							})
						} else {
							this.$refs.uToast.show({
								title: '操作失败',
								type: 'default'
							})
						}
					})
				}
			},
			// getsp(){
			// 	homeApi.spnum({
			// 		id:objs.id,
			// 		spbm:''
			// 	}).then(res=>{
			// 		this.lists=res.data
			// 	})
			// },
			async getlist() {

				const arr = []
				const objs = JSON.parse(uni.getStorageSync('num'))
				const xtDmb = JSON.parse(uni.getStorageSync('xtDmb'))
				const obj = {
					current: null,
					size: null,
					spbm: this.searval
				}
				await homeApi.spnum(JSON.stringify({
					id: xtDmb.id,
					spbm: ''
				})).then(res => {
					this.lists = res.data
					this.lists.map(ele => {
						this.$set(ele, 'flang', true)
					})
					res.data.map(ele => {
						arr.push({
							spbm: ele.spbm
						})
					})
				})
				await homeApi.list(JSON.stringify(obj)).then(res => {
					this.list = res.data.records
					this.list.map((ele, index) => {
						this.$set(ele, 'flang', '')
						arr.map(uls => {
							if (ele.spbm == uls.spbm) {
								// this.$set(ele, 'flang', true)
								return ele.flang = true
							}
						})
					})
				})
			},
			add(val) {
				if (val == 2) {
					this.type = 2
				} else {
					this.type = 1
				}
				this.getlist()
			},
			getopenid() {
				homeApi.wx({
					jsCode: uni.getStorageSync('code')
				}).then(res => {
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.csa {
		position: fixed;
		top: 12rpx;
		left: 24rpx;
		z-index: 999;
	}

	.ssk {
		width: 100%;
		height: 80rpx;
		background: rgba(255, 251, 242, 1);
		opacity: 1;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		text {
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 34rpx;
			color: rgba(255, 179, 23, 1);
			opacity: 1;
			margin-left: 24rpx;
		}

		image {
			width: 28rpx;
			height: 28rpx;
			margin-right: 24rpx;
		}
	}

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

	.u-switch--on {}

	/deep/.u-switch__node {
		width: 54rpx !important;
		height: 54rpx !important;
		top: 4rpx !important;
	}

	/deep/.u-switch {
		width: 102rpx !important;
		height: 62rpx !important;

	}

	.dd {
		width: 100%;
		height: 112rpx;
	}

	.qzf {
		width: 192rpx;
		height: 72rpx;
		background: rgba(124, 196, 87, 1);
		opacity: 1;
		line-height: 72rpx;
		text-align: center;
		border-radius: 8rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		opacity: 1;
	}

	.headnm {
		background-image: none !important;
	}

	.ssknm {}

	.yxz {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 34rpx;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
	}

	.footbox {
		width: 750rpx;
		height: 112rpx;
		background: rgba(255, 255, 255, 1);
		opacity: 1;
		padding: 20rpx 24rpx 18rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cnmui {
		color: rgba(250, 77, 77, 1);
		font-size: 32rpx;
	}

	.fh {
		font-size: 28rpx;
		color: rgba(250, 77, 77, 1);
		margin-left: 24rpx;
		height: 32rpx;
	}

	.rednum {
		color: rgba(250, 77, 77, 1);
		font-size:
			40rpx;
		font-family: SF Pro Text;
		color: rgba(250, 77, 77, 1);
		opacity: 1;
	}

	.font {
		font-weight: bold !important;
	}

	.foot {
		display: flex;
		align-items: center;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
	}

	.clerboer {
		border-bottom: 0rpx !important;
	}

	.num {
		font-size: 28rpx;
		font-family: SF Pro Display;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
	}

	.nickname {
		margin-left: 34rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
	}

	.centerbox {
		width: 654rpx;
		height: 136rpx;
		background: rgba(255, 255, 255, 1);
		padding: 24rpx 0 24rpx 18rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #E6E6E6;
	}

	.xz {
		left: 6rpx;
	}

	// .qh{
	// 	background-image: url(../../static/image/qh.png);
	// }
	.xzbox {
		height: 124rpx;
		display: flex;
		align-items: center;

		view {
			line-height: 124rpx;
			height: 124rpx;
			text-align: center;
			width: 50%;
			position: relative;
			z-index: 9;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			opacity: 1;
		}

		.qb {
			text-align: center;

		}
	}

	.qhbox {
		image {
			position: absolute;

			width: 720rpx;
			height: 124rpx;
		}
	}

	.center {
		position: absolute;
		margin: 0 auto;
		top: 216rpx;
		box-sizing: border-box;
		padding: 0 24rpx;
		width: 702rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 15rpx 12rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 0px 0px 16rpx 16rpx;
		margin-bottom: 40px;
	}

	.head {
		display: flex;
		align-items: center;
		background-image: url(../../static/image/jx.png);
		background-size: 100%;
		width: 702rpx;
		height: 64rpx;
		margin-bottom: 24rpx;

		image {
			width: 32rpx;
			height: 32rpx;
			margin-left: 24rpx;
			margin-right: 8rpx;
		}

		.sear {
			color: #BBBBBB;
			font-size: 24rpx;
			caret-color: #7CC457;
			width: 100%;
		}
	}

	.app {
		position: relative;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.app1 {
		margin-bottom: 112rpx;
	}
</style>
