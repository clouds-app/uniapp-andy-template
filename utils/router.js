/**
 * 路由与页面跳转
 * https://uniapp.dcloud.io/api/router
 */
import config from '@/config/config.js'
export default {
	navigate(url){
		let webUrl = this.isOpenBrowser(url)
		if(webUrl) {
			//打开网页
			url = `/pages/browser/browser?webUrl=${webUrl}`
		}
		uni.navigateTo({
		    url: url
		})
	},
	redirect(url){
		uni.redirectTo({
		    url: url
		});
	},
	reLaunch(url){
		//关闭所有页面，打开到应用内的某个页面。
		uni.reLaunch({
		    url: url
		});
	},
	tab(url){
		//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
		uni.switchTab({
		    url: url
		});
	},
	back(index){
		//关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
		uni.navigateBack({
		    delta: index
		});
	},
	isOpenBrowser(url){
		//判断是否打开浏览器
		if(url.toLowerCase().indexOf('http://') != -1 || url.toLowerCase().indexOf('https://') != -1){
			return url;
		}
		if(url.indexOf('web:') != -1){
			return config.serverUrl + url.replace('web:','');
		}
	}
}