import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { playSfx } from './ceremonyAudio'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  decay: number
  color: string
  ambient?: boolean
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  color: string
}

interface FloatingText {
  x: number
  y: number
  vy: number
  text: string
  color: string
  scale: number
  life: number
  decay: number
}

interface StageDetail {
  phase: string
  title: string
  status: string
  activeRite: number
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

function smoothstep(start: number, end: number, value: number): number {
  const position = clamp01((value - start) / (end - start))
  return position * position * (3 - 2 * position)
}

export function useCoronation() {
  const stage = ref<HTMLDivElement | null>(null)
  const canvas = ref<HTMLCanvasElement | null>(null)
  const percentage = ref(100)
  const isPlaying = ref(false)
  const isDragging = ref(false)
  const parallaxX = ref(0)
  const parallaxY = ref(0)

  let animationFrame: number | null = null
  let effectsFrame: number | null = null
  let context: CanvasRenderingContext2D | null = null
  let particles: Particle[] = []
  let shockwaves: Shockwave[] = []
  let floatingTexts: FloatingText[] = []
  let rayPhase = 0
  let dragStartY = 0
  let dragStartPercentage = 100

  const progress = computed(() => percentage.value / 100)
  const scepterRise = computed(() => smoothstep(0.15, 0.45, progress.value))
  const crownDrop = computed(() => smoothstep(0.22, 0.68, progress.value))
  const wingsOpen = computed(() => smoothstep(0.52, 0.86, progress.value))
  const burstPower = computed(() => smoothstep(0.78, 0.98, progress.value))
  const signetValue = computed(() => Math.round(burstPower.value * 9097))
  const stormCount = computed(() => Math.min(4, Math.floor(burstPower.value * 4.4)))
  const hammerCount = computed(() => Math.min(2, Math.floor(burstPower.value * 2.3)))

  const stageStyle = computed(() => ({
    '--p': progress.value.toFixed(3),
    '--scepter-rise': scepterRise.value.toFixed(3),
    '--crown-drop': crownDrop.value.toFixed(3),
    '--wings-open': wingsOpen.value.toFixed(3),
    '--burst-power': burstPower.value.toFixed(3),
    '--px': parallaxX.value.toFixed(3),
    '--py': parallaxY.value.toFixed(3),
  }))
  const sliderStyle = computed(() => ({ '--p': progress.value.toFixed(3) }))

  const crownStatus = computed(() => {
    if (crownDrop.value >= 0.98) return '已加冕'
    return crownDrop.value <= 0.05 ? '未加冕' : '加冕中'
  })
  const spellStatus = computed(() => stormCount.value > 0
    ? `${stormCount.value}×风暴 · ${hammerCount.value}×愤怒锤`
    : '待命蓄力中')

  const detail = computed<StageDetail>(() => {
    const pct = percentage.value
    if (pct < 12) {
      return {
        phase: 'STAGE 00 · 部长候任',
        title: '李部长 (原李处长)',
        status: `候任状态（${pct}%）：李部长（原李处长），等待赴赞比亚加冕。`,
        activeRite: 0,
      }
    }
    if (pct < 32) {
      return {
        phase: 'STAGE 01 · 击鼓三通',
        title: '候任李酋长',
        status: `一、击鼓三通（${pct}%）：87 键青轴机械键盘敲响三声。`,
        activeRite: 0,
      }
    }
    if (pct < 55) {
      return {
        phase: 'STAGE 02 · 授机械权杖',
        title: '候任李酋长',
        status: `二、授杖（${pct}%）：USB-C 铜线盘绕的 87 键机械权杖就位。`,
        activeRite: 1,
      }
    }
    if (pct < 74) {
      return {
        phase: 'STAGE 03 · 圣冠加冕',
        title: '铜带省李酋长',
        status: `三、加冕（${pct}%）：戴上铜带省黄金圣冠，正式改称李酋长。`,
        activeRite: 2,
      }
    }
    if (pct < 87) {
      return {
        phase: 'STAGE 04 · 宣誓与开翼',
        title: '铜带省李酋长',
        status: `四、宣誓（${pct}%）：展开铜鹰之翼，誓词 “I will review your pull request.”`,
        activeRite: 3,
      }
    }
    if (pct < 94) {
      return {
        phase: 'STAGE 05 · 西玛设宴',
        title: '铜带省李酋长',
        status: `五、设宴（${pct}%）：Nshima 管饱配可乐，隐修院印章开始蓄能（+${signetValue.value}）。`,
        activeRite: 4,
      }
    }
    if (pct < 99) {
      return {
        phase: 'STAGE 06 · 跨时区合影',
        title: '铜带省李酋长',
        status: `六、合影（${pct}%）：UTC+2 部族大会全员开摄像头，准备盖下酋长印。`,
        activeRite: 5,
      }
    }
    return {
      phase: 'STAGE 07 · 礼成满载',
      title: '赞比亚李酋长 (721)',
      status: '礼成 100%：隐修院印章爆发（次要属性 +9097），四道神圣风暴与两发愤怒之锤环绕圣冠！',
      activeRite: 6,
    }
  })

  const playLabel = computed(() => {
    if (isPlaying.value) return '⏸ 正在加冕…'
    return percentage.value >= 99 ? '↺ 重播大典' : '▶ 播放大典'
  })
  const dragHint = computed(() => isDragging.value
    ? '↕ 向下拉动戴稳圣冠 · 向上拉动回到部长'
    : '↕ 上下拖拽画面可直接戴冠')

  function saveProgress() {
    try {
      localStorage.setItem('li-coronation', String(percentage.value))
    } catch {
      // 存储不可用时，加冕交互本身不受影响。
    }
  }

  function spawnFloatingText(x: number, y: number, text: string, color = '#ffd100', scale = 1) {
    if (!context) return
    floatingTexts.push({
      x: x + (Math.random() - 0.5) * 24,
      y,
      vy: -1.15 - Math.random() * 0.4,
      text,
      color,
      scale,
      life: 1,
      decay: 0.015,
    })
  }

  function spawnBurst(x: number, y: number, count: number, color = '#ffd100') {
    if (!context) return
    shockwaves.push({ x, y, radius: 16, maxRadius: 250, alpha: 0.9, color })
    for (let index = 0; index < count; index += 1) {
      const angle = (Math.PI * 2 * index) / count + (Math.random() - 0.5) * 0.3
      const speed = 1.6 + Math.random() * 4.2
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8,
        size: 2 + Math.random() * 3.2,
        life: 1,
        decay: 0.014 + Math.random() * 0.016,
        color: index % 3 === 0 ? '#ffd100' : index % 3 === 1 ? '#e09a4e' : '#1ec973',
      })
    }
  }

  function setLevel(level: number, save = false, triggerEffects = false) {
    const previous = percentage.value
    percentage.value = Math.max(0, Math.min(100, Math.round(level)))
    const pct = percentage.value

    if (triggerEffects) {
      if (previous < 18 && pct >= 18) {
        playSfx('drum')
        spawnFloatingText(140, 310, '青轴击鼓 ×3!', '#1ec973', 0.95)
      }
      if (previous < 42 && pct >= 42) {
        playSfx('scepter')
        spawnFloatingText(125, 290, '87键权杖就位!', '#e09a4e')
      }
      if (previous < 68 && pct >= 68) {
        spawnBurst(295, 250, 28, '#e09a4e')
        playSfx('crown')
        spawnFloatingText(295, 195, '圣冠落锁 · RISC-V 721!', '#ffd100', 1.12)
      }
      if (previous < 82 && pct >= 82) {
        spawnFloatingText(295, 340, 'LGTM · 征伐双翼展开!', '#f5c378', 1.05)
      }
      if (previous < 99 && pct >= 99) {
        spawnBurst(295, 320, 48)
        playSfx('burst')
        spawnFloatingText(295, 175, '隐修院印章 +9097!', '#b268f0', 1.25)
        spawnFloatingText(295, 215, '4×神圣风暴 · 2×愤怒之锤!', '#ffd100', 1.1)
      }
    }

    if (save) saveProgress()
  }

  function cancelAnimation() {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame)
    animationFrame = null
  }

  function stopAutoPlay() {
    isPlaying.value = false
  }

  function animateTo(target: number, duration?: number) {
    cancelAnimation()
    stopAutoPlay()
    const start = percentage.value
    const difference = target - start
    if (Math.abs(difference) < 0.5) {
      setLevel(target, true, true)
      return
    }

    const startTime = performance.now()
    const totalDuration = duration ?? Math.max(450, Math.abs(difference) * 42)
    const step = (now: number) => {
      const position = Math.min(1, (now - startTime) / totalDuration)
      const eased = 1 - Math.pow(1 - position, 3)
      setLevel(start + difference * eased, position >= 1, true)
      if (position < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        animationFrame = null
        stopAutoPlay()
      }
    }
    animationFrame = requestAnimationFrame(step)
  }

  function togglePlayback() {
    if (isPlaying.value) {
      cancelAnimation()
      stopAutoPlay()
      return
    }

    cancelAnimation()
    if (percentage.value >= 98) setLevel(0)
    isPlaying.value = true
    const start = percentage.value
    const startTime = performance.now()
    const totalDuration = Math.max(1800, (100 - start) * 52)

    const step = (now: number) => {
      if (!isPlaying.value) return
      const position = Math.min(1, (now - startTime) / totalDuration)
      setLevel(start + (100 - start) * position, position >= 1, true)
      if (position < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        animationFrame = null
        stopAutoPlay()
      }
    }
    animationFrame = requestAnimationFrame(step)
  }

  function onSliderInput(event: Event) {
    cancelAnimation()
    stopAutoPlay()
    setLevel(Number((event.target as HTMLInputElement).value), false, true)
  }

  function onSliderChange(event: Event) {
    setLevel(Number((event.target as HTMLInputElement).value), true)
    stopAutoPlay()
  }

  function onStagePointerDown(event: PointerEvent) {
    if (event.button !== 0 || !stage.value) return
    cancelAnimation()
    stopAutoPlay()
    isDragging.value = true
    dragStartY = event.clientY
    dragStartPercentage = percentage.value
    try {
      stage.value.setPointerCapture(event.pointerId)
    } catch {
      // 某些旧浏览器不支持 Pointer Capture，仍可完成普通拖拽。
    }
  }

  function onStagePointerMove(event: PointerEvent) {
    if (!stage.value) return
    const rect = stage.value.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) {
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      parallaxX.value = Math.max(-1, Math.min(1, x))
      parallaxY.value = Math.max(-1, Math.min(1, y))
    }
    if (!isDragging.value) return
    const distance = event.clientY - dragStartY
    const delta = (distance / Math.max(180, rect.height * 0.55)) * 100
    setLevel(dragStartPercentage + delta, false, true)
  }

  function endStageDrag() {
    if (!isDragging.value) return
    isDragging.value = false
    saveProgress()
    stopAutoPlay()
  }

  function resetParallax() {
    parallaxX.value = 0
    parallaxY.value = 0
  }

  function isJumpActive(target: number): boolean {
    return Math.abs(target - percentage.value) <= 8 || (target === 100 && percentage.value >= 96)
  }

  function renderEffects() {
    if (!context) return
    const ctx = context
    const p = progress.value
    ctx.clearRect(0, 0, 600, 750)
    rayPhase += 0.004 + p * 0.008

    if (p > 0.35) {
      const rayAlpha = (p - 0.35) * 0.22
      ctx.save()
      ctx.translate(295, 295)
      for (let index = 0; index < 8; index += 1) {
        ctx.save()
        ctx.rotate(rayPhase + (index * Math.PI) / 4)
        const gradient = ctx.createLinearGradient(0, 0, 0, -290)
        gradient.addColorStop(0, `rgba(255, 218, 120, ${rayAlpha.toFixed(3)})`)
        gradient.addColorStop(1, 'rgba(255, 218, 120, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(-6, 0)
        ctx.lineTo(-34, -290)
        ctx.lineTo(34, -290)
        ctx.lineTo(6, 0)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
      ctx.restore()
    }

    for (let index = shockwaves.length - 1; index >= 0; index -= 1) {
      const wave = shockwaves[index]
      wave.radius += (wave.maxRadius - wave.radius) * 0.08 + 2.2
      wave.alpha *= 0.93
      ctx.save()
      ctx.beginPath()
      ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
      ctx.strokeStyle = wave.color
      ctx.globalAlpha = wave.alpha
      ctx.lineWidth = 2.5
      ctx.stroke()
      ctx.restore()
      if (wave.alpha < 0.03) shockwaves.splice(index, 1)
    }

    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index]
      const speedScale = particle.ambient ? 0.25 + p * 1.35 : 1
      particle.x += particle.vx * speedScale
      particle.y += particle.vy * speedScale
      particle.life -= particle.decay

      if (particle.ambient) {
        if (particle.y < 10 || particle.life <= 0) {
          particle.x = 60 + Math.random() * 480
          particle.y = 660 + Math.random() * 40
          particle.life = 0.7 + Math.random() * 0.3
        }
      } else if (particle.life <= 0) {
        particles.splice(index, 1)
        continue
      }

      ctx.save()
      ctx.globalAlpha = Math.max(0, particle.life * (particle.ambient ? 0.18 + p * 0.72 : 0.95))
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    for (let index = floatingTexts.length - 1; index >= 0; index -= 1) {
      const text = floatingTexts[index]
      text.y += text.vy
      text.life -= text.decay
      if (text.life <= 0) {
        floatingTexts.splice(index, 1)
        continue
      }
      ctx.save()
      ctx.globalAlpha = Math.max(0, Math.min(1, text.life * 1.3))
      ctx.font = `700 ${Math.round(16 * text.scale)}px "IBM Plex Mono", "Noto Sans SC", sans-serif`
      ctx.textAlign = 'center'
      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(10, 16, 12, 0.9)'
      ctx.strokeText(text.text, text.x, text.y)
      ctx.fillStyle = text.color
      ctx.fillText(text.text, text.x, text.y)
      ctx.restore()
    }

    effectsFrame = requestAnimationFrame(renderEffects)
  }

  onMounted(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem('li-coronation')
    } catch {
      // 使用默认的 100% 礼成状态。
    }
    const initial = saved === null || !Number.isFinite(Number(saved)) ? 100 : Number(saved)
    setLevel(initial)

    if (!canvas.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    context = canvas.value.getContext('2d')
    if (!context) return

    particles = Array.from({ length: 36 }, (_, index) => ({
      x: Math.random() * 600,
      y: Math.random() * 700,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.4 - Math.random() * 1.1,
      size: 1.2 + Math.random() * 2.4,
      life: Math.random(),
      decay: 0.004 + Math.random() * 0.006,
      ambient: true,
      color: index % 4 === 0 ? '#1ec973' : '#f2c374',
    }))
    effectsFrame = requestAnimationFrame(renderEffects)
  })

  onBeforeUnmount(() => {
    cancelAnimation()
    if (effectsFrame !== null) cancelAnimationFrame(effectsFrame)
    particles = []
    shockwaves = []
    floatingTexts = []
    context = null
  })

  return {
    stage,
    canvas,
    percentage,
    isPlaying,
    isDragging,
    stageStyle,
    sliderStyle,
    detail,
    signetValue,
    crownStatus,
    spellStatus,
    playLabel,
    dragHint,
    animateTo,
    togglePlayback,
    onSliderInput,
    onSliderChange,
    onStagePointerDown,
    onStagePointerMove,
    endStageDrag,
    resetParallax,
    isJumpActive,
  }
}
