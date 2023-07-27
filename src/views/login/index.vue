<template>
  <div class="get-scss">scss的使用</div>

  <div class="get-scss">
    <div>{{ testStore.test }}</div>
    <button @click="piniaTest">pinia的使用</button>
  </div>

  <div class="get-scss">
    <div>{{ testStore.token }}</div>
    <button @click="saveToken">保存token</button>
  </div>

  <div class="get-scss"><svg-icon icon-class="block" />svg图标使用</div>
</template>
<script setup lang="ts" name="Login">
import useTestStore from "@/store/modules/test";
const testStore = useTestStore();
const token = "abcdefghijk";

function piniaTest() {
  testStore.isTestBool();
}

function saveToken() {
  testStore.isTokenSave(token);
}
</script>
<style scoped lang="scss">
.get-scss {
  margin: 130px auto;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  color: $text-color;
  background-color: $bg-color;
}
</style>
