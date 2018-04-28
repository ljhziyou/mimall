import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Categories from '@/views/Categories'
import GoodsDetail from '@/views/GoodsDetail'
import User from '@/views/User'
import Login from '@/views/Login'
import Cart from '@/views/Cart'
import Order from '@/views/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/goodsdetail',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
})
