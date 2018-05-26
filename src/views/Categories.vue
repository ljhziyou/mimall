<template>
  <div>
      <nav-header>分类</nav-header>

      <div class="categories-wrap">
          <mt-navbar v-model="selected" >
            <mt-tab-item id="tab-item1">全部</mt-tab-item>
            <mt-tab-item id="tab-item2">手机</mt-tab-item>
            <mt-tab-item id="tab-item3">智能</mt-tab-item>
            <mt-tab-item id="tab-item4">电视</mt-tab-item>
          </mt-navbar>

          <mt-tab-container v-model="selected" swipeable>
            <mt-tab-container-item id="tab-item1">
                <ul class="categories-item-list">
                    <li class="categories-item" v-for="item in allList" @click="viewGoods(item.goodsId)">
                        <div class="img">
                            <img :src="'/static/' + item.goodsImg" alt="">
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
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-item2">
                <ul class="categories-item-list">
                    <li class="categories-item" v-for="item in phoneList" @click="viewGoods(item.goodsId)">
                        <div class="img">
                            <img :src="'/static/' + item.goodsImg" alt="">
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
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-item3">
                <ul class="categories-item-list">
                    <li class="categories-item" v-for="item in smartList" @click="viewGoods(item.goodsId)">
                        <div class="img">
                            <img :src="'/static/' + item.goodsImg" alt="">
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
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-item4">
                <ul class="categories-item-list">
                    <li class="categories-item" v-for="item in tvList" @click="viewGoods(item.goodsId)">
                        <div class="img">
                            <img :src="'/static/' + item.goodsImg" alt="">
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
            </mt-tab-container-item>
          </mt-tab-container>
      </div>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/categories.css'
import NavHeader from '@/components/NavHeader'
import { Navbar, TabItem } from 'mint-ui'
import axios from 'axios'
export default {
  data(){
      return {
          selected: 'tab-item1',     //默认显示"全部"
          allList: []                //全部
      }
  },
  components: {
      NavHeader
  },
  mounted: function(){
      this.init();
  },
  computed: {
      phoneList: function(){
          var list = [];
          if(this.allList.length != 0){
              this.allList.forEach(item=>{
                  if(item.goodsType == 'phone'){
                      list.push(item);
                  }
              });
          }
          return list;
      },
      smartList: function(){
          var list = [];
          if(this.allList.length != 0){
              this.allList.forEach(item=>{
                  if(item.goodsType == 'smartdevice'){
                      list.push(item);
                  }
              });
          }
          return list;
      },
      tvList: function(){
          var list = [];
          if(this.allList.length != 0){
              this.allList.forEach(item=>{
                  if(item.goodsType == 'TV'){
                      list.push(item);
                  }
              });
          }
          return list;
      }
  },
  methods: {
      init(){
          axios.get('/static/mock/Categories.json').then(result=>{
              var res = result.data;
              this.allList = res.allGoods;
          });
      },
      viewGoods(goodsId){
          this.$router.push({
              path: 'goodsdetail',
              query: {id: goodsId}
          });
      }
  }
}
</script>

<style>
/* 覆盖mint-ui默认样式 */
.mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid #ff6700 !important;
    color: #ff6700 !important;
}
</style>

