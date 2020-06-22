import uni_request from './uni_request.js'
//import appConst from '../enums/app-const.js'
//import cache from './cache.js'
import config from '../config/config.js'
//import router from './router.js'

const request = uni_request({ // 有效配置项只有三个
    baseURL: config.baseUrl.dev, //baseURL
    timeout: 20000 ,// 超时时间
	header:{
		token:'123'
	}
})

request.interceptors.request.use(async (config, ...args) => {
	//服务请求时，需要携带token
	//获取客户端缓存的token
	// let clientToken = cache.get(appConst.CLIENT_TOKEN_NAME)
	// if(clientToken && clientToken != null || clientToken != ''){
	// 	config.header[appConst.SERVER_TOKEN_NAME] = clientToken
	// }
    return config
})


request.interceptors.response.use((response, ...args) => { // 响应拦截器（可以设置多个, 同时可以也可以使用异步方法）
   /* const { data: res } = response // args[0] method args[1] url args[3] data
    await new Promise(resolve => setTimeout(() => resolve(), 3000))
    if (res.code === 200) {
        console.log('响应拦截器， 会阻塞 3 s')
    } */
	//console.log('服务器返回:'+JSON.stringify(response.data))
	//没有登陆，跳转到登陆
	if(response.data.code === 400 || response.data.code === 10007){
		//把缓存清除
		// cache.clear()
		// router.reLaunch('/pages/login/login2')
	}
    return response
})

request.onerror = async (...args) => { // 请求失败统一处理方法（可以也可以使用异步方法）
	console.log('网络请求失败了', `url为${args[1]}`)
}

let _request = {
	get(url,data){
		return new Promise(function(resolve, reject){
			request.get(url,data).then(res => {
				if(res.success){
					resolve(res.result)
				}else{
					let msg = res.message;
					if(msg === undefined || msg === null || msg === ''){
						msg = '业务执行失败'
					}
					reject(msg)
				}
			}).catch(err => {
				reject(err)
			})
		})
		
	},
	post(url,data){
		return new Promise(function(resolve, reject){
			request.post(url,data).then(res => {
				if(res.success){
					resolve(res.result)
				}else{
					let msg = res.message;
					if(msg === undefined || msg === null || msg === ''){
						msg = '业务执行失败'
					}
					reject(msg)
				}
			}).catch(err => {
				reject(err)
			})
		})
		
	}
}

export default _request