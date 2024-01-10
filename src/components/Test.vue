<template>
    <DigitalFlop class="customize-digital-flop" :value="flopValue"></DigitalFlop>
    <el-button  type='primary' @click="changeNumber">change number</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DigitalFlop from './DigitalFlop.vue'
const moneyValue = ref(5792.72)
const flopValue = ref(5792.72)
function changeNumber() {
    if (moneyValue.value === 5792.72) {
        flopValue.value = 12305.34
    } else {
        flopValue.value = 5792.72
    }
}
</script>

<style lang="scss" scoped>
.customize-digital-flop {
    --da-digital-item-width: 30px;
    --da-digital-item-height: 40px;
    --da-digital-item-font-size: 30px;

    --da-digital-item-decimal-place-width: 24px;
    --da-digital-item-decimal-place-height: 30px;
    --da-digital-item-decimal-place-font-size: 24px;

    --da-digital-item-bg-color: #07368a;
}
</style>
