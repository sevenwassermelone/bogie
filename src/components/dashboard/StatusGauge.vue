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
let resizeHandler: (() => void) | null = null

const buildOption = () => ({
  backgroundColor: 'transparent',
  title: [
    {
      text: `${props.score}`,
      left: 'center',
      top: '32%',
      textStyle: {
        color: '#24f0e8',
        fontSize: 30,
        fontWeight: 700,
      },
    },
    {
      text: '健康度评分',
      left: 'center',
      top: '56%',
      textStyle: {
        color: '#24f0e8',
        fontSize: 12,
        fontWeight: 600,
      },
    },
  ],
  series: [
    {
      type: 'pie',
      radius: ['72%', '86%'],
      center: ['50%', '50%'],
      startAngle: 90,
      clockwise: true,
      avoidLabelOverlap: false,
      label: { show: false },
      labelLine: { show: false },
      data: [
        {
          value: props.score,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#19d7d9' },
              { offset: 0.55, color: '#19e25d' },
              { offset: 1, color: '#39f000' },
            ]),
            borderRadius: 10,
          },
        },
        {
          value: 100 - props.score,
          itemStyle: {
            color: 'rgba(10, 46, 92, 0.92)',
          },
        },
      ],
      silent: true,
    },
    {
      type: 'pie',
      radius: ['60%', '61%'],
      center: ['50%', '50%'],
      label: { show: false },
      labelLine: { show: false },
      data: [
        {
          value: 100,
          itemStyle: {
            color: 'rgba(8, 26, 53, 0.9)',
          },
        },
      ],
      silent: true,
    },
  ],
})

const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption(buildOption())
}

onMounted(() => {
  initChart()
  resizeHandler = () => chart?.resize()
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  chart?.dispose()
  chart = null
})

watch(() => props.score, () => chart?.setOption(buildOption()))
</script>
