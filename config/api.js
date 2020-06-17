import {
	apiBaseUrl
} from './config.js';
import * as common from './common.js' //引入common
import * as db from './db.js' //引入common
// 需要登陆的，都写到这里，否则就是不需要登陆的接口
const methodsToken = [
	'user.info',
	'user.editinfo',
	'user.changeavatar',
	'user.logout',
	'user.addgoodsbrowsing',
	'user.delgoodsbrowsing',
	'user.goodsbrowsing',
	'user.goodscollection',
	'user.goodscollectionlist',
	'user.vuesaveusership',
	'user.saveusership',
	'user.getshipdetail',
	'user.setdefship',
	'user.editship',
	'user.removeship',
	'user.getusership',
	'user.pay',
	'user.orderevaluate',
	'user.getuserdefaultship',
	'user.issign',
	'user.sign',
	'user.mypoint',
	'user.userpointlog',
	'user.getbankcardlist',
	'user.getdefaultbankcard',
	'user.addbankcard',
	'user.removebankcard',
	'user.setdefaultbankcard',
	'user.getbankcardinfo',
	'user.editpwd',
	'user.forgotpwd',
	'user.recommend',
	'user.balancelist',
	'user.sharecode',
	'user.cash',
	'user.cashlist',
	'user.myinvite',
	'user.activationinvite',
];

const post = (method, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});

	// 判断token是否存在
	if (methodsToken.indexOf(method) >= 0) {
		// 获取用户token
		let userToken = db.get("userToken");
		if (!userToken) {
			common.jumpToLogin();
			return false;
		} else {
			data.token = userToken;
		}
	}

	data.method = method;

	uni.request({
		url: apiBaseUrl + 'api.html',
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (!result.status) {
				// 登录信息过期或者未登录
				if (result.data === 14007 || result.data === 14006) {
					db.del("userToken");
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								// #ifdef H5 || APP-PLUS
								uni.navigateTo({
									url: '/pages/login/login/index1'
								})
								// #endif
								// #ifdef MP-WEIXIN || MP-ALIPAY	
								uni.navigateTo({
									url: '/pages/login/choose/index',
									animationType: 'pop-in',
									animationDuration: 200
								});
								// #endif
							}, 1000)
						}
					});
				}
			}
			callback(result);
		},
		complete: () => {
			uni.hideLoading();
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
	});

}

//插件post
const pluginsPost = (method, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});

	// 判断token是否存在
	if (methodsToken.indexOf(method) >= 0) {
		// 获取用户token
		let userToken = db.get("userToken");
		if (!userToken) {
			common.jumpToLogin();
			return false;
		} else {
			data.token = userToken;
		}
	}
	uni.request({
		url: apiBaseUrl + 'plugins/' + method + '.html',
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (!result.status) {
				// 登录信息过期或者未登录
				if (result.data === 14007 || result.data === 14006) {
					db.del("userToken");
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								// #ifdef H5 || APP-PLUS
								uni.navigateTo({
									url: '/pages/login/login/index1'
								})
								// #endif
								// #ifdef MP-WEIXIN || MP-ALIPAY	
								uni.navigateTo({
									url: '/pages/login/choose/index',
									animationType: 'pop-in',
									animationDuration: 200
								});
								// #endif
							}, 1000);
						}
					});
				}
			}
			callback(result);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});

}

const get = (url, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	uni.request({
		url: url,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			callback(response.data);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});
}

const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 1000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 1000);
		}
	});
}

// 文件上传
export const uploadFiles = (callback) => {
	uni.chooseImage({
		success: (chooseImageRes) => {
			uni.showLoading({
				title: '上传中...'
			});
			const tempFilePaths = chooseImageRes.tempFilePaths;
			const uploadTask = uni.uploadFile({
				url: apiBaseUrl + 'api.html', //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				fileType: 'image',
				name: 'file',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				formData: {
					'method': 'images.upload',
					'upfile': tempFilePaths[0]
				},
				success: (uploadFileRes) => {
					callback(JSON.parse(uploadFileRes.data));
				},
				fail: (error) => {
					if (error && error.response) {
						showError(error.response);
					}
				},
				complete: () => {
					setTimeout(function() {
						uni.hideLoading();
					}, 250);
				}
			});
			// 					uploadTask.onProgressUpdate((res) => {
			//             console.log('上传进度' + res.progress);
			//             console.log('已经上传的数据长度' + res.totalBytesSent);
			//             console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			//
			//             // 测试条件，取消上传任务。
			//             if (res.progress > 50) {
			//                 uploadTask.abort();
			//             }
			// 					});
		}
	});
}

