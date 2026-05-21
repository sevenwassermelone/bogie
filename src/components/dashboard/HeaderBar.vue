<template>
  <header class="dashboard-header">
    <div class="header-block">
      <div class="header-time">
        <!-- <span class="header-time__label">当前时间</span> -->
        <strong class="header-time__value">{{ currentTime }}</strong>
      </div>
    </div>

    <div class="panel-card header-title">
      <h1>{{ data.title }}</h1>
      <!-- <p v-if="data.subtitle">{{ data.subtitle }}</p> -->
    </div>

    <div class="header-block">
      <div class="header-tag-list">
        <span v-for="tag in data.tags" :key="tag" class="header-tag">{{ tag }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { dashboardData } from '../../mock/dashboard'

const data = dashboardData.header
const currentTime = ref('')
let timer: number | undefined

const updateTime = () => {
  const now = new Date()
  const date = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const time = now.toLocaleTimeString('zh-CN', {
    hour12: false,
  })
  currentTime.value = `${date} ${time}`
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>