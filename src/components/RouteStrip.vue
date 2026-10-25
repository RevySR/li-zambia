<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const clockCn = ref('--:--:--')
const clockZm = ref('--:--:--')
let timer: ReturnType<typeof setInterval> | undefined

function pad2(value: number): string {
  return String(value).padStart(2, '0')
}

function timeAtOffset(offsetHours: number): string {
  const now = new Date()
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000
  const local = new Date(utcMs + offsetHours * 3_600_000)
  return `${pad2(local.getHours())}:${pad2(local.getMinutes())}:${pad2(local.getSeconds())}`
}

function updateClocks() {
  clockCn.value = timeAtOffset(8)
  clockZm.value = timeAtOffset(2)
}

onMounted(() => {
  updateClocks()
  timer = setInterval(updateClocks, 1000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="route rise d4">
    <div class="head">
      <b>迁徙航线</b>
      <span>北京 PEK → 卢萨卡 LUN</span>
      <span class="dist">大圆航程约 10,000 KM · 跨 6 个时区</span>
    </div>
    <svg viewBox="0 0 900 150" role="img" aria-label="从中国北京飞往赞比亚卢萨卡的航线示意图">
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="var(--flag-red)" />
          <stop offset="50%" stop-color="var(--accent)" />
          <stop offset="100%" stop-color="var(--flag-orange)" />
        </linearGradient>
      </defs>
      <line x1="50" y1="118" x2="850" y2="118" stroke="var(--line-soft)" stroke-dasharray="3 5" />
      <path d="M 70 118 C 280 20, 620 20, 830 118" fill="none" stroke="var(--line)" stroke-width="2" />
      <path class="dash" d="M 70 118 C 280 20, 620 20, 830 118" fill="none" stroke="url(#routeGrad)" stroke-width="3" />
      <circle cx="315" cy="52" r="3.5" fill="var(--muted)" />
      <text x="315" y="38" text-anchor="middle" fill="var(--muted)" font-family="IBM Plex Mono, monospace" font-size="11">印度洋航段</text>
      <circle cx="585" cy="52" r="3.5" fill="var(--muted)" />
      <text x="585" y="38" text-anchor="middle" fill="var(--muted)" font-family="IBM Plex Mono, monospace" font-size="11">东非大裂谷</text>
      <circle cx="70" cy="118" r="8" fill="var(--flag-red)" />
      <circle cx="70" cy="118" r="14" fill="none" stroke="var(--flag-red)" stroke-opacity=".35" stroke-width="1.5" />
      <circle cx="830" cy="118" r="8" fill="var(--flag-orange)" />
      <circle cx="830" cy="118" r="14" fill="none" stroke="var(--flag-orange)" stroke-opacity=".45" stroke-width="1.5" />
      <g class="plane-group"><path d="M12 0 L-8 -7 L-4 0 L-8 7 Z" fill="var(--accent)" /></g>
    </svg>
    <dl class="grid3">
      <div>
        <dt>出发 · ORIGIN</dt>
        <dd>北京 · <b>UTC+8</b> <span class="clock">{{ clockCn }}</span></dd>
      </div>
      <div>
        <dt>抵达 · DESTINATION</dt>
        <dd>卢萨卡 Lusaka · <b>UTC+2</b> <span class="clock">{{ clockZm }}</span></dd>
      </div>
      <div>
        <dt>落地须知 · BRIEFING</dt>
        <dd>时差 <b>6</b> 小时，官方语言英语与本巴语，货币克瓦查</dd>
      </div>
    </dl>
  </div>
</template>
