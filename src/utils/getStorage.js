export const getStorage = (key, Boolean) => {
    console.log('取', key, Boolean)
    switch (Boolean) {
        case true:
            return getLocal(key)
        default:
            return getSession(key)
    }
}

function getLocal (key) {
    console.log(key + '----取localStorage')
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
    } else {
        return null
    }
}

function getSession (key) {
    console.log(key + '----取sessionStorage')
    if (sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key))
    } else {
        return null
    }
}
