<template>
  <div>
      <nav-header>购物车</nav-header>

      <div class="cart-wrap">
          <div class="login-entry" v-if="!loginFlag">
              <div class="login-text">
                  <div class="text-left">登录后享受更多优惠</div>
                  <div class="text-right">去登录</div>
              </div>
              <div class="login-btn" @click="goLogin">
                  <div class="btn-wrap">
                      <i class="icon iconfont icon-more"></i>
                  </div>
              </div>
          </div>
          <div class="noitem" v-if="cartList.length == 0">
              <a href="javascript:;" class="noitem-content">
                  <span class="noitem-txt">购物车还是空的</span>
                  <em class="shoping" @click="shoping">去逛逛</em>
              </a>
          </div>

          <!-- 购物清单 -->
          <div class="cart-list-wrap" v-if="cartList.length != 0">
              <ul class="cart-list">
                  <li class="list-item" v-for="item in cartDetailList">
                      <div class="choose checked"></div>
                      <div class="goods-img">
                          <img :src="'/static/' + item.img" alt="">
                      </div>
                      <div class="info">
                          <p class="name">{{item.name}}</p>
                          <div class="price-wrap">
                              <span>售价：</span>
                              <span class="price">{{parseInt(item.price) * item.count}}元</span>
                          </div>
                          <div class="num clearfix">
                            <div class="input-num-wrap">
                                <div class="input-sub" @click="sub(item.id)">
                                    <i class="icon-line"></i>
                                </div>
                                <div class="input-num">{{item.count}}</div>
                                <div class="input-add" @click="add(item.id)">
                                    <i class="icon-cross"></i>
                                </div>
                            </div>
                            <div class="delete" @click="deleteGoods(item.id)">
                                <i class="icon-delete"></i>
                            </div>
                          </div>
                      </div>
                  </li>
              </ul>
              <div class="payment-wrap">
                  <div class="price">
                      <span class="normal-txt">共{{allGoodsCount}}件 金额：<strong>{{allGoodsPrice}}</strong>元</span>
                  </div>
                  <div class="payment" @click="pay">结算</div>
              </div>
          </div>

          <div class="recommend-top-img">
              <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/e95ade2750a7fde92369b416c7d3176d.jpg" alt="" class="recommend-img">
          </div>
          <div class="recommend-goods-wrap">
              <ul class="recommend-item-list clearfix">
                <li class="recommend-item" v-for="item in recommendList" @click="viewGoods(item.goodsId)">
                    <div class="img">
                        <img :src="'/static/'+item.goodsImg" alt="">
                    </div>
                    <div class="info">
                        <div class="name">{{item.goodsName}}</div>
                        <div class="brief">{{item.goodsBrief}}</div>
                        <div class="price">
                            ￥{{item.goodsPrice}}
                        </div>
                    </div>
                </li>
              </ul>
          </div>
      </div>

      
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/cart.css'
import NavHeader from '@/components/NavHeader'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
import axios from 'axios'
export default {
  data(){
      return {
          loginFlag: false,
          cartList: [],
          recommendList: [],
          resData: []
      }
  },
  components: {
      NavHeader
  },
  mounted: function(){
      this.checkUserStatus();
      this.init();
  },
  computed: {
      cartDetailList: function(){
          // 生成购物车清单
          var cartDetailItem = '', list = [];
          if(this.cartList.length > 0){
                for(var j = 0; j < this.cartList.length; j++){
                    this.resData.forEach(item=>{
                        if(item.goodsId == this.cartList[j].id){
                            cartDetailItem = {
                                id: item.goodsId,
                                name: item.goodsName,
                                img: item.goodsImg,
                                count: this.cartList[j].count,
                                price: item.goodsPrice
                            };
                            list.push(cartDetailItem);
                        }
                    });
                }
                return list;
          }else if(this.cartList.length == 0){
              return [];
          }
      },
      allGoodsCount: function(){
          var count = 0;
          this.cartList.forEach(item=>{
              count += item.count;
          });
          return count;
      },
      allGoodsPrice: function(){
          var price = 0;
          this.cartDetailList.forEach(item=>{
              price += item.price * item.count;
          });
          return price;
      }
  },
  methods: {
      init(){
          // 生成不重复的随机整数组
          var randomArr = [],
              max = 13, 
              min = 1, 
              randomId,
              randomArrLen = 0;
          while(randomArrLen < 4){
              for(var i = randomArrLen; i < 4; i++){
                  randomId = Math.floor(Math.random()*(max-min+1)+min);
                  randomArr.push(randomId);
              }
              randomArr = Array.from(new Set(randomArr));
              randomArrLen = randomArr.length;
          }
          randomArr.forEach(item=>{
              if(item < 10) item = '000' + item;
              item = '00' + item;
          });

          axios.get('/static/mock/Categories.json').then(result=>{
              var res = result.data.allGoods;
              this.resData = res;

              // 生成推荐商品清单
              for(var i = 0; i < randomArr.length; i++){
                  res.forEach(item=>{
                      if(item.goodsId == randomArr[i]){
                          this.recommendList.push(item);
                      }
                  });
              }
          });
      },
      checkUserStatus(){
          // 检查登录状态
          if(localStorage.getItem('userId') == '0001'){
              this.loginFlag = true;
              
              // 检查购物车状态
              if(localStorage.getItem('cartList')){
                  var cart = JSON.parse(localStorage.getItem('cartList'));
                  if(cart.length == 0){
                      return;
                  }else{
                      this.cartList = cart;
                  }
              }
          }else{
              return;
          }
      },
      shoping(){
          this.$router.push({path: 'categories'});
      },
      viewGoods(goodsId){
          this.$router.push({
              path: 'goodsdetail',
              query: {id: goodsId}
          });
      },
      pay(){
          // todo
          localStorage.setItem('orderList', JSON.stringify(this.cartDetailList));
          this.cartList = [];
          localStorage.setItem('cartList', JSON.stringify(this.cartList));
          Toast({
            message: '支付成功！您的订单已在后台生成',
            iconClass: 'icon iconfont icon-smile'
          });
      },
      sub(id){
          for(var i = 0; i < this.cartList.length; i++){
              if(this.cartList[i].id == id && this.cartList[i].count > 1){
                  this.cartList[i].count--;
              }
          }
          localStorage.setItem('cartList', JSON.stringify(this.cartList));
          console.log(JSON.parse(localStorage.getItem('cartList')));
      },
      add(id){
          for(var i = 0; i < this.cartList.length; i++){
              if(this.cartList[i].id == id && this.cartList[i].count < 99){
                  this.cartList[i].count++;
              }
          }
          localStorage.setItem('cartList', JSON.stringify(this.cartList));
          console.log(JSON.parse(localStorage.getItem('cartList')));          
      },
      deleteGoods(id){
          MessageBox.confirm('确定删除此商品？').then(action=>{
              for(var i = 0; i < this.cartList.length; i++){
                if(this.cartList[i].id == id){
                    this.cartList.splice(i, 1);   // 删除选中商品
                }
              }
              localStorage.setItem('cartList', JSON.stringify(this.cartList));
              console.log(JSON.parse(localStorage.getItem('cartList')));
          });   
      },
      goLogin(){
          this.$router.push({path: 'login'});
      }
  }
}
</script>

