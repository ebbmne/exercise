<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="ifTitleAndMenu">
      <div class="left">
        <span class="icon iconfont icon-back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon iconfont icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon iconfont icon-people"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon iconfont icon-items"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    ifTitleAndMenu: {
      type: Boolean,
      isrequire: true,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global";

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: px2rem(18);
  z-index: 101;
  background: white;
  box-shadow: 0 px2rem(8) px2rem(5) rgba(0, 0, 0, 0.15);
  display: flex;
  .left {
    display: flex;
    flex: 0 0 px2rem(20);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(15);
      @include center;
      .icon-cart {
        font-size: px2rem(9);
      }
    }
  }
}
</style>