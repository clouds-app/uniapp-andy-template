<template>
	<view class="content">
		<view class="login-bg">
			<view class="logo-box"><!-- <image src="@/static/logo.png" style="width: 100px;height: 100px;"></image> --></view>
			<view class="login-card">
				<view class="login-head">请输入您的账户</view>
				<view class="login-input login-margin-b"><input type="text" v-model="loginForm.phoneNo" placeholder="请输入手机号码" focus maxlength="11"/></view>
				<view class="login-input"><input type="password" v-model="loginForm.password" :password="true" placeholder="请输入密码" /></view>
			</view>
		</view>
		<view class="login-btn"><button class="primary-btn" @tap="login" type="primary">登陆</button></view>
		<view style="padding: 60rpx 0;text-align: center;color: #007AFF;">
			<text @click="openRegisterPage">用户注册</text>
		</view>
	</view>
</template>

<script>
import md5 from 'js-md5';
export default {
	data() {
		return {
			loginForm: {
				phoneNo: '',
				password: ''
			}
		};
	},
	methods: {
		login(){
			var _self = this
			let data = {
			  userId:this.loginForm.phoneNo
			}
			_self.$api.validatorToken(data, res => {
				debugger
			  if (res) {
			    // this.$db.set('userToken', res.data)
			    // _this.redirectHandler()
			  } else {
			    // _this.$common.errorToShow(res.msg)
			  }
			})
			console.log('===login==')
		}
	}
};
</script>

<style>

.login-btn {
	padding: 10rpx 20rpx;
	margin-top: 350rpx;
}
.login-function {
	overflow: auto;
	padding: 20rpx 20rpx 30rpx 20rpx;
}
.login-forget {
	float: left;
	font-size: 26rpx;
	color: #999;
}
.login-register {
	color: #666;
	float: right;
	font-size: 26rpx;
}
.login-input input {
	background: #f2f5f6;
	font-size: 28rpx;
	padding: 10rpx 25rpx;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 8rpx;
}
.login-margin-b {
	margin-bottom: 25rpx;
}
.login-input {
	padding: 10rpx 20rpx;
}
.login-head {
	font-size: 34rpx;
	text-align: center;
	padding: 25rpx 10rpx 55rpx 10rpx;
}
.login-card {
	background: #fff;
	border-radius: 12rpx;
	padding: 10rpx 25rpx 40rpx;
	box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.12);
	position: relative;
	margin-top: 380rpx;
}
.login-bg {
	height: 500rpx;
	padding: 25rpx;
	background: linear-gradient(#0081ff, #1cbbb4);
	border-radius: 0 0 10% 10%;
}

.logo-box {
	width: 100px;
	position: fixed;
	left: 50%;
	margin-left: -50px;
	top: 50px;
	height: 100px;
}
</style>
