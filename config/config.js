
export default {
    /**
     * @description 默认页面标题
     */
     title: 'webApp',
    /**
     * @description 是否app 运行环境
     */
    isRunApp: false,//process.env.NODE_ENV === 'production',//is_mobi,//true,// 
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description api请求基础路径 http://120.78.91.203:8082/clerp-app-api/swagger-ui.html
     */
    baseUrl: {
		
	  dev: 'http://192.168.0.218:8080',  // 手机测试服务 http://192.168.0.198:8080
     // dev: 'http://192.168.168.152:8080', // PC 测试服务http://192.168.0.38:8086
      pro: 'http://192.168.0.50:8080',
	  //pro: 'http://120.78.91.203:8083',
    },
    
	//baseImgUrl:'http://120.78.91.203:8083/clerp-app-api',
	baseImgUrl:'http://192.168.1.180:8080/clerp-app-api',

    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'home',
    /**
     * @description 需要加载的插件
     */
    plugin: {
      // 'error-store': {
      //   showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      //   developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
      // }
    }
  }
  