<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			   uni.setStorageSync('code',loginRes.code)
			  }
			}); 
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	  @import "colorui/main.css";
	    @import "colorui/icon.css";
	    @import "base64/dinbold.css";
	@import "uview-ui/index.scss";
	body{
		background: #FFFFFF !important;
	}
</style>
