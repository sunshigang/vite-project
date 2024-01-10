<script setup lang="ts">
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/vue.svg" />
  <router-view msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div class="preprocessor">安装了SASS的测试</div>
  <div class="font_box">
    <font-awesome-icon icon="chess-knight" size="lg" />
    <font-awesome-icon icon="chess-knight" size="2x" />
    <font-awesome-icon icon="bag-shopping" />
    <font-awesome-icon icon="chess-knight" size="2x" />
    <font-awesome-icon :icon="['fas', 'chess-knight']" />
    <font-awesome-icon :icon="['fas', 'seedling']" size="2x"/>
  </div>
</template>

<style  scoped>
.preprocessor {
  width: 300px;
  height: 100px;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: rgb(180, 180, 180);
  text-align: center;
  color: #fff;
  padding: 10px;
}
</style>
