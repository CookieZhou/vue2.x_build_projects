// require.context()是webpack提供的方法,这个方法的第一个参数是require的一个文件夹，第二个参数是否遍历子目录，第三个参数是筛选什么类型的文件
const router = require.context('../views', true, /.vue/)
const arr = []
// router是一个方法，直接调用会出错，router.keys()是router里的一个静态方法。
router.keys().forEach((key) => {
    // console.log('key=========', key)
    // const path = key.split('.') // 分割字符串。如'./model1/index.vue'
    const path = key.split('/index.vue')[0].split('.')[1] // 分割字符串。如'./model1/index.vue'

    // console.log('path', path)
    if (key.indexOf('index') !== -1) { // 判断每一项字符串是否有index,有即首页
        // console.log('有index')
        arr.push({
            // path: path[1],
            path: path,
            component: router(key).default, // 相当于import
            meta: {
                // title: path[1].replace('/', '') // 删除'/'
                title: path.replace('/', '') // 删除'/'
            }
        })
    } else {
        // console.log('没有index')
        arr.push({
            // path: path[1] + '/' + path[2],
            path: '/' + path.split('/')[2],
            component: router(key).default,
            meta: {
                // title: path[2]
                title: path.split('/')[2]
            }
        })
    }
})

export default arr
