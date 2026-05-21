<template>
  <div ref="chartRef" class="chart-host small-chart" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { TrendPoint } from '../../mock/dashboard'

const props = defineProps<{
  data: TrendPoint[]
  color?: string
  fillColor?: string
  label?: string
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const buildOption = () => {
  const color = props.color ?? '#1498ff'

  return {
    backgroundColor: 'transparent',
    grid: { top: 8, right: 10, bottom: 8, left: 26 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 21, 38, 0.97)',
      borderColor: 'rgba(61, 196, 255, 0.28)',
      textStyle: { color: '#e8f3ff', fontSize: 12 },
    },
    xAxis: {
      type: 'category',
      data: props.data.map((d) => d.time),
      boundaryGap: true,
      axisLine: { lineStyle: { color: 'rgba(33, 102, 196, 0.2)' } },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: true, lineStyle: { color: 'rgba(20, 86, 180, 0.08)' } },
    },
    yAxis: {
      type: 'value',
      min: -10,
      max: 10,
      interval: 5,
      splitNumber: 4,
      splitLine: { lineStyle: { color: 'rgba(20, 86, 180, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(196, 219, 255, 0.7)', fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        data: props.data.map((d) => d.value),
        barWidth: 3,
        itemStyle: {
          borderRadius: 2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1db8ff' },
            { offset: 1, color: color },
          ]),
          shadowBlur: 6,
          shadowColor: 'rgba(20, 152, 255, 0.35)',
        },
        emphasis: { disabled: true },
      },
      {
        type: 'line',
        data: props.data.map((d) => d.value),
        smooth: false,
        symbol: 'none',
        lineStyle: {
          color: 'rgba(20, 152, 255, 0.45)',
          width: 1,
        },
        emphasis: { disabled: true },
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

watch(() => props.data, () => chart?.setOption(buildOption()), { deep: true })
</script>
