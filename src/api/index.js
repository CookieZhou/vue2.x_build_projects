// 引入接口基础域名
import baseUrlConfig from './base_url_config'
import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'

// 设置公共基础参数
const baseParam = {
	'Device-Id': 'packapp',
	phone_brand: '',
	app_version: 85,
	app_version_name: ''
}

// 运行环境
const environment = process.env.NODE_ENV
console.log('运行环境', environment)

// 请求地址
const baseUrl = baseUrlConfig[environment]
console.log('请求地址', baseUrl)

const http = axios.create({
    baseURL: baseUrl,
    timeout: 1000 * 10
})

// 响应拦截器
http.interceptors.response.use((res) => {
    console.log('响应结果', res)
    httpCodeHandle(res.data)
    return res
}, (error) => {
    console.log('响应出错', error)
    return Promise.reject(error)
})

export const request = (config) => {
    console.log('-----config>', config)
    console.log('请求的接口：', baseUrl + config.url)
    const newParams = Object.assign(config.data ?? {}, baseParam)
    console.log('newParams', newParams)
    const ticket = localStorage.getItem('ticket')
    if (ticket) {
        config.data = Object.assign(newParams, {
            ticket,
            ...config.data
        })
    } else {
        config.data = Object.assign(newParams, config.data)
    }
    console.log('重新配置后的完整配置', config)
    return new Promise((resolve, reject) => {
        http.request({
            url: baseUrl + config.url,
            data: config.data,
            timeout: 10000,
			sslVerify: false,
			header: {
				'Content-Type': 'application/json',
				...config.header
            },
            method: config.method,
            success: (res) => {
				httpCodeHandle(res.data)
                resolve(res.data)
            },
            fail: (error) => {
                console.log('接口调用失败', JSON.stringify(error))
                Toast({
                    message: '请求失败' + JSON.stringify(error),
                    position: 'bottom',
                    duration: 2000
                })
				reject(error)
            }
        })
    })
}

// http状态码处理
function httpCodeHandle(data) {
    switch (data.errorCode) {
        // 成功
        case 0:
            break
        // 账号不存在
		case 20130001:
            router.replace({
                path: '/login'
            })
            break
        // 密码错误
		case 20130002:
            router.replace({
                path: '/login'
            })
			break
		default:
            Toast({
                message: data.errorMsg,
                position: 'bottom',
                duration: 2000
            })
			break
	}
}
