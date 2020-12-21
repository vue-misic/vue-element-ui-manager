<template>
  <div class="login-container">
    <div class="login-wrap">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">可汗管理系统</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="手机号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            maxlength="11"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLoginComform"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;height:47px;background-color: #1ABC9C" @click.native.prevent="handleLoginComform">登录</el-button>

      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { MessageBox } from 'element-ui'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log('rrrrrrrrrrr', validUsername(value))
      if (!validUsername(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入正确密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        // username: '17725770016',
        // password: 'hello0016'
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        // this.redirect = query && query.redirect
        if (query) {
          // this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
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
    handleLoginComform() {
      try {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/handleLoginCom', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            MessageBox('登录出现异常，请联系管理员')
            return false
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#000;
$cursor: #000;

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
    width: 82%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      // &:-webkit-autofill {
      //   // box-shadow: 0 0 0px 1000px $bg inset !important;
      //   // -webkit-text-fill-color: $cursor !important;
      // }
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #ebebeb inset !important;
      }
      &:-webkit-autofill:focus {
        box-shadow: 0 0 0px 1000px #ebebeb inset !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #ebebeb;
    border-radius: 5px;
    color: #000;
  }
}
</style>

<style lang="scss" scoped>
$bg:#1ABC9C;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-wrap {
    width: 100%;
    padding-top: 180px;
    .login-form {
      position: relative;
      width: 420px;
      max-width: 100%;
      padding: 100px 35px 0;
      border-radius: 20px 20px;
      margin: 0 auto;
      overflow: hidden;
      background-color: #fff;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
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
        color: $bg;
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
}
</style>
