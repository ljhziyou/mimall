<template>
  <div id="app">
    <transition name="slide-left">
      <router-view/>
    </transition>
    <nav-footer v-if="navShow"></nav-footer>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter'
export default {
  name: 'App',
  data(){
    return {
      footNavs: ['/', '/categories', '/cart', '/user'],
      navShow: true
    }
  },
  watch: {
    '$route' (to, from){
      console.log(to.path);
      this.navShow = this.footNavs.some(item=>{
        if(item == to.path){
          return true;
        }
      });
    }
  },
  components: {
    NavFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .4s;
  position: absolute;
}
.slide-left-enter {
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  transform: translate3d(-100%, 0, 0);
}
</style>
