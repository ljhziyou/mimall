<template>
    <div>
        <header class="search-header">
            <div class="header-back">
                <a href="javascript:;" class="header-back-item" @click="back">
                    <i class="icon iconfont icon-fanhui1 ico-back"></i>
                </a>
            </div>
            <div class="input-box">
                <input type="text" class="input-text" v-model="inputText" placeholder="搜索商品名称">
            </div>
            <div class="search-logo-box">
                <div class="search-logo">
                    <i class="icon iconfont icon-sousuo ico-search"></i>
                </div>
            </div>
        </header>
        <div class="hot-search">
            <div class="title">热门搜索</div>
            <div class="img">
                <router-link to="/goodsdetail?id=0012">
                    <img src="http://i8.mifile.cn/b2c-mimall-media/60c89ea361bed3a7edaf73b3b6663608.jpg?bg=BBD6DF" alt="">
                </router-link>
            </div>
        </div>
        <div class="recommend-item" v-show="searchList.length == 0">
            <ul class="item-list">
                <li class="item"><router-link to="/goodsdetail?id=0013">小米Max2</router-link></li>
                <li class="item"><router-link to="/goodsdetail?id=0011">小米电视4A</router-link></li>
                <li class="item"><router-link to="/goodsdetail?id=0008">小米路由器3</router-link></li>
                <li class="item"><router-link to="/goodsdetail?id=0007">Amazfit Cor手环</router-link></li>
            </ul>
        </div>
        <div class="search-goods-list">
            <ul class="goods-list">
                <li class="list-item" v-for="item in searchList" @click="viewGoods(item.goodsId)">{{item.goodsName}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/search.css'
import axios from 'axios'
export default {
    data(){
        return {
            goodsList: [],
            inputText: ''
        }
    },
    mounted: function(){
        this.init();
    },
    computed: {
        searchList: function(){
            var searchListArr = [];

            if(this.inputText == ''){
                return searchListArr;
            }

            this.goodsList.forEach(item=>{
                if(item.goodsName.toLowerCase().indexOf(this.inputText.toLowerCase()) != -1){
                    searchListArr.push(item);
                }
            });

            return searchListArr;
        }
    },
    methods: {
        init(){
            axios.get('/static/mock/Categories.json').then(result=>{
                var goodsData = result.data;
                this.goodsList = goodsData.allGoods;
            });
        },
        back(){
            this.$router.push({
                path: '/'
            });
        },
        viewGoods(id){
            this.$router.push({
                path: 'goodsdetail',
                query: {id: id}
            });
        }
    }
}
</script>

