<template>
  <!-- on表示显示，off表示关闭 -->
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Jonas外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>

      <div class="login_content">
        <form @submit.prevent="toLogin">
          <!-- 短信登录 -->
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <!-- 显示获取验证码或者倒计时效果 -->
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ok_phone: rightPhone}"
                @click.prevent="getCode"
              >{{computeTime? `已发送(${computeTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>

          <!-- 密码登录 -->
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>

              <!-- 显示隐藏密码 -->
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd" />
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd" />
                <div class="switch_button" :class="showPwd? 'on':'off'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{showC:showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc': '...'}}</span>
                </div>
              </section>

              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>

          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us" @click="aboutMe">关于作者</a>
      </div>

      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>

      <AboutMe v-show="show"></AboutMe>
    </div>

    <AlerTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></AlerTip>
  </div>
</template>


<script>
/* 
1) 界面相关效果:   a. 切换登陆方式  b.手机号合法检查 c. 倒计时效果 
                  d. 切换显示或隐藏密码  e. 前台验证提示 

2) 前后台交互功能:  a. 动态一次性图形验证码  b. 动态一次性短信验证码   c.短信登陆 d.密码登陆
                   e. 获取用户信息,实现自动登陆    f. 退出登陆
*/

import { reqSendCode, reqPwdLogin, reqSmsLogin } from "../../api";

// 引入封装好的提示框组件（或者导入ui组件）
import AlerTip from "../../components/AlerTip/AlerTip.vue";

import AboutMe from './AboutMe'

export default {
  data() {
    return {
      // ---切换登陆方式
      loginWay: "", //true密码，false短信
      phone: "",
      pwd: "",
      code: "",
      name: "",
      captcha: "",
      // 计时
      computeTime: 0,
      // ---是否显示隐藏密码
      showPwd: false,
      // ---表单提交校验弹出框
      alertText: "",
      showAlert: false,

      show: false
    };
  },

  computed: {
    // ---手机号合法检查
    rightPhone() {
      return /^1\d{10}$/.test(this.phone); // true/false
    },
  },

  methods: {
    // ----------------------获取验证码+倒计时---------------------------
    async getCode() {
      // 如果当前没有计时...
      if (!this.computeTime) {
        // 1.才能启动倒计时
        this.computeTime = 30;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime === 0) {
            clearInterval(this.intervalId);
          }
        }, 1000);

        // 2.再发送ajax请求（验证码短信）
        let result = await reqSendCode(this.phone);

        if (result.code === 1) {
          // 显示失败提示
          this.showAlert = true;
          this.alertText = result.msg;
          // 停止倒计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
          }
        }
      }
    },

    // ------------------------------登录------------------------------------
    async toLogin() {
      // console.log(this);

      let result;
      // 1.前台表单验证
      //-----------------------------------------
      if (this.loginWay) {
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {
          this.showAlert = true;
          this.alertText = "手机号不正确";
          return;
        } else if (!/^\d{6}$/.test(code)) {
          this.showAlert = true;
          this.alertText = "验证码不正确";
          return;
        }

        // 2.1 手机号短信登录发送ajax请求
        result = await reqSmsLogin(phone, code);
      } else {
        // --------------------------------------
        const { name, pwd, captcha } = this;
        if (!this.name) {
          this.showAlert = true;
          this.alertText = "用户名不正确";
          return;
        } else if (!this.pwd) {
          this.showAlert = true;
          this.alertText = "密码不正确";
          return;
        } else if (!this.captcha) {
          this.showAlert = true;
          this.alertText = "图片验证码不正确";
          return;
        }

        // 2.2 用户名密码登录发送ajax请求
        result = await reqPwdLogin({name, pwd, captcha});
      }

      // 3.得到结果处理，停止计时，操作后续处理
      if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.intervalId);
      }

      if (result.code === 0) {
        const user = result.data
        // 将user保存到state中
        this.$store.dispatch('recordUser', user)
        // 跳转到个人中心
        this.$router.replace('/profile')
      } else {
        const msg = result.msg;
        // 出现错误，重新刷新图片验证码
        this.getCaptcha();
        // 显示警告
        this.showAlert = true;
        this.alertText = msg;
      }
    },

    // -----------------------------关闭弹出提示框----------------------------
    closeTip() {
      this.showAlert = false;
      this.alertText = "";
    },

    // ---------------------------点击获取图形验证码（非Ajax请求）----------------
    getCaptcha() {
      // e.target 为当前点击的图片，为图片每次指定一个不同的src值
      this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now();
    },


    aboutMe() {
      this.show = true
    }
  },

  components: {
    AlerTip,
    AboutMe
  },
};
</script>


<style lang="stylus">
@import '../../assets/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #FFC300;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #FFC300;
            font-weight: 700;
            border-bottom: 2px solid #FFC300;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              // 手机正确时候，获取验证码高亮
              &.ok_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.showC {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #FFC300;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #FFC300;
          color: #333;
          letter-spacing 2px;
          font-weight :700;
          text-align: center;
          font-size: 16pxF;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #FFC300;
        font-weight 700;
      }
    }
  }
}
</style>
