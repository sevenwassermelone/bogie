import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

export function useScreenScale() {
  const viewportWidth = ref(window.innerWidth)
  const viewportHeight = ref(window.innerHeight)

  const updateViewport = () => {
    viewportWidth.value = window.innerWidth
    viewportHeight.value = window.innerHeight
  }

  onMounted(() => {
    updateViewport()
    window.addEventListener('resize', updateViewport)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateViewport)
  })

  const scale = computed(() => {
    const widthRatio = viewportWidth.value / DESIGN_WIDTH
    const heightRatio = viewportHeight.value / DESIGN_HEIGHT
    return Math.min(widthRatio, heightRatio)
  })

  const screenStyle = computed(() => ({
    transform: `scale(${scale.value})`,
  }))

  const shellStyle = computed(() => ({
    width: `${DESIGN_WIDTH * scale.value}px`,
    height: `${DESIGN_HEIGHT * scale.value}px`,
  }))

  return {
    shellStyle,
    screenStyle,
  }
}
