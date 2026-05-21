export type MetricTrend = 'up' | 'down' | 'steady'
export type StatusTone = 'success' | 'warning' | 'danger' | 'info'

export interface MetricItem {
  label: string
  value: string
  unit: string
  trend?: string
  trendDirection?: MetricTrend
}

export interface StatusItem {
  name: string
  value: string
  state: string
  tone: StatusTone
}

export interface TrendPoint {
  time: string
  value: number
}

export interface ProgressItem {
  label: string
  value: number
  temperature?: string
}

export interface AlertItem {
  level: StatusTone
  message: string
  time: string
  status: string
}

export interface RankItem {
  name: string
  score: number
}

export interface ToolbarItem {
  label: string
  icon: string
  active?: boolean
}

export interface PanelGroup {
  title: string
  subtitle?: string
  metrics: MetricItem[]
}

export interface PowerModalSection {
  title: string
  metrics: MetricItem[]
}

export interface PowerStatusItem {
  label: string
  value: string
}

export interface WheelsetBarItem {
  label: string
  value: string
  unit: string
  progress: number
}

export const dashboardData = {
  header: {
    title: '转向架平台数字孪生系统',
    // subtitle: '实时运行状态 · 全域感知 · 智能评估',
    meta: [
      { label: '园区站点', value: '运维调度中心' },
      { label: '运行方向', value: '前进' },
      { label: '监测速度', value: '23.6 km/h' },
      { label: '累计里程', value: 'KO+5.62 m' },
    ],
    tags: ['通讯正常', '系统在线', 'admin'],
  },
  leftPanels: [
    {
      title: '供电系统',
      // subtitle: '受流参数',
      metrics: [
        { label: '受电弓电压', value: '27.6', unit: 'V', trendDirection: 'up' },
        { label: '受电号电流', value: '12.4', unit: 'A', trendDirection: 'down' },
        { label: '接触网电压', value: '55.6', unit: 'V', trendDirection: 'up' },
        { label: '弓网压力', value: '98', unit: 'N', trendDirection: 'steady' },
      ],
    },
    {
      title: '变电所系统',
      // subtitle: '变电状态',
      metrics: [
        { label: '输入电压', value: '220.3', unit: 'V', trendDirection: 'up' },
        { label: '输入电流', value: '5.6', unit: 'A', trendDirection: 'up' },
        { label: '输出电压', value: '36.2', unit: 'V', trendDirection: 'steady' },
        { label: '输出电流', value: '28.7', unit: 'A', trendDirection: 'steady' },
        { label: '输出功率', value: '1.03', unit: 'kW', trendDirection: 'steady' },
        { label: '变压器温度', value: '42.3', unit: '℃', trendDirection: 'down' },
      ],
    },
    {
      title: '牵引系统',
      // subtitle: '牵引控制',
      metrics: [
        { label: '电机1温度', value: '38.6', unit: '℃', trendDirection: 'up' },
        { label: '电机2温度', value: '38.9', unit: '℃', trendDirection: 'up' },
      ],
    },
    {
      title: '轮对状态',
      // subtitle: '轮对监测',
      metrics: [
        { label: '轮对1轴温', value: '32.1', unit: '℃', trendDirection: 'up' },
        { label: '轮对2轴温', value: '32.3', unit: '℃', trendDirection: 'up' },
      ],
    },
    {
      title: '辅助系统',
      // subtitle: '辅助供能',
      metrics: [
        { label: '蓄电池电压', value: '48.6', unit: 'V', trendDirection: 'up' },
        { label: '蓄电池电流', value: '25.6', unit: 'A', trendDirection: 'steady' },
        { label: '空压机压力', value: '0.72', unit: 'MPa', trendDirection: 'down' },
        { label: '辅助温度', value: '32.3', unit: '℃', trendDirection: 'up' },
      ],
    },
    {
      title: '振动监测',
      metrics: [],
    },
  ] as PanelGroup[],
  powerModalSections: [
    {
      title: '电气参数',
      metrics: [
        { label: '受电弓电压', value: '27.6', unit: 'V' },
        { label: '受电弓电流', value: '12.4', unit: 'A' },
        { label: '接触网电压', value: '27.8', unit: 'V' },
        { label: '接触网电流', value: '12.1', unit: 'A' },
        { label: '弓网压力', value: '98', unit: 'N' },
      ],
    },
    {
      title: '牵引变电所',
      metrics: [
        { label: '输入电压', value: '220.3', unit: 'V' },
        { label: '输入电流', value: '5.6', unit: 'A' },
        { label: '输出电压', value: '36.2', unit: 'V' },
        { label: '输出电流', value: '28.7', unit: 'A' },
        { label: '输出功率', value: '1.03', unit: 'kW' },
        { label: '变压器温度', value: '42.3', unit: '℃' },
      ],
    },
  ] as PowerModalSection[],
  powerPantographStatus: [
    { label: '升降位置', value: '100%' },
    { label: '受电弓状态', value: '已升起' },
    { label: '接触压力', value: '98N' },
    { label: '运行状态', value: '正常' },
    { label: '故障状态', value: '无' },
  ] as PowerStatusItem[],
  powerImages: {
    overview: '/imgs/electricity.png',
    state: '/imgs/state_elec.png',
  },
  wheelsetBars: [
    { label: '轮对1转速', value: '56.2', unit: 'rpm', progress: 56.2 },
    { label: '轮对2转速', value: '56.1', unit: 'rpm', progress: 56.1 },
  ] as WheelsetBarItem[],
  bogieVibrationWaveform: [
    { time: '10:18:10', value: -1.2 },
    { time: '10:18:12', value: 4.8 },
    { time: '10:18:14', value: -3.9 },
    { time: '10:18:16', value: 3.7 },
    { time: '10:18:18', value: -3.8 },
    { time: '10:18:20', value: 4.9 },
    { time: '10:18:22', value: -3.6 },
    { time: '10:18:24', value: 4.4 },
    { time: '10:18:26', value: -3.8 },
    { time: '10:18:28', value: 3.6 },
  ] as TrendPoint[],
  bogieVibrationStats: {
    current: '3.8',
    rms: '2.9',
    unit: 'mm/s',
  },
  videoCameras: [
    { label: '车侧视角', icon: '⬌' },
    { label: '前向视角', icon: '↑' },
    { label: '后向视角', icon: '↓' },
    { label: '弓网视角', icon: '⬡' },
    { label: '俯视视角', icon: '◎' },
  ],
  trendSeries: [
    { time: '13:00', value: 32 },
    { time: '13:05', value: 41 },
    { time: '13:10', value: 37 },
    { time: '13:15', value: 46 },
    { time: '13:20', value: 59 },
    { time: '13:25', value: 51 },
    { time: '13:30', value: 66 },
    { time: '13:35', value: 61 },
    { time: '13:40', value: 74 },
  ] as TrendPoint[],
  deviceStatus: [
    { name: '供电系统', value: '正常', tone: 'success' },
    { name: '制动系统', value: '正常', tone: 'success' },
    { name: '牵引系统', value: '正常', tone: 'success' },
    { name: '信号系统', value: '正常', tone: 'success' },
    { name: '辅助系统', value: '正常', tone: 'success' },
    { name: '通信系统', value: '正常', tone: 'success' },
  ] as StatusItem[],
  sceneSummary: [
    { label: '道岔', value: '直向' },
    { label: '信号灯', value: '绿灯' },
    { label: '受电号', value: '已升起' },
    { label: '供电', value: '正常' },
    { label: '空压机', value: '运行中' },
  ],
  healthScore: 92,
  scoreMeta: [
    { label: '综合状态', value: '优良' },
    { label: '风险等级', value: '低风险' },
    { label: '建议措施', value: '持续监测' },
  ],
  healthBreakdown: [
    { label: '牵引电机1', value: 92, temperature: '38.6℃' },
    { label: '牵引电机2', value: 91, temperature: '38.9℃' },
    { label: '轮对轴箱', value: 94, temperature: '32.3℃' },
    { label: '变压器', value: 90, temperature: '42.3℃' },
    { label: '空压机', value: 88, temperature: '31.8℃' },
    { label: '受电弓', value: 96, temperature: '27.6℃' },
  ] as ProgressItem[],
  alertSummary: [
    { name: '紧急告警', score: 1 },
    { name: '重要告警', score: 1 },
    { name: '一般告警', score: 0 },
    { name: '提示信息', score: 0 },
  ] as RankItem[],
  alerts: [
    { level: 'warning', message: '轴箱温度轻微波动', time: '10:18:45', status: '待处理' },
    { level: 'danger', message: '牵引电机1温度接近阈值', time: '10:17:52', status: '处理中' },
    { level: 'info', message: '受电弓接触状态稳定', time: '10:17:20', status: '已确认' },
    // { level: 'success', message: '车体运行姿态正常', time: '10:15:02', status: '已恢复' },
  ] as AlertItem[],
  rankList: [
    { name: '构架稳定度', score: 98 },
    { name: '轮对平衡度', score: 96 },
    { name: '供电连续性', score: 95 },
    { name: '制动响应性', score: 93 },
  ] as RankItem[],
  toolbar: [
    { label: '启动运行', icon: '▶', active: true },
    { label: '停止运行', icon: '■' },
    { label: '前进', icon: '↑' },
    { label: '后退', icon: '↓' },
    { label: '升弓', icon: '⇪' },
    { label: '降弓', icon: '⌁' },
    { label: '紧急制动', icon: '⦿' },
    { label: '主断路器', icon: '⌘' },
    { label: '信号灯控制', icon: '●' },
    { label: '道岔控制', icon: '⌖' },
    { label: '空压机启停', icon: '⬡' },
    { label: '照明控制', icon: '☀' },
    { label: '鸣笛', icon: '⌁' },
    { label: '复位', icon: '↺' }
  ] as ToolbarItem[],
}
