<script setup lang="ts">
import { RouterView } from 'vue-router'
import {
  NConfigProvider,
  NMessageProvider,
  NLoadingBarProvider,
  NDialogProvider,
  zhCN,
  dateZhCN
} from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-loading-bar-provider>
        <n-message-provider>
          <div class="content">
            <RouterView />
          </div>
        </n-message-provider>
      </n-loading-bar-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
}
</style>
