<template>
  <div>
      <nav-header>我的订单</nav-header>

      <div class="order-wrap">
          <ul class="order-list">
              <li class="list-item" v-for="item in orderList">
                  <div class="order-title">
                      <div class="shop">
                          <i class="icon iconfont icon-wxbmingxingdianpu"></i>
                          <span class="shop-name">小米商城</span>
                      </div>
                      <div class="success">交易成功</div>
                  </div>
                  <div class="order-detail">
                      <div class="goods-img">
                          <img :src="'/static/'+item.img" alt="">
                      </div>
                      <div class="info">
                          <div class="name">{{item.name}}</div>
                          <div class="price">￥{{item.price}}</div>
                      </div>
                      <div class="count">
                          ×{{item.count}}
                      </div>
                  </div>
                  <div class="total-price">
                      共<span class="num">{{item.count}}</span>件商品，总额：<strong class="total">{{item.count * item.price}}</strong>元
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/order.css'
import NavHeader from '@/components/NavHeader'
export default {
  data(){
      return {
          orderList: []
      }
  },
  components: {
      NavHeader
  },
  mounted: function(){
      this.init();
  },
  methods: {
      init(){
          if(localStorage.getItem('userId') != '0001'){
              this.$router.push({path: 'user'});
          }else{
              if(localStorage.getItem('orderList')){
                  this.orderList = JSON.parse(localStorage.getItem('orderList'));
              }
          }
      }
  }
}
</script>

