<template>
	<view class="app">
		<view class="box">
			<view class="head">
				<view class="headtext">
					发票信息
				</view>
				<view class="dxz">
					<u-radio-group  v-model="valuegr" @change="radioGroupChange" width='100%' >
								<u-radio 
								name='gr'
								width='100%'
								 shape="circle"
								  active-color="#7CC457"
								:disabled= 'false'
								@change="gr"
								>
									个人发票
								</u-radio>
								
					</u-radio-group>
					
					<u-radio-group  v-model="valuegs" @change="radioGroupChange" width='100%' >
							<u-radio
							@change="qy" 
							 active-color="#7CC457"
							 shape="circle"
							name='qy'
							:disabled= 'false'
							>
								企业发票
							</u-radio>
								
					</u-radio-group>
				</view>
				
				<!-- <view class="gr" :class="type==1?'add':''" @click="gr">
					个人发票
				</view>
				<view class="gr" :class="type==2?'add':''" @click="qy">
					企业发票
				</view> -->
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
		<view class="btns" @click="gofp">
			选择微信发票
		</view>
		<view class="sx">
			
		</view>
	</view>
</template>

<script>
	import homeApi from '../../../api/home.js'
	export default {
		data() {
			return {
				valuegr:'',
				valuegs:'',
				value: 'gr',
				mobile:'',
				mobiles:'',
				type:1,
				relu:false,
				reluse:false
			};
		}, 
		onLoad() {
		const obj=JSON.parse(uni.getStorageSync('num'))
		if(obj.companyInvoiceHead ){
			this.mobile=obj.companyInvoiceHead
			this.mobiles=obj.companyInvoiceNum 
			this.valuegr=''
			this.valuegs='qy'
			this.type=2
		}else{
			this.type=1
			this.mobile=obj.personInvoiceHead 
			this.valuegr='gr'
			this.valuegs=''
			
		}
		},
		methods:{
			radioChange(e) {
						// console.log(e);
					},
					// 选中任一radio时，由radio-group触发
					radioGroupChange(e) {
						// console.log(e);
					},
			gofp(){
				const that =this
				uni.chooseInvoiceTitle({
				    success(res) {
						if(res.type==1){
							// 个人
							that.valuegr='gr'
							that.valuegs=''
							that.mobile=res.title
							that.type=1
						}else{
							that.type=2
							that.valuegr=''
							that.valuegs='qy'
							// 公司
							that.mobile=res.title
							that.mobiles=res.taxNumber
						}
				  }
				})
			},
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
				this.valuegs=''
			},
			qy(){
				this.valuegr=''
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
					personInvoiceHead:this.type==1?this.mobile:'',
					companyInvoiceHead:this.type==1?'':this.mobile,
					companyInvoiceNum:this.type==1?'':this.mobiles
				}
			homeApi.businessupdate(JSON.stringify(oj)).then(res=>{
				if(res.code==100){
					obj.personInvoiceHead=this.type==1?this.mobile:''
					obj.companyInvoiceHead=this.type==1?'':this.mobile,
					obj.companyInvoiceNum=this.type==1?'':this.mobiles,
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
	.app{
		position: relative;
	}
	.sx{
		width:2rpx;
		height:55rpx;
		background:#E6E6E6;
		opacity:1;
		position: absolute;
		top: 84rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.u-radio__icon-wrap{
		margin-right: 18rpx !important;

	}
	.dxz{
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	.headtext{
		width:100%;
		text-align: left;
		height:40rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		margin-bottom: 20rpx;
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
	.btns{
		position: fixed;
		width:100%;
		height:40rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:40rpx;
		color:rgba(124,196,87,1);
		opacity:1;
		text-align: center;
		bottom: 286rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.btn{
		position: fixed;
		bottom: 394rpx;
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
		flex-wrap: wrap;
		padding: 30rpx 28rpx !important;

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
