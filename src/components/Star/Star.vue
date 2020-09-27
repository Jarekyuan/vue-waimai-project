<template>
  <div class="star" :class="'star-'+ size">
    <span class="star-item" v-for="(item,index) in starClasses" :key="index" :class="item"></span>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
    size: Number,
  },

  computed: {

    // ***评分4.7  则四个全星，一个半星（四舍五入）
    starClasses() {
      // console.log(this);
      const { score } = this;
      const starScore = [];
      // 向starScore添加 1-5 个‘on’
      for (let i = 0; i < Math.floor(score); i++) {
        starScore.push("on");
      }
      // 向starScore添加 0/1 个‘half’
      if (score * 10 - Math.floor(score) * 10 >= 5) {
        starScore.push("half");
      }
      // 向starScore添加 1-5 个‘off’
      while (starScore.length < 5) {
        starScore.push("off");
      }

      return starScore;
    },
  }
};
</script>


<style lang="stylus">
@import '../../assets/stylus/mixins.styl';

.star {
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star48_on');
      }

      &.half {
        bg-image('./images/stars/star48_half');
      }

      &.off {
        bg-image('./images/stars/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star36_on');
      }

      &.half {
        bg-image('./images/stars/star36_half');
      }

      &.off {
        bg-image('./images/stars/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star24_on');
      }

      &.half {
        bg-image('./images/stars/star24_half');
      }

      &.off {
        bg-image('./images/stars/star24_off');
      }
    }
  }
}
</style>
