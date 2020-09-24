<template>
    <div class="login_page" v-wechat-title="'登录'">
        <div class="bg">
            <van-swipe class="my-swipe" loop :autoplay="5500" duration="1200" :show-indicators="false" indicator-color="white">
                <van-swipe-item>
                    <img src="@/assets/image/bg4.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="@/assets/image/bg3.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="@/assets/image/bg2.jpg" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="login_content">
            <div class="title">欢迎登录</div>
            <div class="write_area">
                <div class="phone_write" :class="isPwdFocus ? 'write_active' : ''">
                    <van-field
                        type="digit"
                        maxlength="11"
                        :autofocus="true"
                        v-model="formData.phone"
                        @focus="isPwdFocus = true; isCodeFocus = false"
                        @input="checkLogin"
                        clearable
                        placeholder="请输入手机号" />
                </div>
                <div class="phone_write" v-if="!isCodeLogin">
                    <van-field v-model="formData.password" maxlength="16" :type="type" @input="checkLogin" placeholder="请输入密码">
                        <template #right-icon>
                            <van-icon v-if="type === 'password'" @click="changeType" class="icon_eye" name="closed-eye" />
                            <van-icon v-else @click="changeType" class="icon_eye" name="eye-o" />
                        </template>
                    </van-field>
                </div>
                <div class="phone_write" v-if="isCodeLogin" :class="isCodeFocus ? 'write_active' : ''">
                    <van-field
                        v-model="formData.code"
                        maxlength="4"
                        clearable
                        type="digit"
                        @focus="isCodeFocus = true; isPwdFocus = false"
                        @keyup.enter="login"
                        @input="checkLogin"
                        placeholder="请输入验证码">
                        <template #right-icon>
                            <van-button class="code_btn" color="#FEB532" :disabled="formData.phone.length !== 11 || !isFinished" @click="getCode">
                                <div v-if="isFinished">{{ codeText }}</div>
                                <van-count-down v-else ref="countDown" seconds :time="time" @finish="finish" format="ss秒" />
                            </van-button>
                        </template>
                    </van-field>
                </div>
                <div class="login_btn">
                    <van-button
                        size="large"
                        color="#FEB532"
                        :disabled="isDisabled"
                        @click="login">
                        登录
                    </van-button>
                </div>
            </div>
        </div>
        <van-overlay :show="!showBody" lock-scroll>
            <van-loading size="24px" type="spinner" color="#fff" vertical class="loading_wrap">
                <div class="loading_text" slot="default">客官莫急，臣妾正在努力加载中...</div>
            </van-loading>
        </van-overlay>
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    name: 'Login',
    data() {
        return {
            showBody: true,
            isPwdFocus: false,
            isCodeFocus: false,
            time: 60 * 1000,
            isFinished: true,
            codeText: '获取验证码',
            isCodeLogin: true,
            // 是否禁用登录按钮
            isDisabled: true,
            // 输入框类型
            type: 'password',
            formData: {
                phone: '',
                password: '',
                code: '',
                type: 4
            }
        }
    },
    methods: {
        changeType() {
            if (this.type === 'password') {
                this.type = ''
            } else {
                this.type = 'password'
            }
        },
        checkLogin() {
            if (this.isCodeLogin) {
                if (this.formData.phone.length >= 11 && this.formData.code.length >= 4) {
                    this.isDisabled = false
                } else {
                    this.isDisabled = true
                }
            } else {
                if (this.formData.phone.length >= 11 && this.formData.password.length >= 6) {
                    this.isDisabled = false
                } else {
                    this.isDisabled = true
                }
            }
        },
        // 登录并绑定手机号
        login() {
            if (this.isDisabled) {
                return
            }
            const reg = /^1[3456789]\d{9}$/
            if (!reg.test(this.formData.phone)) {
                Toast('请输入正确的手机号')
                return
            }
            Toast.loading({
                message: '正在登录...',
                duration: 0,
                forbidClick: true,
                loadingType: 'spinner'
            })
            const isLoginOut = sessionStorage.getItem('login_out')
            if (isLoginOut) {
                this.doLogin()
            } else {
                this.bindNewUserLogin()
            }
        },
        // 登录
        doLogin() {
            this.$store.dispatch('user/codeLogin', this.formData).then(res => {
                if (res.data.result) {
                    setTimeout(() => {
                        Toast.success('登录成功')
                        if (sessionStorage.getItem('last_path')) {
                            this.$router.push({
                                path: sessionStorage.getItem('last_path'),
                                query: { mer_id: sessionStorage.getItem('mer_id') }
                            })
                        } else {
                            this.$router.push({ path: '/home', query: { mer_id: sessionStorage.getItem('mer_id') } })
                        }
                    }, 700)
                }
            })
        },
        // 新用户绑定并登录
        bindNewUserLogin() {
            this.$api('bindLogin', this.formData).then(res => {
                if (res.data.result) {
                    setTimeout(() => {
                        Toast.success('登录成功')
                        if (sessionStorage.getItem('last_path')) {
                            this.$router.push({
                                path: sessionStorage.getItem('last_path'),
                                query: { mer_id: sessionStorage.getItem('mer_id') }
                            })
                        } else {
                            this.$router.push({ path: '/home', query: { mer_id: sessionStorage.getItem('mer_id') } })
                        }
                    }, 700)
                }
            })
        },
        // 获取验证码
        getCode() {
            if (!this.isFinished) {
                return
            }
            const reg = /^1[3456789]\d{9}$/
            if (!reg.test(this.formData.phone)) {
                Toast('请输入正确的手机号')
                return
            }
            this.$api('getCode', this.formData).then(res => {
                this.isFinished = false
                Toast('验证码已发送至手机，请注意查收')
            })
        },
        finish() {
            this.isFinished = true
            this.codeText = '重新获取'
            this.$refs.countDown.reset()
        },
        codeLogin() {
            this.isCodeLogin = !this.isCodeLogin
        }
    },
    created() {

    }
}
</script>
<style lang="scss" src="./index.scss" scoped></style>
