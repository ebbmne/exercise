<template>
  <router-view></router-view>
</template>

<script>
let screenWidth = document.documentElement.clientWidth;
screenWidth = screenWidth >= 1000 ? 1000 : screenWidth;
const fontSize = screenWidth / 10;

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("html").style.fontSize = fontSize + "px";
});

export default {
}
</script>

<style lang='scss' scoped>
</style>