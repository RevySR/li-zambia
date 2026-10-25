<script setup lang="ts">
import { ref, watch } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import RouteStrip from './components/RouteStrip.vue'
import CareerSection from './components/CareerSection.vue'
import IntelSection from './components/IntelSection.vue'
import AppointmentDeed from './components/AppointmentDeed.vue'
import CoronationSection from './components/CoronationSection.vue'
import PolicySection from './components/PolicySection.vue'
import QuoteSection from './components/QuoteSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import type { PageMode } from './types'

function getInitialMode(): PageMode {
  try {
    return localStorage.getItem('li-mode') === 'minister' ? 'minister' : 'chief'
  } catch {
    return 'chief'
  }
}

const mode = ref<PageMode>(getInitialMode())

watch(mode, (value) => {
  document.title = value === 'chief' ? '李酋长 · 铜带省就职档案' : '李部长 · 候任档案'
}, { immediate: true })

function changeMode(value: PageMode) {
  mode.value = value
  try {
    localStorage.setItem('li-mode', value)
  } catch {
    // 隐私模式下无法写入 localStorage 时，仍保留当前会话的切换。
  }
}
</script>

<template>
  <div class="rail" aria-hidden="true">
    <span class="s1"></span><span class="s2"></span><span class="s3"></span>
  </div>

  <div id="page" :data-mode="mode">
    <SiteHeader :mode="mode" @change="changeMode" />

    <main>
      <HeroSection />
      <RouteStrip />
      <CareerSection />
      <IntelSection />
      <AppointmentDeed />
      <CoronationSection :mode="mode" />
      <PolicySection />
      <QuoteSection />
    </main>

    <SiteFooter />
  </div>
</template>
