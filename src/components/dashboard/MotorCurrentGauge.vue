<template>
  <div class="motor-gauge-wrap">
    <div class="motor-gauge-label">{{ label }}</div>
    <div ref="chartRef" class="motor-gauge-chart" />
    <div class="motor-gauge-unit">{{ unit }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  label: string
  value: number
  unit: string
  max: number
  gradientColors: [string, string]
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const buildOption = () => {
  const bgArc = 'rgba(8, 31, 63, 0.88)'

  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '90%',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: props.max,
        pointer: { show: false },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: props.gradientColors[0] },
              { offset: 1, color: props.gradientColors[1] },
            ]),
          },
        },
        axisLine: { lineStyle: { width: 8, color: [[1, bgArc]] } },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: [{ value: props.value, name: '' }],
        title: { show: false },
        detail: {
          valueAnimation: true,
          width: '100%',
          lineHeight: 28,
          borderRadius: 4,
          offsetCenter: [0, '10%'],
          fontSize: 22,
          fontWeight: 'bold',
          formatter: `{value}`,
          color: props.gradientColors[1],
        },
      },
    ],
  }
}

const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption(buildOption())
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chart?.resize())
})

onBeforeUnmount(() => {
  chart?.dispose()
  chart = null
})

watch(() => [props.value, props.max], () => chart?.setOption(buildOption()))
</script>

<style scoped>
.motor-gauge-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.motor-gauge-label {
  font-size: 12px;
  color: var(--text-primary);
  text-align: center;
}

.motor-gauge-chart {
  width: 100%;
  height: 90px;
}

.motor-gauge-unit {
  font-size: 11px;
  color: var(--text-secondary);
  text-align: center;
  margin-top: -6px;
}
</style>