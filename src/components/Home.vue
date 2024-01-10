<template>
    <h1>我是主页</h1>
    <el-button type="primary" size="default" :icon="Plus">新增</el-button>
    <h1>{{ title }}</h1>
    <div>
        {{ data }}
    </div>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
//ref 一般用于基本的数据类型，比如 string，boolean reactive 一般用于对象 ref 的地方其实也是调用的 reactive 实现的。
import { ref, reactive } from 'vue'
const title = ref('title')

const data = reactive({
    userName: 'xiaoming',
    age: 18,
})
</script>
<style scoped lang="scss"></style>
