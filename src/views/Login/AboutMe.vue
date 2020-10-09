<template>
  <transition name="slide">
    <div class="aboutme" v-show="onshow">
      <div class="top">
        <h2>Jonas外卖项目开发</h2>
        <i class="iconfont" @click="goBack">×</i>
      </div>
      <div class="main">
        <div class="title">我的信息:</div>
        <div class="info">
          <div class="tel">我的电话(TEL): 13892472743</div>
          <div class="email">我的邮箱(Email): 460903986@qq.com</div>
        </div>

        <div class="weixin">
          <img src="./images/wei.jpg" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    data() {
        return {
            onshow: true
        }
    },
    methods: {
        goBack() {
            this.onshow = false
        }
    }
};
</script>

<style scoped lang="less">
&.slide-enter-active,
&.slide-leave-active {
  transition: all 0.3s;
  }
&.slide-enter {
  transform: translate3d(-100%, -100%, 0);
}
&.slide-leave-to {
  transform: translate3d(-100%, -100%, 0);
}

.aboutme {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: #fff;
  .top {
    width: 100%;
    height: 50px;
    background-color: #FFC300;
    color: #333;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    .iconfont {
      position: absolute;
      top: 0px;
      right: 15px;
      font-size: 25px;
      font-weight: 600;
      color: #333;
    }
  }
  .main {
    .title {
      font-size: 17px;
      color: #111;
      margin: 15px 10px;
      font-weight: 600;
    }
    .info {
      font-size: 17px;
      color: #111;
      margin: 5px 10px;
      .tel {
        margin: 7px 0;
      }
    }
    .weixin {
      margin: 60px 0;
      text-align: center;
      img {
        width: 250px;
        height: 350px;
      }
    }
  }
}
</style>
