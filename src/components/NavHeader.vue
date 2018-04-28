<template>
  <div>
    <header class="header">
        <div class="header-back">
            <a href="javascript:;" class="header-back-item" @click="back">
                <i class="icon iconfont icon-fanhui1 ico-back"></i>
            </a>
        </div>
        <div class="header-title">
            <slot></slot>
        </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    back(){
      // 返回上一页
      this.$router.go(-1);
    }
  }
}
</script>

<style>
.header {
  width: 100%;
  height: 2.5rem;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
}
.header .header-back {
  float: left;
  width: 2.2205rem;
}
.header .header-back .header-back-item {
  display: block;
  width: 1.333rem;
  margin: 0 auto;
}
.header .header-back .header-back-item .ico-back {
  color: #666;
  font-size: 1rem;
}
.header .header-title {
  width: 11.558rem;
  height: 0.8rem;
  text-align: center;
  font-size: 0.65rem;
  color: #666;
}
</style>


