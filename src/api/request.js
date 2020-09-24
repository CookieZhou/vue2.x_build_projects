import { request } from './index'
import modules from './modules'

export const httpRequest = function(key, data = {}) {
    const obj = modules[key]
    console.log('obj------', obj)
    return request({ ...obj, data })
}
