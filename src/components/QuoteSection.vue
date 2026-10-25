<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { wowRotation } from '../data/content'

const elapsed = ref(0)
const started = ref(false)
const casting = ref(false)
const bursting = ref(false)
let interval: ReturnType<typeof setInterval> | undefined
let finishTimer: ReturnType<typeof setTimeout> | undefined

const timerText = computed(() => {
  if (!started.value) return '持续 20 秒 · 瞬发'
  if (elapsed.value >= 20) return '20 秒爆发完成 · 4×神圣风暴 + 2×愤怒之锤'
  return `爆发剩余 ${Math.max(0, 20 - elapsed.value).toFixed(1)} 秒 · +9097 次要属性`
})

const buttonText = computed(() => {
  if (casting.value) return '🔥 爆发进行中（4×倍速演练）'
  return started.value ? '⚡ 再次触发 20 秒爆发' : '⚡ 触发 20 秒爆发演练'
})

const progressStyle = computed(() => ({
  width: `${Math.min(100, (elapsed.value / 20) * 100)}%`,
}))

function startBurst() {
  clearInterval(interval)
  clearTimeout(finishTimer)
  elapsed.value = 0
  started.value = true
  casting.value = true
  bursting.value = true

  interval = setInterval(() => {
    elapsed.value += 0.2
    if (elapsed.value < 20) return

    clearInterval(interval)
    interval = undefined
    finishTimer = setTimeout(() => {
      casting.value = false
      bursting.value = false
    }, 600)
  }, 50)
}

onBeforeUnmount(() => {
  clearInterval(interval)
  clearTimeout(finishTimer)
})
</script>

<template>
  <section id="quote">
    <div class="sec-head">
      <span class="sec-num">六</span>
      <h2>他自己的话</h2>
      <span class="sub">In His Own Words</span>
    </div>
    <p class="sec-intro">要介绍他，不如让他自己说。下面两段都是原话：一段在艾泽拉斯说的，一段写在 GitHub 上。</p>

    <figure class="wow-figure">
      <div class="wow" :class="{ 'is-bursting': bursting }">
        <div class="tt-title">
          <span>李酋长 · 自我介绍</span>
          <span class="cd" aria-live="polite">{{ timerText }}</span>
        </div>
        <p class="tt-meta">80 级 · 装备等级 721 · 赞达拉巨魔 · 惩戒</p>
        <hr>
        <p class="tt-body">我是一个<span class="num">80</span>级装备等级<span class="num">721</span>的赞达拉巨魔惩戒骑，我将使用<span class="item">隐修院印章</span>使我最高的次要属性提高<span class="num">9097</span>持续<span class="num">20</span>秒，并在这<span class="num">20</span>秒中打出<span class="num">4</span>次神圣风暴和两发愤怒之锤。</p>
        <div class="burst-bar" aria-hidden="true"><i :style="progressStyle"></i></div>
        <div class="rotation" aria-label="20秒爆发技能序列">
          <span
            v-for="step in wowRotation"
            :key="step.time"
            class="rot-step"
            :class="{
              'is-epic': step.epic,
              'is-lit': elapsed > 0 && elapsed >= step.time,
            }"
          >{{ step.label }}</span>
        </div>
        <hr>
        <div class="tt-foot">
          <p class="tt-meta">来源：本人原话，一字未改</p>
          <button type="button" class="cast-btn" @click="startBurst">{{ buttonText }}</button>
        </div>
      </div>
      <figcaption>去赞比亚当酋长之前，他在艾泽拉斯还有一份兼职。</figcaption>
    </figure>

    <div class="quote">
      <blockquote>“must try harder.”</blockquote>
      <cite>GitHub 个人签名 · 写在主页上的那一句</cite>
      <p class="also">地点栏填的是「银河系」。看他的提交记录，这句话大概是认真的。</p>
    </div>
  </section>
</template>
