
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerFiles = require.context('../', true, /\.route\.js/)
let arr = []
routerFiles.keys().forEach((key) => {
    arr = arr.concat(routerFiles(key).default)
})

const router = new Router({
    routes: [...arr]
})

// 路由拦截
router.beforeEach((to, from, next) => {
    console.log('to------->', to)
    console.log('from------->', from)
    console.log('this.$getStorage------->', localStorage.getItem('ticket'))
    if (to.path !== '/login') {
        if (localStorage.getItem('ticket')) {
            next()
        } else {
            // 如果要去的页面需要检查ticket，没有ticket则重定向到登录页
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

export default router
