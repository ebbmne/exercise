<template>
  <div class="ebook">
    <div class="title-wrapper">
      <div class="left">
        <span class="icon icon-back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon icon-cart_fill_light"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon icon-people"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Epub from "epubjs";
// global.ePub = Epub;
const DOWNLOAD_URL = "/static/encore_pieces.epub";

export default {
  methods: {
    // 电子书的解析和渲染
    showEpub() {
      // 生成EBook对象
      this.book = new Epub(DOWNLOAD_URL);
      // 生成Rendition对象 domid, 宽高
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      // 通过Rendition.display渲染电子书
      this.rendition.display();
    },
    prevPage() {
      // Rendition.prev
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage() {
      // Rendition.next
      if (this.rendition) {
        this.rendition.next();
      }
    }
  },
  mounted() {
    this.showEpub();
  }
}
</script>

<style lang="scss" scoped>
@import "assets/styles/global.scss";
.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      display: flex;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>