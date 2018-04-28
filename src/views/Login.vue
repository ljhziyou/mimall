<template>
  <div>
      <div class="login-wrap">
        <div class="lgnheader">
          <em class="milogo">
            <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="3" ry="3" style="fill:#ff6700"></rect>
              <rect x="10" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect>
              <rect x="33.75" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect>
              <rect x="11.25" y="15" width="15" height="4.1" style="fill:#FFFFFF"></rect>
              <rect x="26.2" y="20.55" width="4.2" height="12.5" style="fill:#FFFFFF"></rect>
              <rect x="20.6" y="15" width="9.8" height="9.8" rx="4.4" ry="4.4" style="fill:#FFFFFF"></rect>
              <rect x="20.2" y="19" width="6" height="6" rx="2" ry="2" style="fill:#ff6700"></rect>
              <rect x="18" y="19.1" width="4" height="2.2" style="fill:#ff6700"></rect>
              <rect x="24.2" y="23" width="1.94" height="10" style="fill:#ff6700"></rect>
              <rect x="18.1" y="22.8" width="4.2" height="10.2" style="fill:#FFFFFF"></rect>
            </svg>
          </em>
          <h4 class="header-tit-txt">小米帐号登录</h4>
        </div>
        <div class="login-form">
          <label for="" class="labelbox">
            <input class="item-account" type="text" name="user" autocomplete="off" placeholder="邮箱/手机号码/小米ID" v-model="userName">
          </label>
          <label for="" class="labelbox">
            <input class="item-account" type="password" name="password" autocomplete="off" placeholder="密码" v-model="password">
            <div class="eye-wrap">
              <i class="icon iconfont icon-yanjing"></i>
            </div>
          </label>
        </div>
        <div class="btn-login-wrap">
          <input type="button" class="btn-login" value="登录" @click="login">
        </div>
        <div class="btn-back-wrap">
          <input type="button" class="btn-back" value="返回" @click="back">
        </div>
      </div>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/login.css'
import { MessageBox } from 'mint-ui'
import axios from 'axios'
export default {
  data(){
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    login(){
      axios.get('/static/mock/User.json').then(result=>{
        var res = result.data;
        if(this.userName == res.userName && this.password == res.password){
          // 本地localStorage存储用户信息
          localStorage.setItem('userId', '0001');

          this.$router.push({path: 'user'});
        }else{
          MessageBox.alert('用户名或者密码错误！', '提示');
        }
      });
    },
    back(){
      this.$router.push({path: 'user'});
    }
  }
}
</script>

