## 项目简介

学习vue也有一段时间了，所以一直有想法想做个项目把之前学到的东西总结一下，结合自己前端时间学的移动端布局知识，所以决定做一个移动端商城，因为一个商城一般都会涉及到大量的数据交互，这正好能发挥vue的强大作用。对比了一些相关网站后，觉得小米商城的风格比较符合自己的口味，于是选择了小米商城。

该项目基于vue2.x，结合vue-cli+vue-router+axios+mint-ui+webpack共同完成，目前已经完成商城的主要功能，后续还会继续更新完善。

项目中运用了大部分vue常用的知识点，如vue基本指令、组件、计算属性、数据渲染、生命周期钩子、slot插槽等等，并附有大量注释，对于初学vue想通过实际项目进阶的小伙伴们也会有一定帮助。

如果项目对你有帮助的话欢迎star、fork！

## 在线预览

>  [项目链接](http://nickyli.cc/mimall)  (建议在F12移动端调试模式下或在手机浏览器下观看)
>  (测试账号：admin  密码：123456)

## 技术栈

* [vue-cli](https://www.npmjs.com/package/vue-cli) 是vue的脚手架工具，可以快速搭建一个vue项目的目录和构建各种相关配置。
* [vue-router](https://router.vuejs.org/zh-cn/) 官方提供的路由器，构建SPA(单页面应用)的首选。
* [axios](https://www.npmjs.com/package/axios) 发送http请求，与服务器通信，同类型工具有vue-resource，不过目前官方推荐使用axios。
* [Mint-UI](http://mint-ui.github.io/docs/#/zh-cn2) 基于 Vue.js 的移动端UI组件库,饿了么团队推出的。
* [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) Web本地存储，因为项目暂时没有单独搭建后台，所以把购物车信息、订单信息、用户信息存储到localStorage中。

## 项目已完成功能

* 首页页面、商品分类页面、商品详情页面、购物车页面、用户页面、登录页面、订单页面
* 首页及商品详情轮播图
* 商品分类显示
* 相关操作的权限设置
* 购物车商品数量增减和删除
* 模拟结算、生成订单
* 删除历史数据

## 更新

* 2018.05.22 &nbsp;&nbsp;&nbsp;新增搜索页面
* 2018.05.26 &nbsp;&nbsp;&nbsp;增加页面切换动画

## 项目本地运行
``` bash
# 安装相关依赖
npm install

# 运行项目，在本地浏览器访问http://localhost:8080/
npm run dev
```
