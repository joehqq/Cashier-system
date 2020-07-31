<template>
	<view class="app">
		<view class="box">
			<view class="head">
				<view class="gr" :class="type==1?'add':''" @click="gr">
					个人发票
				</view>
				<view class="gr" :class="type==2?'add':''" @click="qy">
					企业发票
				</view>
			</view>
			<view class="center">
					<u-field
					@input="relus"
					:error-message='relu'
					input-align='right'
							v-model="mobile"
							label="发票抬头"
							placeholder="仅支持汉字"
						></u-field>
						<u-field
						v-if="type==2"
						:error-message='reluse'
						@input="regTest"
						input-align='right'
								v-model="mobiles"
								label="税号"
								placeholder="请输入税号"
							></u-field>
			</view>
		</view>
		<view class="btn" @click="gohome">
			保存修改
		</view>
		
	</view>
</template>

<script>
	import homeApi from '../../../api/home.js'
	export default {
		data() {
			return {
				mobile:'',
				mobiles:'',
				type:1,
				relu:false,
				reluse:false
			};
		}, 
		onShow() {
			// {"id":5,"bm":"1","mc":"234234","sm":"234","mobile":"131****8456","openId":"oZCyb5Z2GgAx-OifFcxwUWUyO4Fs","cashOut":99999,"card":"2134",
			// "payee":"ljm","company":"45455656","personInvoiceHead":null,"companyInvoiceHead":null,"companyInvoiceNum":null}
		const obj=JSON.parse(uni.getStorageSync('num'))
		if(this.type==1){
			this.mobile=obj.personInvoiceHead 
		}else{
			this.mobile=obj.companyInvoiceHead 
			this.mobiles=obj.companyInvoiceNum 
		}
		},
		methods:{
			regTest(data){
			 var regExp = /^([1-9]{1})(\d{15}|\d{18})$/; 
			 if(regExp.test(data)){
			 	this.reluse=false
			 }
			 },
			relus(val){
				var reg=/^[\u2E80-\u9FFF]+$/;//Unicode编码中的汉字范围
				if(reg.test(val)){
					this.relu=false
				}
			},
			gr(){
				const obj=JSON.parse(uni.getStorageSync('num'))
				this.type=1
				this.relu=false
				this.reluse=false
				this.mobile=obj.personInvoiceHead
				this.mobiles=''
			},
			qy(){
				const obj=JSON.parse(uni.getStorageSync('num'))
				this.mobiles=obj.companyInvoiceNum
				this.type=2
				this.relu=false
				this.reluse=false
				this.mobile=obj.companyInvoiceHead
			},
			gohome(){
				const obj=JSON.parse(uni.getStorageSync('num'))
					var reg=/^[\u2E80-\u9FFF]+$/;//Unicode编码中的汉字范围
					// var regExp = /^([1-9]{1})(\d{15}|\d{18})$/;
					
				if(this.type==1){
				
					if(reg.test(this.mobile)){
						this.relu=false
					}else{
						this.$u.toast(`请输入正确的发票抬头`);
						return
					}
				}else{
					if(reg.test(this.mobile)){
						this.relu=false
					}else{
							this.$u.toast(`请输入正确的发票抬头`);
						return
					}
					if(this.mobiles){
						this.reluse=false
					}else{
						this.$u.toast(`请输入税号`);
						return
					}
					
					
		     	}
				const oj={
					id:obj.id,
					personInvoiceHead:this.type==1?this.mobile:null,
					companyInvoiceHead:this.type==1?null:this.mobile,
					companyInvoiceNum:this.type==1?null:this.mobiles
				}
			homeApi.businessupdate(JSON.stringify(oj)).then(res=>{
				console.log(res)
				if(res.code==100){
					obj.personInvoiceHead=this.type==1?this.mobile:null
					obj.companyInvoiceHead=this.type==1?null:this.mobile,
					obj.companyInvoiceNum=this.type==1?null:this.mobiles,
					uni.setStorageSync('num',JSON.stringify(obj))
					this.$u.toast(`修改成功`);
				}else{
					this.$u.toast(`修改失败请稍后重试`);
				}
			})
			// uni.redirectTo({
			//   url: '/pages/invoice/invoices/invoices'
			// });
			// uni.redirectTo({
			//     url: '/pages/home/home'
			// });
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.add{
		
		box-shadow:0px 0rpx 0rpx rgba(0,0,0,0.08)!important;
		 border-radius:0 !important;
		 background-color: #fff !important;
		 color: #7CC457 !important;
	}
	.gr{
		background-color: #F9F9F9;
		width: 50%;
		box-shadow:0px 2rpx 12rpx rgba(0,0,0,0.08);
		 border-radius: 16rpx 0 16rpx 0;
		 text-align: center;
		 font-size:28rpx;
		 font-family:PingFang SC;
		 font-weight:bold;
		 color:rgba(51,51,51,1);
		 opacity:1;
		 height: 80rpx;
		 line-height: 80rpx;
	}
	.head{
		display: flex;
		align-items: center;
		background-color: #fff;
	}
	/deep/.u-field{
		padding: 30rpx 28rpx !important;

	}
 .box{
	 width:702rpx;
	 margin: 0 auto;
	 background:rgba(255,255,255,1);
	 box-shadow:0px 2rpx 12rpx rgba(0,0,0,0.08);
	 opacity:1;
 }
</style>
