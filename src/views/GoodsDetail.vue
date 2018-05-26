<template>
  <div>
    <nav-header>商品详情</nav-header>

    <div class="goodsdetail-wrap">
      <div class="goods-banner">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="bannerImg in bannerImgList">
              <img :src="bannerImg" alt="">
            </mt-swipe-item>
        </mt-swipe>
      </div>

      <div class="overview">
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-brief">{{goodsBrief}}</div>
        <div class="goods-price">￥{{goodsPrice}}</div>
      </div>

      <div class="buy-count">
        <div class="buy-count-text">购买数量：</div>
        <div class="buy-count-btn">
          <a href="javascript:;" class="btn-minus" @click="minus">-</a>
          <span class="buy-count-num">{{buyCount}}</span>
          <a href="javascript:;" class="btn-add" @click="add">+</a>
        </div>
      </div>

      <div class="information">
        <mt-navbar v-model="selected" >
          <mt-tab-item id="tab-item1">概述</mt-tab-item>
          <mt-tab-item id="tab-item2">参数</mt-tab-item>
          <mt-tab-item id="tab-item3">意外险</mt-tab-item>
        </mt-navbar>

         <mt-tab-container v-model="selected" swipeable>
            <mt-tab-container-item id="tab-item1">
                <ul class="goodsdetail-item-list">
                    <li class="goodsdetail-item" v-for="introImg in introImgList">
                        <img :src="introImg" alt="">
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-item2">
                <ul class="goodsdetail-item-list">
                    <li class="goodsdetail-item" v-for="paramImg in paramImgList">
                        <img :src="paramImg" alt="">
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-item3">
                <ul class="goodsdetail-item-list">
                    <li class="goodsdetail-item" v-for="insuranceImg in insuranceImgList">
                        <img :src="insuranceImg" alt="">
                    </li>
                </ul>
            </mt-tab-container-item>
          </mt-tab-container>
      </div>
    </div>

    <footer class="goodsdetail-footer">
      <router-link to="/" class="goodsdetail-footer-homepage">
          <i class="icon iconfont icon-home"></i>
          <span class="item-text">首页</span>
      </router-link>
      <router-link to="/cart" class="goodsdetail-footer-cart">
          <i class="icon iconfont icon-tianmaochaoshigouwuche"></i>
          <span class="item-text">购物车</span>
      </router-link>
      <div class="addcart-wrap" @click="addCart">
        <a href="javascript:;" class="addcart">加入购物车</a>
      </div>
    </footer>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/goodsdetail.css'
import NavHeader from '@/components/NavHeader'
import { Swipe, SwipeItem } from 'mint-ui'
import { Navbar, TabItem } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
import axios from 'axios'
export default {
  data(){
    return {
      selected: 'tab-item1',
      goodsId: '',
      goodsName: '',
      goodsBrief: '',
      goodsPrice: '',
      bannerImgList: [],
      introImgList: [],
      paramImgList: [],
      insuranceImgList: [],
      buyCount: 1
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

      // 修复打开商品详情页时页面滚动条没有重置为0的问题
      if(document.body.scrollTop > 0){
        document.body.scrollTop = 0;
      }

      var goodsId = this.$route.query.id;
      axios.get('/static/mock/GoodsDetail.json').then(result=>{
        var goodsList = result.data.goodsDetailList;
        goodsList.forEach(item=>{
          if(item.goodsId == goodsId){
            this.goodsId = item.goodsId;
            this.goodsName = item.goodsName;
            this.goodsBrief = item.goodsBrief;
            this.goodsPrice = item.goodsPrice;
            this.bannerImgList = item.goodsBannerImg;
            this.introImgList = item.goodsIntroImg;
            this.paramImgList = item.goodsParamImg;
            this.insuranceImgList = item.insuranceImg;
          }
        });
      });
    },
    addCart(){
      if(localStorage.getItem('userId') != '0001'){
        MessageBox.alert('您尚未登录，无法进行此操作');
      }else{
        // 本地存储购物车信息
        // 1.首次向购物车添加商品
        if(!localStorage.getItem('cartList')){
          var newItem = {
            id: this.goodsId,
            count: this.buyCount
          };
          var newList = [];
          newList.push(newItem);
          localStorage.setItem('cartList', JSON.stringify(newList));    // localStorage不能直接存储数组或对象，需要事先转换
        }else if(localStorage.getItem('cartList')){
          var cartList = JSON.parse(localStorage.getItem('cartList'));
          var isExisted = false;

          // 2.若所选商品已存在购物车中，只修改数量
          cartList.forEach(item=>{
            if(item.id == this.goodsId){
              item.count = parseInt(item.count) + this.buyCount;
              localStorage.setItem('cartList', JSON.stringify(cartList));
              isExisted = true;
            }
          });

          // 3.所选商品不存在购物车中
          if(!isExisted){
            var newItem = {
              id: this.goodsId,
              count: this.buyCount
            };
            cartList.push(newItem);
            localStorage.setItem('cartList', JSON.stringify(cartList));
          }
        }

        console.log(JSON.parse(localStorage.getItem('cartList')));

        Toast({
          message: '成功添加' + this.buyCount + '件商品',
          iconClass: 'icon iconfont icon-smile'
        });
      }
    },
    minus(){
      if(this.buyCount <= 1){
        return;
      }else{
        this.buyCount--;
      }
    },
    add(){
      if(this.buyCount >= 99){
        return;
      }else{
        this.buyCount++;
      }
    }
  }
}
</script>

<style>
/* 覆盖mint-ui默认样式 */
.mint-swipe-indicators{
  bottom: 0.1rem;
}
.mint-swipe-indicator{
  background: #fff;
}
.mint-swipe-indicator.is-active{
  background: #000;
}
.mint-navbar .mint-tab-item.is-selected{
    border-bottom: none;
    color: #ff6700 !important;
}
</style>

