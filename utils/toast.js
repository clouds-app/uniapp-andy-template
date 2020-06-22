export default {
	message(msg){
		uni.showToast({
		    title: msg,
		    duration: 2000,
			position: 'center',
			icon: 'none'
		});
	},
	hide(){
		uni.hideToast()
		uni.hideLoading()
	},
	loading(){
		uni.showLoading({
		    title: '加载中'
		});
	},
	success(msg){
		uni.showToast({
		    title: msg,
		    duration: 2000,
			position: 'center'
		});
	}
	
}