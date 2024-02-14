<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'

</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div class="content">
      <RouterView />
    </div>
  </n-config-provider>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
}
</style>
