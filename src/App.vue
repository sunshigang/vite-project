<template>
  <div class="container">
    <div class="header">
      <ul class="p1">
        <li>
          <router-link to="/">主页</router-link>
        </li>
        <li>
          <router-link to="/register">注册</router-link>
          <!-- <a href="/register">注册</a> -->
        </li>
        <li>
          <router-link to="/about">关于</router-link>
        </li>
        <li>
          <router-link to="/ceshi">测试</router-link>
        </li>
        <li>
          <router-link to="/test">测试1</router-link>
        </li>
      </ul>
    </div>
    <div class="content"><router-view /></div>
  </div>
</template>

<style>
* {
  margin: 0px;
  padding: 0px;
}

.container {
  width: 100%;
  height: 100%;
  /* background-color: red; */
}

.header {
  width: 100%;
  height: 10%;
  padding-bottom: 200px;
  /* background-color: rgb(26, 38, 209); */
}

.content {
  width: 100%;
  height: 90%;
  position: absolute;
  bottom: 0;
  /* background-color: rgb(13, 228, 95); */
}

ul {
  list-style-type: none;
  /*清楚项目符号*/
}

li {
  margin: 0 2px;
  /*并列显示*/
  float: left;
}

/*鼠标经过超链接的样式*/
a:hover {
  color: #444;
  background: #f99;
  border-color: #fff#aaa#aaa#fff;
}

a {
  /*完全清除超链接下划线效果*/
  text-decoration: none;
  border: solid 1px;
  padding: 0.4em 0.8em;
  color: green;
  background: transparent;
  border-color: #bbb#fff#fff#aaa;
  /*解决IE浏览器无法显示问题*/
  zoom: 1;
}</style>
