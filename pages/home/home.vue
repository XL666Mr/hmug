<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src" @click="goDetail(item.goods_id)"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view @click="goNav(item)" class="nav-item" v-for="(item,index) in navList" :key="index">
        <img :src="item.image_src" class="nav-img">
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image class="left-img" :src="item.product_list[0].image_src"
              :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
  import {
    getBanners,
    getNavList,
    getFloordata
  } from '@/api/home.js'
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    methods: {
      // 获取轮播图
      async loadBanners() {
        const {
          message
        } = await getBanners()
        this.swiperList = message
      },
      // 获取分类数据
      async getNavList() {
        const res = await getNavList()
        this.navList = res.message
      },
      // 获取楼层数据
      async getFloordata() {
        const res = await getFloordata()
        console.log(res)
        this.floorList = res.message
      },
      // 跳转到商品详情页
      goDetail(id) {
        console.log(id)
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id' + id,
        });
      },
      // 跳转到分类页
      goNav(item) {
        console.log(item)
        if (item.name === '分类') {
          uni.switchTab({
            url: "/pages/cate/cate"
          });
        }
      }
    },
    onLoad() {
      this.loadBanners()
      this.getNavList()
      this.getFloordata()
    }
  }
</script>

<style lang="scss">
  .topSearch {
    width: 750rpx;
    height: 85px;
    background-color: #C00000;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .search_btn {
      width: 400rpx;
      height: 30px;
      margin-top: 50px;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