// 上传图片
export const uploadImage = (num, callback) => {
	uni.chooseImage({
		count: num,
		success: (res) => {
			uni.showLoading({
				title: '上传中...'
			});
			let tempFilePaths = res.tempFilePaths
			for (var i = 0; i < tempFilePaths.length; i++) {
				uni.uploadFile({
					url: apiBaseUrl + 'api.html',
					filePath: tempFilePaths[i],
					fileType: 'image',
					name: 'file',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[i]
					},
					success: (uploadFileRes) => {
						callback(JSON.parse(uploadFileRes.data));
					},
					fail: (error) => {
						if (error && error.response) {
							showError(error.response);
						}
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 250);
					},
				});
			}
		}
	});
}

// 获取店铺配置
export const shopConfig = (callback) => get(apiBaseUrl + 'api/common/jshopconf', callback);

// 用户注册
export const reg = (data, callback) => post('user.reg', data, callback);

// 用户登录
export const login = (data, callback) => post('user.login', data, callback);

// 用户信息
export const userInfo = (data, callback) => post('user.info', data, callback);

// 上传头像
export const changeAvatar = (data, callback) => post('user.changeavatar', data, callback);

// 编辑用户信息
export const editInfo = (data, callback) => post('user.editinfo', data, callback);

// 发送短信验证码
export const sms = (data, callback) => post('user.sms', data, callback);

// 短信验证码登录
export const smsLogin = (data, callback) => post('user.smslogin', data, callback);

// 退出登录
export const logout = (data, callback) => post('user.logout', data, callback);


// 获取用户的收货地址列表
export const userShip = (data, callback) => post('user.getusership', data, callback);

// 获取用户默认收货地址
export const userDefaultShip = (data, callback) => post('user.getuserdefaultship', data, callback);

// 存储用户收货地址
export const saveUserShip = (data, callback) => post('user.vuesaveusership', data, callback);

// 微信存储收货地址
export const saveUserShipWx = (data, callback) => post('user.saveusership', data, callback);

//获取区域ID
export const getAreaId = (data, callback) => post('user.getareaid', data, callback);

// 获取收货地址详情
export const shipDetail = (data, callback) => post('user.getshipdetail', data, callback);

// 收货地址编辑
export const editShip = (data, callback) => post('user.editship', data, callback);

// 收货地址删除
export const removeShip = (data, callback) => post('user.removeship', data, callback);

// 设置默认收货地址
export const setDefShip = (data, callback) => post('user.setdefship', data, callback);

// 添加商品浏览足迹
export const addGoodsBrowsing = (data, callback) => post('user.addgoodsbrowsing', data, callback);

// 删除商品浏览足迹
export const delGoodsBrowsing = (data, callback) => post('user.delgoodsbrowsing', data, callback);

// 获取商品浏览足迹
export const goodsBrowsing = (data, callback) => post('user.goodsbrowsing', data, callback);

// 商品收藏 关注/取消
export const goodsCollection = (data, callback) => post('user.goodscollection', data, callback);

// 获取商品收藏关注列表
export const goodsCollectionList = (data, callback) => post('user.goodscollectionlist', data, callback);


// 支付接口
export const pay = (data, callback) => post('user.pay', data, callback);

// 订单评价接口
export const orderEvaluate = (data, callback) => post('user.orderevaluate', data, callback);

// 判断是否签到
export const isSign = (data, callback) => post('user.issign', data, callback);

// 签到接口
export const sign = (data, callback) => post('user.sign', data, callback);

// 我的积分
export const myPoint = (data, callback) => post('user.mypoint', data, callback);

// 积分记录
export const pointLog = (data, callback) => post('user.userpointlog', data, callback);

// 获取店铺设置
export const getSetting = (data, callback) => post('user.getsetting', data, callback);

// 获取商户配置信息
export const getSellerSetting = (data, callback) => post('user.getsellersetting', data, callback);

// 获取我的银行卡列表
export const getBankCardList = (data, callback) => post('user.getbankcardlist', data, callback);

// 获取默认的银行卡
export const getDefaultBankCard = (data, callback) => post('user.getdefaultbankcard', data, callback);

// 添加银行卡
export const addBankCard = (data, callback) => post('user.addbankcard', data, callback);

// 删除银行卡
export const removeBankCard = (data, callback) => post('user.removebankcard', data, callback);

// 设置默认银行卡
export const setDefaultBankCard = (data, callback) => post('user.setdefaultbankcard', data, callback);

// 获取银行卡信息
export const getBankCardInfo = (data, callback) => post('user.getbankcardinfo', data, callback);

// 获取银行卡组织信息
export const getBankCardOrganization = (data, callback) => post('user.getbankcardorganization', data, callback);

// 用户修改密码
export const editPwd = (data, callback) => post('user.editpwd', data, callback);

// 用户找回密码
export const forgotPwd = (data, callback) => post('user.forgotpwd', data, callback);

// 获取用户余额明细
export const getBalanceList = (data, callback) => post('user.balancelist', data, callback);

// 用户推荐列表
export const recommendList = (data, callback) => post('user.recommend', data, callback);

// 邀请码
export const shareCode = (data, callback) => post('user.sharecode', data, callback);

// 用户提现
export const userToCash = (data, callback) => post('user.cash', data, callback);
