<template>
  <div class="panel-card" :style="{ minHeight: '0', display: 'flex', flexDirection: 'column' }">
    <div class="panel-title">
      <h3>{{ title }}</h3>
      <span v-if="subtitle">{{ subtitle }}</span>
    </div>
    <div class="metric-grid" style="flex: 1; min-height: 0;">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>