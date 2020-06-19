<template>
	<view class="page">
		<scroll-view scroll-y="true" >
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			    <block slot="backText">返回</block>
			    <block slot="content">导航栏</block>
			</cu-custom>
			
			<view class="content">
				<view class="text-area">
					<text class="title">{{title}}</text>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	
</style>
