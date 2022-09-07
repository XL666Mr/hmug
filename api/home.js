import fly from "@/utils/request.js"

// 获取首页轮播图
export const getBanners = () => fly.get('/home/swiperdata')
//获取分类数据
export const getNavList = () => fly.get('/home/catitems')
export const getFloordata = () => fly.get('/home/floordata')
