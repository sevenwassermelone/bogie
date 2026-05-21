<template>
  <div ref="chartRef" class="chart-host" :style="{ height: '120px', minHeight: '80px' }" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { ProgressItem } from '../../mock/dashboard'

const props = defineProps<{
  score: number
  breakdown: ProgressItem[]
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const buildOption = () => {
  const color = '#3df2ff'
  const bgArc = 'rgba(8, 31, 63, 0.88)'

  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        center: ['50%', '57%'],
        radius: '78%',
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        pointer: { show: false },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#10c1ff' },
              { offset: 1, color: '#3df2ff' },
            ]),
          },
        },
        axisLine: { lineStyle: { width: 15, color: [[1, bgArc]] } },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: [{ value: props.score, name: '' }],
        title: { show: false },
        detail: {
          valueAnimation: true,
          width: '80%',
          lineHeight: 38,
          borderRadius: 6,
          offsetCenter: [0, '-11%'],
          fontSize: 40,
          fontWeight: 'bold',
          formatter: '{value}',
          color: '#3df2ff',
        },
      },
      {
        type: 'pie',
        radius: ['65%', '69%'],
        center: ['50%', '57%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: [1],
        itemStyle: { color: bgArc },
        silent: true,
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

watch(() => props.score, () => chart?.setOption(buildOption()))
</script>