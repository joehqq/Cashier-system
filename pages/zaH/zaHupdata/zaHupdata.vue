<template>
	<view class="app">
		<view class="box">
			<view class="head">
				<view class="headtext">
					修改账号信息
				</view>
				<view class="center">
						<u-input v-model="mobile" 	placeholder="请输入真实姓名" type="text"  />
						<view class="lin">
							
						</view>
						<u-input v-model="mobiles" 	 placeholder="仅支持浦发银行储蓄卡" type="number"  />
						<!-- <u-field
						@input="relus"
								v-model="mobile"
								placeholder="请输入真实姓名"
							></u-field>
							<u-field
							:error-message='reluse'
							@input="regTest"
									v-model="mobiles"
									placeholder="仅支持浦发银行储蓄卡"
								></u-field> -->
				</view>
			</view>
		</view>
		<view class="btn" @click="gohome">
			保存修改
		</view>
		<view class="btntexts">
			仅支持浦发银行储蓄卡，开卡请联系浦发银行
		</view>
		<view class="tsbox" v-if="xgcg">
			{{texts}}
		</view>
	</view>
</template>

<script>
	import homeApi from '../../../api/home.js'
	export default {
		data() {
			return {
				texts:'',
				
				border:true,
				mobile:'',
				mobiles:'',
				reluse:false,
				xgcg:false
			};
		},
		onLoad() {
			if(uni.getStorageSync('num')){
				const shyc =JSON.parse(uni.getStorageSync('num'))
				// uni.getStorageSync('num')
				this.mobile=shyc.payee
				this.mobiles=shyc.card
			}
			
		
		},
		methods:{
			gohome(){
				
				    
					// var reg=/^[\u2E80-\u9FFF]+$/;//Unicode编码中的汉字范围
					// if(!reg.test(this.mobile)){
					// 	this.texts='请输入正确姓名'
					// 	this.xgcg=true
					// 	setTimeout(function(){ that.xgcg=false }, 1000);
					// 	return
					// }
					var regExp = /^(622516|622517|622518|622521|622522|622523|984301|984303|621352|621793|621795|621796|621351|621390|621792|621791)\d{10}$/g;
					const that =this
					if(!this.mobile){
						this.texts='姓名不能为空'
						this.xgcg=true
						setTimeout(function(){ that.xgcg=false }, 1000);
						return
					}
					if(!regExp.test(this.mobiles)){
						this.texts='请输入正确的浦发银行卡号'
						this.xgcg=true
						setTimeout(function(){ that.xgcg=false }, 1000);
						return
					}else{
						const shyc =JSON.parse(uni.getStorageSync('num'))
						const obj={
							id:shyc.id,
							payee:this.mobile,	
							card:this.mobiles
							// payee收款人 card卡  bm编号
						}
						homeApi.yhkupdate(JSON.stringify(obj)).then(res=>{
							if(res.code==100){
								let datas =JSON.parse(uni.getStorageSync('num'))
								datas.payee=this.mobile
								datas.card=this.mobiles
								uni.setStorageSync('num',JSON.stringify(datas))
								this.texts='修改成功'
								setTimeout(function() {
									// uni.reLaunch({
									//   url: '/pages/zaH/zaH'
									// });
									uni.navigateBack({
									    delta: 1
									});
								}, 300);
								
								this.xgcg=true
								setTimeout(function(){ that.xgcg=false }, 1000);
								
							}else{
								this.texts=res.message
							}
						})
						
					}
			
			// uni.redirectTo({
			//     url: '/pages/home/home'
			// });
			}
		
			
		}
	}
</script>

<style lang="scss" scoped>
	.btntexts{
		width:100%;
		text-align: center;
		position: fixed;
		bottom: 250rpx;
		left: 50%;
		transform: translateX(-50%);
		height:34rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:34rpx;
		opacity:1;
		color:rgba(153,153,153,1);
	}
	.tsbox{
		width:360rpx;
		height:112rpx;
		background:rgba(17,17,17,1);
		opacity:0.7;
		text-align: center;
		line-height: 112rpx;
		border-radius:10rpx;
		position: fixed;
		top: 580rpx;
		color: #FFFFFF;
		left: 50%;
		transform: translateX(-50%);
	}
	.btn{
		position: fixed;
		bottom: 298rpx;
		left: 50%;
		transform: translateX(-50%);
		width:544rpx;
		height:80rpx;
		background:rgba(124,196,87,1);
		opacity:1;
		border-radius:8rpx;
		text-align: center;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:80rpx;
		color:rgba(255,255,255,1);
		opacity:1;
	}
	.lin{
		width:654rpx;
		margin: 16rpx auto;
		height:1rpx;
		background:#E5E5E5;
		opacity:1;
	}
	.headtext{
		height:40rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.head{
		padding-left:24rpx ;
		padding-right:24rpx ;
		box-sizing: border-box;
		overflow: hidden;
	}
	.box{
		margin: 44rpx auto 0;
		width:702rpx;
		height:272rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2rpx 12rpx rgba(0,0,0,0.08);
		opacity:1;
		border-radius:16rpx;
	}
</style>
