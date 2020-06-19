/**
 * @name mixin
 * @description 所有.vue 公共方法
 * @action .vue 中 添加mixin:[name]
 *
 */
import request from '@/libs/request.js';
export default {
  name: 'mixin-base',
  data () {
    return {
		//分页参数设置
		pageSetting:{
					current:1, // 当前页码
					pageSize:20, // 每页条数
					total:0 // 总条数
		},
	  isLoaddingData:false,// 数据是否加载宏....,用于禁用按钮是否可以再次点击
	  otherHeight:0,
	  leftContentHeight:0,
	  avgWidth:90,// v-table 平均宽度
    }
  },
  computed: {
		// 页面的内容区域距离顶部高度
		CustomBarHeight(){
			return this.CustomBar
		}
  },
  methods: {
	  // 通用查询数据
	   postDataBy(url,params){
	  		this.isLoaddingData =true
			this.toast.loading()
	  		return new Promise((resolve, reject) => {
	  			try{
	  				request.post(url,params).then(res =>{
	  					this.toast.hide()
	  					resolve(res)
	  					this.isLoaddingData =false
	  				}).catch(err => {
	  					this.toast.hide()
	  					reject(err)
	  					if(typeof err  === 'string'){
	  						this.toast.message(err)
	  					}else{
	  						this.toast.message('系统繁忙，请稍后再试!')
	  					}
	  					this.isLoaddingData =false
	  				})	
	  			}catch(e){
	  				//TODO handle the exception
	  				this.toast.hide()
	  				this.isLoaddingData =false
	  			}
	  			
	  		})
	   },
	  // 格式化千分符,内置方法 toLocaleString 导致个别安卓微信不支持
	  addThousandthSign(numStr)  {
		  if(!!numStr){
			  let regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
			  return numStr.toString().replace(regForm,"$1,");
		  }else{
				return '0.00'
		  }   
	  },
	  //获取指定内容占用高度,计算剩余高度 单位:PX
	  getOtherContentHeight(className='bodyContentHeight'){
		  return new Promise((resolve, reject) => {
			   let eleHeight=0
			   let _self =this
			   let info = uni.createSelectorQuery().select("."+className);
			  info.boundingClientRect(function(data) { //data - 各种参数
			  　　　  console.log('other Height:'+data.height)  // 获取元素宽度		
			  　　   _self.otherHeight = data.height
			  	  eleHeight = data.height
				  resolve(data.height)
			   }).exec(function (res) {
			   })
		  })
	  },
	  //计算设置表格高度
	  setTableHeight(needOtherHeight=false){
		 
		  if(!needOtherHeight){
			  this.otherHeight = 0
		  }
		try {
			//debugger
		    const res = uni.getSystemInfoSync();
		    // console.log('windowHeight:'+res.windowHeight);
		     console.log('CustomBar:'+this.CustomBar);
		    // console.log('bodyContentHeight:'+this.otherHeight);
			this.leftContentHeight =res.windowHeight -this.CustomBar - this.otherHeight -10
			//console.log('tableHeight:'+this.leftContentHeight);
			return this.leftContentHeight
		} catch (e) {
		    // error
		}
	  
	  },
  }

}
