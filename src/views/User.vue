<template>
  <div>
      <div class="user-wrap">
          <header class="hd">
              <div class="user-logo-box">
                  <div class="img" @click="goLogin">
                      <img :src="'/static/' + userLogo" alt="">
                  </div>
                  <div class="name" @click="goLogin" v-if="userName == ''">登录/注册</div>
                  <div class="name" v-if="userName != ''">{{userName}}</div>
                  <div class="logout" v-if="userName" @click="logout">
                      <i class="icon iconfont icon-tuichu"></i>
                  </div>
              </div>
          </header>
          <div class="order-entry">
              <div class="order-text">
                  <div class="my-order">我的订单</div>
                  <div class="all-order">全部订单</div>
              </div>
              <div class="order-btn" @click="viewOrder">
                  <div class="btn-wrap">
                      <i class="icon iconfont icon-more"></i>
                  </div>
              </div>
          </div>
      </div>

      <div class="cleardata" @click="clearAll">
          清除所有数据
      </div>

      <nav-footer></nav-footer>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/user.css'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import { MessageBox } from 'mint-ui'
import axios from 'axios'
export default {
  data(){
      return {
          userName: '',
          userLogo: 'user-logo.png'
      }
  },
  components: {
      NavHeader,
      NavFooter
  },
  mounted: function(){
      this.init();
  },
  methods: {
      init(){
          var userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : '';
          if(userId == '0001'){
              this.userName = 'admin';
              this.userLogo = 'user.jpg'
          }
      },
      goLogin(){
          this.$router.push({
              path: 'login'
          });
      },
      logout(){
          MessageBox.confirm('确定退出登录？').then(action=>{
              localStorage.removeItem('userId');
              this.userName = '';
              this.userLogo = 'user-logo.png';
              //location.reload();
          });
      },
      viewOrder(){
          if(this.userName == ''){
              MessageBox.alert('请先登录再进行此操作');
          }else{
              // todo
              this.$router.push({path: 'order'});
          }
      },
      clearAll(){
          MessageBox.confirm('该操作会删除用户所有的历史数据，确认继续？').then(action=>{
              localStorage.clear();
              location.reload();
          });
      }
  }
}
</script>

