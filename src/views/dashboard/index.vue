<template>
  <div>{{ count }}</div>
  <button @click="loginOut">增加</button>
</template>
<script setup lang="ts" name="Dashboard">
const count = ref(0);

// 登出
function loginOut() {
  count.value++;
}
</script>
<style scoped></style>
