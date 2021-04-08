<template>
  <div class="login-container">
    <el-card class="card login-card" shadow="hover">
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="login-logo">
        <img src="../../assets/login.jpg" height="300" width="455">
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="form-login">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on">
          <el-form-item prop="username">
            <el-col :span="2">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="loginForm.username" placeholder="Username" type="text" auto-complete="on" @keyup.enter.native="handleLogin" />
            </el-col>
          </el-form-item>
          <el-form-item prop="password">
            <el-col :span="2">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
            </el-col>
            <el-col :span="22">
              <el-input :key="passwordType" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-select v-model="loginForm.language" placeholder="Language" style="width: 19rem">
              <el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
          <div class="text-align-right">
            <span>v{{ appVersion }}</span>
          </div>
        </el-form>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import { showErrorWithMessage } from '@/utils/commons'
import { version } from '@../../../package.json'

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      appVersion: version,
      loginForm: {
        username: '',
        password: '',
        language: this.$store.getters.language
      },
      loginRules: {
        username: [{ required: true, message: this.$i18n.t('validate.required', { name: 'Username' }), trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      languages: [{ value: 'en', label: 'English' }, { value: 'vi', label: 'Tiếng Việt' }]
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$i18n.locale = this.loginForm.language
            this.$store.dispatch('app/setLanguage', this.loginForm.language)
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((e) => {
            console.log(e)
            showErrorWithMessage('Invalid username or password')
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #ccc;
}

.login-card {
  max-width: 980px;
  width: 980px;
  min-height: 506px;
  line-height: 50px;
  background: #FFFFFF;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.13);
  border-radius: 48px;
  text-align: center;
}

.form-login {
  margin-top: 6.5rem;
}

.login-logo {
  vertical-align: middle;
  margin-top: 4.5rem;
  margin-left: -1rem;
}

.svg-container {
  font-size: 20px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 3px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}

.text-align-right {
  text-align: right;
  font-size: 14px;
}
</style>
