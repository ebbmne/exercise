<template>
  <div class="ebook">
    <title-bar :ifTitleAndMenu="ifTitleAndMenu"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar
      :ifTitleAndMenu="ifTitleAndMenu"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
      :bookAvailable="bookAvaiable"
      @onProgressChange="onProgressChange"
      ref="menuBar"
    ></menu-bar>
  </div>
</template>

<script>
import Epub from "epubjs";
import TitleBar from "@/components/TitleBar";
import MenuBar from "@/components/MenuBar";

const DOWNLOAD_URL = "/static/encore_pieces.epub";

export default {
  components: {
    TitleBar: TitleBar,
    MenuBar: MenuBar
  },
  data() {
    return {
      ifTitleAndMenu: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: { body: { color: "#000", background: "#fff" } }
        },
        {
          name: "eye",
          style: { body: { color: "#000", background: "#ceeaba" } }
        },
        {
          name: "night",
          style: { body: { color: "#fff", background: "#000" } }
        },
        {
          name: "gold",
          style: { body: { color: "#000", background: "rgb(241, 236, 226)" } }
        }
      ],
      defaultTheme: 1,
      bookAvaiable: false
    };
  },
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
      // 获取theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体大小
      this.setFontSize(this.defaultFontSize);
      // this.themes.register(name, styles)
      // this.themes.select(name)
      this.registerThemem();
      this.setTheme(this.defaultTheme);
      // 获取Locations对象 // 获取navigation对象
      this.book.ready
        .then(() => {
          return this.book.locations.generate();
        })
        .then(() => {
          this.locations = this.book.locations;
          this.bookAvaiable = true;
        });
      
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
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenu = !this.ifTitleAndMenu;
      if (!this.ifTitleAndMenu) {
        this.$refs.menuBar.hideSetting();
      }
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
      }
    },
    registerThemem() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    }
  },
  mounted() {
    this.showEpub();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global";
.ebook {
  height: 100%;
  position: relative;
  .read-wrapper {
    height: 100%;
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