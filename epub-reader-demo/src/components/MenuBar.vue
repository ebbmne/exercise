<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{'hide-box-shadow': !ifTitleAndMenu || isSettingShow}"
        v-show="ifTitleAndMenu"
      >
        <div class="menu-item">
          <span class="icon iconfont icon-chapters"></span>
        </div>
        <div class="menu-item">
          <span class="icon iconfont icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="menu-item">
          <span class="icon iconfont icon-light" @click="showSetting(1)"></span>
        </div>
        <div class="menu-item">
          <span class="icon iconfont icon-fonts" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="isSettingShow">
        <div class="setting-font-size" v-if="showTag === 0">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="select">
            <div
              class="select-wrapper"
              v-for="(item, index) in fontSizeList"
              :key="index"
              @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview"
            :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize + 'px'}"
          >A</div>
        </div>
        <div class="setting-theme" v-else-if="showTag === 1">
          <div
            class="setting-theme-item"
            v-for="(item,index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :style="{background: item.style.body.background}"
              :class="{'no-border': item.style.body.background !== '#fff'}"
            ></div>
            <div class="text" :class="{'selected': index === defaultTheme}">{{ item.name }}</div>
          </div>
        </div>
        <div class="setting-progress" v-else-if="showTag === 2">
          <div class="progress-wrapper">
            <input
              class="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress"
            />
          </div>
          <div class="text-wrapper">
            <span>{{ bookAvailable ? progress + "%" : "加载中..." }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    ifTitleAndMenu: {
      type: Boolean,
      isrequire: true,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: {
      type: Number,
      default: 16
    },
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: Boolean
  },
  data() {
    return {
      isSettingShow: false,
      showTag: 0,
      progress: 0
    };
  },
  methods: {
    showSetting(tag) {
      this.isSettingShow = true;
      this.showTag = tag;
    },
    hideSetting() {
      this.isSettingShow = false;
    },
    setFontSize(fontSize) {
      this.$emit("setFontSize", fontSize);
    },
    setTheme(index) {
      this.$emit("setTheme", index);
    },
    onProgressChange(progress) {
      this.$emit("onProgressChange", progress);
    },
    onProgressInput(progress) {
      this.progress = progress;
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global";
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(18);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(5) rgba(0, 0, 0, 0.15);
    display: flex;
    z-index: 101;
    &.hide-box-shadow {
      box-shadow: none;
    }
    .menu-item {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(12);
      }
    }
  }
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(18);
    left: 0;
    width: 100%;
    height: px2rem(25);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    z-index: 101;
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            flex: 0 0 0;
            width: 0;
            height: px2rem(3);
            border-left: px2rem(1) solid #ccc;
            position: relative;
            .point {
              position: absolute;
              top: px2rem(-2.5);
              left: px2rem(-4.5);
              width: px2rem(8);
              height: px2rem(8);
              border-radius: px2rem(4);
              background: white;
              border: px2rem(0.2) solid #ccc;
              box-shadow: 0 px2rem(2) px2rem(2) rgba(0, 0, 0, 0.15);
              @include center;
              .small-point {
                width: px2rem(2);
                height: px2rem(2);
                background: black;
                border-radius: px2rem(1);
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(2);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(0.5) solid #ccc;
          box-sizing: border-box;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 px2rem(10);
          font-size: px2rem(5);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(20);
        box-sizing: border-box;
        flex: 1;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(1);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(10);
            width: px2rem(10);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rbga(0, 0, 0, 0.15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        flex: 0 0 px2rem(5);
        font-size: px2rem(5);
        @include center;
      }
    }
  }
}
</style>