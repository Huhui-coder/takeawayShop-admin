<template>
  <div class="login-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">外卖平台商家注册</h3>
      </div>

      <el-form-item prop="merchantName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="merchantName"
          v-model="registerForm.merchantName"
          placeholder="用户名"
          name="merchantName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="merchantPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="merchantPwd"
          v-model="registerForm.merchantPwd"
          :type="passwordType"
          placeholder="密码"
          name="merchantPwd"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'merchantPwd' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="merchantAddress">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="merchantAddress"
          v-model="registerForm.merchantAddress"
          placeholder="商家地址"
          name="merchantAddress"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="merchantPhone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="merchantPhone"
          v-model="registerForm.merchantPhone"
          placeholder="商家电话"
          name="merchantPhone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="merchantDesc">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="merchantDesc"
          v-model="registerForm.merchantDesc"
          placeholder="商家描述"
          name="merchantDesc"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('账号不能少于4位'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码不能少于4位'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        merchantName: 'beikehanbao',
        merchantPwd: 'beikehanbao1001',
        merchantAddress: '重庆市第二师范学院',
        merchantPhone: '15823721618',
        merchantDesc: '专注于汉堡'
      },
      registerRules: {
        merchantName: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        merchantPwd: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'merchantPwd',
      redirect: undefined
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
      if (this.passwordType === 'merchantPwd') {
        this.passwordType = ''
      } else {
        this.passwordType = 'merchantPwd'
      }
      this.$nextTick(() => {
        this.$refs.merchantPwd.focus()
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/register', this.registerForm)
            .then(() => {
              this.$router.push({ path: '/login' || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
