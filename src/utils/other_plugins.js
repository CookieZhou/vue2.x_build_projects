import Vue from 'vue'

// 引入封装的存取缓存
import { setStorage } from './setStorage'
import { getStorage } from './getStorage'

// 引入封装的api请求
import { httpRequest } from '@/api/request'

// 引入公共样式文件
import '@/styles/common.scss'

// title插件
import VueWechatTitle from 'vue-wechat-title'

// 引入微信jssdk
import wx from 'weixin-js-sdk'

// 引入Vant-UI
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.use(VueWechatTitle)
Vue.prototype.$wx = wx
Vue.prototype.$api = httpRequest
Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
