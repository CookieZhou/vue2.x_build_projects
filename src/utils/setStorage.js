export const setStorage = (key, data, Boolean) => {
    console.log('存', key, data, Boolean)
    switch (Boolean) {
        case true:
            setLocal(key, data)
            break
        default:
            setSession(key, data)
            break
    }
}

function setLocal (key, data) {
    console.log(key + '----存localStorage', data)
    localStorage.setItem(key, JSON.stringify(data))
}

function setSession (key, data) {
    console.log(key + '----存sessionStorage', data)
    sessionStorage.setItem(key, JSON.stringify(data))
}
