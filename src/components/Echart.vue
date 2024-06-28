<template>
    <button @click="handleClick">更换数据</button>
    <div id="home" ref="home">Home</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, shallowRef } from 'vue'
import { ECharts, EChartsOption, init } from 'echarts'
// import useCurrentInstance from "@/utils/useCurrentInstance";
// const { proxy } = useCurrentInstance()
const myChart = shallowRef<ECharts>()
const home = ref<HTMLElement>()
const myData = reactive([
    { id: 1, name: '衬衫', xl: 22, kc: 77 },
    { id: 2, name: '雪纺衫', xl: 99, kc: 45 },
    { id: 3, name: '羊毛衫', xl: 45, kc: 11 },
    { id: 4, name: '高跟鞋', xl: 15, kc: 23 },
    { id: 5, name: '袜子', xl: 12, kc: 85 },
    { id: 6, name: '帽子', xl: 12, kc: 85 },
    { id: 7, name: '', xl: 12, kc: 85 },
])
onMounted(() => {
    const charEle = document.getElementById('home') as HTMLElement
    myChart.value = init(charEle)
    initOptions()
    window.addEventListener('resize', () => {
        if (myChart.value) {
            myChart.value.resize()
        }
    })
})
const initOptions = () => {
    const option: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
            },
        ],
        legend: {},
    }
    ;(myChart.value as ECharts).setOption(option)
}
const handleClick = () => {
    ;(myChart.value as ECharts).setOption({
        xAxis: {
            data: myData.map(item => item.name),
        },
        series: [
            {
                name: '销量',
                type: 'bar',
                data: myData.map(item => item.xl),
            },
            {
                name: '库存',
                type: 'bar',
                data: myData.map(item => item.kc),
            },
        ],
    })
}
</script>
<style scoped>
#home {
    width: 95%;
    height: 500px;
    border: red solid 1px;
}
</style>
