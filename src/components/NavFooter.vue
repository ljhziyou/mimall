<template>
  <div>
      <footer class="nav-footer-wrap">
        <div class="nav-footer-list">
            <router-link to="/" class="nav-footer-item">
                <i class="icon iconfont icon-home" :class="{'active': activeNav=='/'}"></i>
                <span class="item-text" :class="{'active': activeNav=='/'}">首页</span>
            </router-link>
            <router-link to="/categories" class="nav-footer-item">
                <i class="icon iconfont icon-fenlei" :class="{'active': activeNav=='/categories'}"></i>
                <span class="item-text" :class="{'active': activeNav=='/categories'}">分类</span>
            </router-link>
            <router-link to="/cart" class="nav-footer-item">
                <i class="icon iconfont icon-tianmaochaoshigouwuche"  :class="{'active': activeNav=='/cart'}"></i>
                <span class="item-text"  :class="{'active': activeNav=='/cart'}">购物车</span>
            </router-link>
            <router-link to="/user" class="nav-footer-item">
                <i class="icon iconfont icon-wo"  :class="{'active': activeNav=='/user'}"></i>
                <span class="item-text" :class="{'active': activeNav=='/user'}">我的</span>
            </router-link>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  data(){
    return {
      activeNav: ''
    }
  },
  mounted: function(){
    this.tabNav();
  },
  methods: {
    tabNav(){
      this.activeNav = this.$route.path;
    }
  }
}
</script>

<style>
.nav-footer-wrap {
  width: 100%;
  height: 2.6rem;
  position: fixed;
  bottom: 0;
  background-color: #fff;
}
.nav-footer-wrap .nav-footer-list {
  height: 100%;
  display: flex;
  align-items: center;
}
.nav-footer-wrap .nav-footer-list .active {
  color: #ff6700;
}
.nav-footer-wrap .nav-footer-list .nav-footer-item {
  float: left;
  width: 25%;
  height: 2rem;
  color: #999;
}
.nav-footer-wrap .nav-footer-list .nav-footer-item .icon {
  display: block;
  text-align: center;
  font-size: 1rem;
}
.nav-footer-wrap .nav-footer-list .nav-footer-item .item-text {
  font-size: 0.7rem;
  display: block;
  text-align: center;
}
</style>
