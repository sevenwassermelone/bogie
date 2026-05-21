<template>
  <div class="toolbar-card toolbar-card--panel">
    <button
      v-for="btn in data"
      :key="btn.label"
      class="toolbar-button"
      :class="{ 'toolbar-button--active': btn.active }"
      @click="handleClick(btn.label)"
    >
      <span class="toolbar-icon">{{ btn.icon }}</span>
      <span class="toolbar-label">{{ btn.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dashboardData } from '../../mock/dashboard'

const emit = defineEmits<{
  control: [label: string]
}>()

const data = computed(() => dashboardData.toolbar)

const handleClick = (label: string) => {
  emit('control', label)
}
</script>