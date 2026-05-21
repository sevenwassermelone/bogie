<template>
  <div class="dashboard-root">
    <div class="dashboard-scale-shell" :style="shellStyle">
      <div class="dashboard-screen" :style="screenStyle">
        <div class="dashboard-layout">
          <HeaderBar />

          <main class="dashboard-main">
            <section class="dashboard-column side">
              <div class="panel-card left-monitor-shell">
                <div class="panel-title">
                  <h3>供电监测模块</h3>
                  <span></span>
                </div>

                <div class="left-monitor-grid">
                  <div
                    v-for="panel in dashboardData.leftPanels"
                    :key="panel.title"
                    class="left-monitor-card"
                    :class="{
                      'left-monitor-card--compact': ['供电系统', '变电所系统', '牵引系统', '轮对状态'].includes(panel.title),
                      'left-monitor-card--compact-top': ['供电系统', '变电所系统'].includes(panel.title),
                      'left-monitor-card--fixed-height': ['供电系统', '变电所系统'].includes(panel.title),
                      'left-monitor-card--fixed-height-250': ['牵引系统', '轮对状态', '辅助系统', '振动监测'].includes(panel.title),
                    }"
                  >
                    <div class="left-monitor-card__title">
                      <h4
                        :class="{ 'left-monitor-card__title-link': panel.title === '供电系统' }"
                        @click="handlePowerTitleClick(panel.title)"
                      >{{ panel.title }}</h4>
                      <span>{{ panel.subtitle }}</span>
                    </div>
                    <div v-if="panel.title === '振动监测'" class="left-monitor-vibration">
                      <TrendChart
                        :data="dashboardData.bogieVibrationWaveform"
                        color="#1498ff"
                      />
                      <div class="left-monitor-vibration-stats">
                        <div class="left-monitor-vibration-stat left-monitor-vibration-stat--inline">
                          <span class="metric-label">当前值:</span>
                          <strong>
                            {{ dashboardData.bogieVibrationStats.current }}<small>{{ dashboardData.bogieVibrationStats.unit }}</small>
                          </strong>
                        </div>
                        <div class="left-monitor-vibration-stat left-monitor-vibration-stat--inline">
                          <span class="metric-label">RMS:</span>
                          <strong>
                            {{ dashboardData.bogieVibrationStats.rms }}<small>{{ dashboardData.bogieVibrationStats.unit }}</small>
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div v-else-if="panel.title === '牵引系统'" class="left-monitor-traction">
                      <div class="left-monitor-traction-image-wrap">
                        <img class="left-monitor-traction-image" src="/imgs/a.png" alt="牵引系统图示" />
                      </div>
                      <div class="left-monitor-card__grid">
                        <div
                          v-for="item in panel.metrics"
                          :key="item.label"
                          class="metric-item metric-item--row"
                        >
                          <span class="metric-label">{{ item.label }}</span>
                          <span class="metric-value-group">
                            <span class="metric-value">{{ item.value }}</span>
                            <span v-if="item.unit" class="metric-unit">{{ item.unit }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div v-else-if="panel.title === '轮对状态'" class="left-monitor-wheelset">
                      <div class="left-monitor-wheelset-bars">
                        <div
                          v-for="item in dashboardData.wheelsetBars"
                          :key="item.label"
                          class="wheelset-bar"
                        >
                          <div class="wheelset-bar__header">
                            <span class="wheelset-bar__label">{{ item.label }}</span>
                            <span class="wheelset-bar__value">
                              {{ item.value }}
                              <small>{{ item.unit }}</small>
                            </span>
                          </div>
                          <div class="wheelset-bar__track">
                            <div class="wheelset-bar__fill" :style="{ width: `${item.progress}%` }">
                              <span class="wheelset-bar__glow" />
                            </div>
                            <span class="wheelset-bar__end" />
                          </div>
                        </div>
                      </div>
                      <div class="left-monitor-card__grid">
                        <div
                          v-for="item in panel.metrics"
                          :key="item.label"
                          class="metric-item metric-item--row"
                        >
                          <span class="metric-label">{{ item.label }}</span>
                          <span class="metric-value-group">
                            <span class="metric-value">{{ item.value }}</span>
                            <span v-if="item.unit" class="metric-unit">{{ item.unit }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="left-monitor-card__grid">
                      <div
                        v-for="item in panel.metrics"
                        :key="item.label"
                        class="metric-item metric-item--row"
                      >
                        <span class="metric-label">{{ item.label }}</span>
                        <span class="metric-value-group">
                          <span class="metric-value">{{ item.value }}</span>
                          <span v-if="item.unit" class="metric-unit">{{ item.unit }}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="left-monitor-card left-monitor-card--full">
                    <div class="left-monitor-card__title">
                      <h4>视频与环境</h4>
                      <!-- <span>视频联动 / 环境监控</span> -->
                    </div>
                    <div class="left-monitor-video-layout">
                      <div class="left-monitor-env-row">
                        <div class="left-monitor-env-item">
                          <span class="left-monitor-env-label">环境温度</span>
                          <span class="left-monitor-env-value">23.4 <small>℃</small></span>
                        </div>
                        <div class="left-monitor-env-item">
                          <span class="left-monitor-env-label">环境湿度</span>
                          <span class="left-monitor-env-value">58.7 <small>%</small></span>
                        </div>
                      </div>
                      <div class="left-monitor-cams">
                        <div
                          v-for="(cam, index) in dashboardData.videoCameras"
                          :key="cam.label"
                          class="left-monitor-cam"
                        >
                          <img
                            class="left-monitor-cam__image"
                            :src="`/imgs/${index + 1}.png`"
                            :alt="cam.label"
                          />
                          <span
                            class="left-monitor-cam__label"
                            :class="{ 'left-monitor-cam__label--clickable': cam.label === '前向视角' }"
                            @click="handleVideoCameraClick(cam.label)"
                          >{{ cam.label }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="dashboard-center">
              <div class="panel-card scene-card">
                <div class="panel-title">
                  <h3>实时运行状态</h3>
                  <span></span>
                </div>
                <div class="scene-shell">
                  <div class="scene-status-bar">
                    <span v-for="item in sceneStatusText" :key="item.label">{{ item.label }}：<strong>{{ item.value }}</strong></span>
                  </div>
                  <img
                    class="scene-train-image"
                    :class="{ 'scene-train-image--clickable': canOpenSceneDialog }"
                    src="/imgs/train.png"
                    alt="列车示意图"
                    @click="handleSceneImageClick"
                  />
                  <div v-if="showBogieDialog" class="scene-dialog-mask" @click.self="closeBogieDialog">
                    <div class="scene-dialog">
                      <div class="scene-dialog__header">
                        <h4>{{ sceneDialogTitle }}</h4>
                        <button class="scene-dialog__back" type="button" @click="closeBogieDialog">返回</button>
                      </div>
                      <div class="scene-dialog__body">
                        <img class="scene-dialog__image" :src="sceneDialogImage" alt="转向架视图" />
                        <template v-if="isStopped">
                          <div class="scene-dialog__side">
                            <div class="scene-dialog__section">
                              <h5>部件信息</h5>
                              <div class="scene-dialog__list">
                                <div v-for="item in bogieInfo" :key="item.label" class="scene-dialog__item">
                                  <span class="scene-dialog__label">{{ item.label }}</span>
                                  <strong class="scene-dialog__value">{{ item.value }}</strong>
                                </div>
                              </div>
                            </div>
                            <div class="scene-dialog__section">
                              <h5>部件状态</h5>
                              <div class="scene-dialog__list">
                                <div v-for="item in bogieStatus" :key="item.label" class="scene-dialog__item">
                                  <span class="scene-dialog__label">{{ item.label }}</span>
                                  <strong class="scene-dialog__value">{{ item.value }}</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                      <div v-if="isStopped" class="scene-dialog__actions">
                        <button v-for="label in sceneDialogActions" :key="label" type="button" class="scene-dialog__action-button">
                          {{ label }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="scene-summary">
                    <div
                      v-for="item in dashboardData.sceneSummary"
                      :key="item.label"
                      class="scene-summary-item"
                    >
                      <span class="scene-summary-text">{{ item.label }}：{{ item.value }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="panel-card panel-card--toolbar">
                <div class="panel-title">
                  <h3>系统控制平台</h3>
                  <span></span>
                </div>
                <ActionToolbar @control="handleToolbarControl" />
              </div>
            </section>

            <section class="dashboard-column side">
              <div class="panel-card evaluation-shell">
                <div class="panel-title">
                  <h3>状态评估模块</h3>
                  <span></span>
                </div>

                <div class="evaluation-grid">
                  <div class="evaluation-section">
                    <div class="evaluation-section__title">
                      <h4>健康度综合评估</h4>
                      <!-- <span>健康指数</span> -->
                    </div>
                    <div class="score-card">
                      <StatusGauge
                        :score="dashboardData.healthScore"
                        :breakdown="dashboardData.healthBreakdown"
                      />
                      <div class="score-meta">
                        <div class="score-meta-row">
                          <span>90-100</span>
                          <strong>优秀</strong>
                        </div>
                        <div class="score-meta-row">
                          <span>70-90</span>
                          <strong>良好</strong>
                        </div>
                        <div class="score-meta-row">
                          <span>50-70</span>
                          <strong>一般</strong>
                        </div>
                        <div class="score-meta-row">
                          <span>0-50</span>
                          <strong>较差</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="evaluation-section">
                    <div class="evaluation-section__title">
                      <h4>系统状态概览</h4>
                      <span></span>
                    </div>
                    <div class="status-list status-list--grid">
                      <div
                        v-for="item in dashboardData.deviceStatus"
                        :key="item.name"
                        class="status-row"
                      >
                        <span>{{ item.name }}</span>
                        <span class="status-value">{{ item.value }}</span>
                        <span class="status-state" :style="{ color: toneColor(item.tone) }">
                          <span class="status-dot" :style="{ color: toneColor(item.tone), backgroundColor: toneColor(item.tone) }" />
                          {{ item.state }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="evaluation-section">
                    <div class="evaluation-section__title">
                      <h4>关键设备状态</h4>
                      <span></span>
                    </div>
                    <div class="progress-list">
                      <div
                        v-for="item in dashboardData.healthBreakdown"
                        :key="item.label"
                        class="progress-item"
                      >
                        <span class="progress-label">{{ item.label }}</span>
                        <div class="progress-bar">
                          <div class="progress-fill" :style="{ width: `${item.value}%` }" />
                        </div>
                        <div class="progress-meta">
                          <strong>{{ item.value }}%</strong>
                          <span v-if="item.temperature">{{ item.temperature }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="evaluation-section">
                    <div class="evaluation-section__title">
                      <h4>告警信息</h4>
                      <span></span>
                    </div>
                    <div class="alert-summary-grid">
                      <div
                        v-for="item in dashboardData.alertSummary"
                        :key="item.name"
                        class="alert-summary-card"
                        :class="alertSummaryClass(item.name)"
                      >
                        <span class="alert-summary-card__label">{{ item.name }}</span>
                        <strong class="alert-summary-card__value">{{ item.score }}</strong>
                      </div>
                    </div>
                    <div class="alert-table">
                      <div class="alert-table__header">
                        <span>时间</span>
                        <span>告警内容</span>
                        <span>等级</span>
                        <span>状态</span>
                      </div>
                      <div
                        v-for="item in dashboardData.alerts"
                        :key="`${item.time}-${item.message}`"
                        class="alert-table__row"
                      >
                        <span class="alert-time">{{ item.time }}</span>
                        <span>{{ item.message }}</span>
                        <span class="alert-table__level" :style="{ color: toneColor(item.level) }">
                          {{ alertLevelText(item.level) }}
                        </span>
                        <span>{{ item.status }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showForwardViewDialog" class="external-dialog-mask" @click.self="closeForwardViewDialog">
    <div class="external-dialog external-dialog--forward-view">
      <div class="forward-view-dialog__header">
        <h4>前向视角</h4>
        <button class="forward-view-dialog__close" type="button" aria-label="关闭" @click="closeForwardViewDialog">×</button>
      </div>
      <div class="forward-view-dialog__body">
        <div class="forward-view-dialog__image-wrap">
          <img class="forward-view-dialog__image" src="/imgs/advance.png" alt="前向视角" />
        </div>
        <div class="forward-view-dialog__meta">
          <span>{{ currentTimeText }}</span>
          <span class="forward-view-dialog__signal"><span class="forward-view-dialog__signal-dot" />视频信号正常</span>
        </div>
        <div class="forward-view-dialog__actions">
          <button v-for="label in forwardViewActions" :key="label" type="button" class="forward-view-dialog__action-button">
            {{ label }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showPowerDialog" class="external-dialog-mask" @click.self="closePowerDialog">
    <div class="external-dialog external-dialog--power">
      <div class="scene-dialog__header">
        <h4>供电系统监测</h4>
        <button class="scene-dialog__back" type="button" @click="closePowerDialog">返回</button>
      </div>
      <div class="power-dialog__body">
        <div class="power-dialog__left">
          <div
            v-for="section in dashboardData.powerModalSections"
            :key="section.title"
            class="power-dialog__section"
          >
            <div class="power-dialog__section-title">
              <h5>{{ section.title }}</h5>
            </div>
            <div class="power-dialog__list">
              <div
                v-for="item in section.metrics"
                :key="item.label"
                class="metric-item metric-item--row power-dialog__metric-row"
              >
                <span class="metric-label">{{ item.label }}</span>
                <span class="metric-value-group">
                  <span class="metric-value">{{ item.value }}</span>
                  <span v-if="item.unit" class="metric-unit">{{ item.unit }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="power-dialog__right">
          <div class="power-dialog__image-wrap">
            <img class="power-dialog__image" :src="dashboardData.powerImages.overview" alt="供电系统图示" />
          </div>
          <div class="power-dialog__bottom">
            <div class="power-dialog__section power-dialog__section--status">
              <div class="power-dialog__section-title">
                <h5>受电弓运行状态</h5>
              </div>
              <div class="power-dialog__list">
                <div
                  v-for="item in dashboardData.powerPantographStatus"
                  :key="item.label"
                  class="metric-item metric-item--row power-dialog__metric-row"
                >
                  <span class="metric-label">{{ item.label }}</span>
                  <span class="metric-value-group">
                    <span class="metric-value">{{ item.value }}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="power-dialog__section power-dialog__section--image">
              <div class="power-dialog__section-title">
                <h5>受电弓电行状态</h5>
              </div>
              <div class="power-dialog__state-wrap">
                <img class="power-dialog__state-image" :src="dashboardData.powerImages.state" alt="受电弓电行状态" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ActionToolbar from '../components/dashboard/ActionToolbar.vue'
import HeaderBar from '../components/dashboard/HeaderBar.vue'
import StatusGauge from '../components/dashboard/StatusGauge.vue'
import TrendChart from '../components/dashboard/TrendChart.vue'
import { dashboardData, type StatusTone } from '../mock/dashboard'
import { useScreenScale } from '../utils/scale'

const { shellStyle, screenStyle } = useScreenScale()

const sceneStatus = reactive({
  state: '低速运行',
  direction: '前进',
  speed: '2.3km/h',
  position: 'K0+5.62m',
})

const showBogieDialog = ref(false)
const showPowerDialog = ref(false)
const showForwardViewDialog = ref(false)
const forwardViewActions = ['实时视频', '录像回放', '截图', '关闭']
const currentTimeText = computed(() => new Date().toLocaleString('sv-SE', { hour12: false }))

const handleVideoCameraClick = (label: string) => {
  if (label === '前向视角') {
    showForwardViewDialog.value = true
  }
}

const closeForwardViewDialog = () => {
  showForwardViewDialog.value = false
}

const handlePowerTitleClick = (title: string) => {
  if (title === '供电系统') {
    showPowerDialog.value = true
  }
}

const closePowerDialog = () => {
  showPowerDialog.value = false
}

const bogieInfo = [
  { label: '部件名称', value: '转向架' },
  { label: '部件型号', value: 'TZJ-01' },
  { label: '制造厂家', value: '中车测试设备' },
  { label: '出厂编号', value: '20250428' },
  { label: '安装位置', value: '1号位' },
  { label: '运行时间', value: '12h' },
  { label: '健康状态', value: '良好' },
]

const bogieStatus = [
  { label: '运行温度', value: '32.1℃' },
  { label: '振动幅值', value: '0.38mm/s' },
  { label: '润滑状态', value: '正常' },
  { label: '紧固状态', value: '正常' },
]

const sceneDialogActions = ['复位视图', '旋转', '平移', '缩放', '透明模式', '隐藏']

const isStopped = computed(() => sceneStatus.state === '停止运行')
const isRunning = computed(() => sceneStatus.state === '低速运行')
const canOpenSceneDialog = computed(() => isStopped.value || isRunning.value)
const sceneDialogTitle = computed(() => '')
const sceneDialogImage = computed(() => (isRunning.value ? '/imgs/run.png' : '/imgs/stop.png'))

const sceneStatusText = computed(() => [
  { label: '运行状态', value: sceneStatus.state },
  { label: '运行方向', value: sceneStatus.direction },
  { label: '运行速度', value: sceneStatus.speed },
  { label: '当前位置', value: sceneStatus.position },
])

const handleSceneImageClick = () => {
  if (!canOpenSceneDialog.value) return
  showBogieDialog.value = true
}

const closeBogieDialog = () => {
  showBogieDialog.value = false
}

const handleToolbarControl = (label: string) => {
  dashboardData.toolbar.forEach((item) => {
    item.active = item.label === label
  })

  if (label === '启动运行') {
    sceneStatus.state = '低速运行'
    sceneStatus.direction = '前进'
    sceneStatus.speed = '2.3km/h'
    showBogieDialog.value = false
    showPowerDialog.value = false
    showForwardViewDialog.value = false
    return
  }

  if (label === '停止运行') {
    sceneStatus.state = '停止运行'
    sceneStatus.direction = '静止'
    sceneStatus.speed = '0km/h'
  }
}

const toneColor = (tone: StatusTone) => {
  if (tone === 'info') return '#37e08d'
  if (tone === 'warning') return '#ffd166'
  if (tone === 'danger') return '#ff5b7f'
  return '#23c4ff'
}

const alertLevelText = (tone: StatusTone) => {
  if (tone === 'danger') return '紧急'
  if (tone === 'warning') return '重要'
  if (tone === 'info') return '提示'
  return '一般'
}

const alertSummaryClass = (name: string) => {
  if (name.includes('紧急')) return 'alert-summary-card--danger'
  if (name.includes('重要')) return 'alert-summary-card--warning'
  if (name.includes('一般')) return 'alert-summary-card--info'
  return 'alert-summary-card--success'
}
</script>