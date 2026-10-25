<script setup lang="ts">
import type { PageMode } from '../types'

defineProps<{ mode: PageMode }>()
const emit = defineEmits<{ change: [mode: PageMode] }>()
</script>

<template>
  <header class="bar">
    <div class="mark">
      <b><span class="only-chief">李酋长</span><span class="only-minister">李部长</span></b>
      <small>赴赞比亚 · LUSAKA, ZAMBIA</small>
    </div>
    <div class="bar-nav">
      <nav class="bar-links" aria-label="章节导航">
        <a href="#career">履历</a>
        <a href="#intel">档案</a>
        <a href="#deed">任命状</a>
        <a href="#coronation">登基大典</a>
        <a href="#planks">纲领</a>
        <a href="#quote">原话</a>
      </nav>
      <div class="switch" role="group" aria-label="切换头衔">
        <button
          type="button"
          class="mode-btn"
          :aria-pressed="mode === 'minister'"
          @click="emit('change', 'minister')"
        >部长模式</button>
        <button
          type="button"
          class="mode-btn"
          :aria-pressed="mode === 'chief'"
          @click="emit('change', 'chief')"
        >酋长模式</button>
      </div>
    </div>
  </header>
</template>
