<script setup lang="ts">
import { watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { coronationJumps, riteSteps } from '../data/content'
import { sfxEnabled, toggleSfx } from '../composables/ceremonyAudio'
import { useCoronation } from '../composables/useCoronation'
import type { PageMode } from '../types'

const props = defineProps<{ mode: PageMode }>()
const {
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
} = useCoronation()

watch(() => props.mode, (mode) => {
  animateTo(mode === 'minister' ? 0 : 100, 900)
})

function setStage(element: Element | ComponentPublicInstance | null) {
  stage.value = element as HTMLDivElement | null
}

function setCanvas(element: Element | ComponentPublicInstance | null) {
  canvas.value = element as HTMLCanvasElement | null
}
</script>

<template>
  <section id="coronation">
    <div class="sec-head">
      <span class="sec-num">四</span>
      <h2>登基大典</h2>
      <span class="sub">Coronation Ceremony &amp; Variac</span>
    </div>
    <p class="sec-intro">拖动「滑动变酋长器」或点「播放大典」，从李部长一路加冕为赞比亚铜带省李酋长。</p>

    <div class="coronation">
      <figure class="poster">
        <div
          :ref="setStage"
          class="poster-art"
          :class="{ 'is-dragging': isDragging }"
          :style="stageStyle"
          @pointerdown="onStagePointerDown"
          @pointermove="onStagePointerMove"
          @pointerup="endStageDrag"
          @pointercancel="endStageDrag"
          @pointerleave="resetParallax"
        >
          <div class="stage-hud">
            <span class="hud-pill">{{ detail.phase }}</span>
            <span class="hud-pill epic">隐修院印章 <b>+{{ signetValue }}</b></span>
          </div>

          <!-- 背景层：非洲铜带几何边框 + 赞达拉/RISC-V 圣光星盘 + 铜鹰征伐之翼 -->
          <svg class="stage-back" viewBox="0 0 600 750" aria-hidden="true">
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff0c2" />
                <stop offset="45%" stop-color="#e59f48" />
                <stop offset="100%" stop-color="#8c4c10" />
              </linearGradient>
              <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffeab3" stop-opacity=".95" />
                <stop offset="55%" stop-color="#d88935" stop-opacity=".82" />
                <stop offset="100%" stop-color="#196b35" stop-opacity=".45" />
              </linearGradient>
              <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffdfa0" stop-opacity=".65" />
                <stop offset="55%" stop-color="#e09a4e" stop-opacity=".22" />
                <stop offset="100%" stop-color="#e09a4e" stop-opacity="0" />
              </radialGradient>
            </defs>
            <rect x="14" y="14" width="572" height="664" fill="none" stroke="rgba(224,154,78,.28)" stroke-width="1" />
            <rect x="20" y="20" width="560" height="652" fill="none" stroke="rgba(224,154,78,.14)" stroke-width="1" />
            <path d="M20 34 L32 22 L44 34 L56 22 L68 34 L80 22 L92 34 M508 34 L520 22 L532 34 L544 22 L556 34 L568 22 L580 34" fill="none" stroke="rgba(224,154,78,.32)" stroke-width="1.5" />
            <circle cx="296" cy="345" r="250" fill="url(#sunCore)" />

            <g class="mandala-outer">
              <circle cx="296" cy="345" r="228" fill="none" stroke="rgba(224,154,78,.35)" stroke-width="1.2" />
              <circle cx="296" cy="345" r="212" fill="none" stroke="rgba(224,154,78,.55)" stroke-width="1.5" stroke-dasharray="4 8" />
              <circle cx="296" cy="345" r="188" fill="none" stroke="rgba(224,154,78,.28)" stroke-width="1" />
              <polygon points="296,95 335,250 490,210 385,345 490,480 335,440 296,595 257,440 102,480 207,345 102,210 257,250" fill="none" stroke="rgba(224,154,78,.26)" stroke-width="1.2" />
              <polygon points="296,120 365,275 521,345 365,415 296,570 227,415 71,345 227,275" fill="none" stroke="rgba(246,212,148,.36)" stroke-width="1.4" />
            </g>

            <g class="mandala-inner">
              <circle cx="296" cy="345" r="158" fill="none" stroke="rgba(246,205,130,.5)" stroke-width="2" stroke-dasharray="18 6 4 6" />
              <rect x="184" y="233" width="224" height="224" fill="none" stroke="rgba(224,154,78,.30)" stroke-width="1.2" />
              <rect x="184" y="233" width="224" height="224" fill="none" stroke="rgba(224,154,78,.30)" stroke-width="1.2" transform="rotate(45 296 345)" />
            </g>

            <g class="storm-ring">
              <circle cx="296" cy="345" r="244" fill="none" stroke="rgba(255,209,0,.45)" stroke-width="2.5" stroke-dasharray="28 68" />
              <g transform="translate(296, 101)">
                <rect x="-14" y="-7" width="28" height="14" rx="2" fill="url(#goldGrad)" stroke="#fff3c4" stroke-width="1" />
                <rect x="-3" y="7" width="6" height="18" rx="1" fill="#c97a2b" />
              </g>
              <g transform="translate(540, 345) rotate(90)">
                <rect x="-14" y="-7" width="28" height="14" rx="2" fill="url(#goldGrad)" stroke="#fff3c4" stroke-width="1" />
                <rect x="-3" y="7" width="6" height="18" rx="1" fill="#c97a2b" />
              </g>
              <g transform="translate(296, 589) rotate(180)">
                <rect x="-14" y="-7" width="28" height="14" rx="2" fill="url(#goldGrad)" stroke="#fff3c4" stroke-width="1" />
                <rect x="-3" y="7" width="6" height="18" rx="1" fill="#c97a2b" />
              </g>
              <g transform="translate(52, 345) rotate(270)">
                <rect x="-14" y="-7" width="28" height="14" rx="2" fill="url(#goldGrad)" stroke="#fff3c4" stroke-width="1" />
                <rect x="-3" y="7" width="6" height="18" rx="1" fill="#c97a2b" />
              </g>
            </g>

            <g class="wing-left">
              <path d="M270 495 C 195 430, 95 340, 18 235 C 65 250, 130 280, 195 335 C 120 295, 48 280, 8 295 C 58 318, 128 352, 198 395 C 132 372, 62 365, 22 385 C 72 405, 145 430, 218 455 C 162 448, 98 450, 58 472 C 115 485, 188 495, 265 512 Z" fill="url(#wingGrad)" stroke="#ffdfa0" stroke-width="1.4" stroke-linejoin="round" />
            </g>
            <g class="wing-right">
              <path d="M325 495 C 400 430, 500 340, 577 235 C 530 250, 465 280, 400 335 C 475 295, 547 280, 587 295 C 537 318, 467 352, 397 395 C 463 372, 533 365, 573 385 C 523 405, 450 430, 377 455 C 433 448, 497 450, 537 472 C 480 485, 407 495, 330 512 Z" fill="url(#wingGrad)" stroke="#ffdfa0" stroke-width="1.4" stroke-linejoin="round" />
            </g>
          </svg>

          <div class="subject-wrap">
            <img class="cut-natural" src="/assets/li-cutout.webp" alt="李部长本人剪影" width="460" height="460" loading="lazy" decoding="async">
          </div>

          <!-- 前景层：加冕准星导轨 + 圣冠 + 墨镜流光 + 酋长领饰 + 87 键青轴权杖 -->
          <svg class="stage-front" viewBox="0 0 600 750" aria-hidden="true">
            <defs>
              <linearGradient id="crownMetal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#9e5614" />
                <stop offset="22%" stop-color="#f5c378" />
                <stop offset="50%" stop-color="#fff1c7" />
                <stop offset="78%" stop-color="#e0943c" />
                <stop offset="100%" stop-color="#8b480c" />
              </linearGradient>
              <linearGradient id="crownDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#d88935" />
                <stop offset="100%" stop-color="#5c2d06" />
              </linearGradient>
              <linearGradient id="lensSheen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
                <stop offset="45%" stop-color="#ffe7a8" stop-opacity=".68" />
                <stop offset="58%" stop-color="#ffffff" stop-opacity=".92" />
                <stop offset="70%" stop-color="#e09a4e" stop-opacity="0" />
              </linearGradient>
            </defs>

            <g class="crown-guide">
              <line x1="295" y1="45" x2="295" y2="235" stroke="#f0b35e" stroke-width="1" stroke-dasharray="3 5" />
              <line x1="170" y1="252" x2="420" y2="224" stroke="rgba(240,179,94,.45)" stroke-width="1" stroke-dasharray="4 4" />
            </g>

            <g class="crown-rig">
              <polygon points="184,254 205,176 248,220 295,142 342,220 385,176 406,254" fill="url(#crownDark)" stroke="#633208" stroke-width="1.5" />
              <path d="M 176 256 L 168 178 L 214 222 L 238 154 L 268 214 L 295 122 L 322 214 L 352 154 L 376 222 L 422 178 L 414 256 Q 295 274 176 256 Z" fill="url(#crownMetal)" stroke="#4a2203" stroke-width="2.2" stroke-linejoin="round" />
              <path d="M 192 242 L 238 180 L 268 228 L 295 152 L 322 228 L 352 180 L 398 242" fill="none" stroke="#fff3cf" stroke-width="1.6" stroke-opacity=".8" />
              <path d="M 172 252 Q 295 270 418 252 L 420 272 Q 295 292 170 272 Z" fill="url(#crownMetal)" stroke="#4a2203" stroke-width="2" />
              <path d="M 178 261 Q 295 279 412 261" fill="none" stroke="#612e04" stroke-width="1.4" stroke-dasharray="8 6" />
              <polygon points="295,186 307,204 295,222 283,204" fill="#b268f0" stroke="#fff1c7" stroke-width="1.6" />
              <circle cx="238" cy="218" r="7.5" fill="#1ec973" stroke="#fff1c7" stroke-width="1.5" />
              <circle cx="352" cy="218" r="7.5" fill="#1ec973" stroke="#fff1c7" stroke-width="1.5" />
              <circle cx="196" cy="230" r="5.5" fill="#e04850" stroke="#fff1c7" stroke-width="1.3" />
              <circle cx="394" cy="230" r="5.5" fill="#e04850" stroke="#fff1c7" stroke-width="1.3" />
              <circle cx="295" cy="118" r="7" fill="#fff5d6" stroke="#b56719" stroke-width="2" />
              <circle cx="238" cy="150" r="5.5" fill="#ffebba" stroke="#b56719" stroke-width="1.6" />
              <circle cx="352" cy="150" r="5.5" fill="#ffebba" stroke="#b56719" stroke-width="1.6" />
              <circle cx="167" cy="174" r="5" fill="#ffebba" stroke="#b56719" stroke-width="1.5" />
              <circle cx="423" cy="174" r="5" fill="#ffebba" stroke="#b56719" stroke-width="1.5" />
              <text x="295" y="271" text-anchor="middle" fill="#3a1900" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="10.5" letter-spacing="3">RISC-V · 721</text>
            </g>

            <g class="lens-glint">
              <polygon points="178,362 196,359 182,398 166,400" fill="url(#lensSheen)" />
              <polygon points="265,347 285,344 270,386 252,388" fill="url(#lensSheen)" />
              <text x="204" y="388" text-anchor="middle" fill="#ffd100" fill-opacity=".82" font-family="IBM Plex Mono, monospace" font-size="8.5" letter-spacing="1" transform="rotate(-8 204 388)">LGTM</text>
              <text x="292" y="375" text-anchor="middle" fill="#b268f0" fill-opacity=".88" font-family="IBM Plex Mono, monospace" font-size="8.5" letter-spacing="1" transform="rotate(-8 292 375)">+9097</text>
            </g>

            <g class="regalia-collar">
              <path d="M 195 545 Q 285 605 395 538 Q 382 575 285 628 Q 202 582 195 545 Z" fill="url(#crownMetal)" fill-opacity=".88" stroke="#4a2203" stroke-width="1.6" />
              <path d="M 218 564 L 232 582 L 248 570 L 266 592 L 285 576 L 304 592 L 322 570 L 338 582 L 356 560" fill="none" stroke="#1ec973" stroke-width="2" />
            </g>

            <g class="scepter-rig">
              <rect x="88" y="378" width="12" height="310" rx="5" fill="url(#crownMetal)" stroke="#3d1c02" stroke-width="1.8" />
              <path d="M 86 410 Q 104 425 86 440 Q 104 455 86 470 Q 104 485 86 500 Q 104 515 86 530" fill="none" stroke="#1ec973" stroke-width="2.2" />
              <path d="M 52 382 Q 94 402 136 382 L 126 396 Q 94 410 62 396 Z" fill="url(#crownMetal)" stroke="#3d1c02" stroke-width="1.6" />
              <rect x="34" y="302" width="120" height="76" rx="7" fill="#18201b" stroke="url(#crownMetal)" stroke-width="3.2" />
              <rect x="41" y="309" width="106" height="62" rx="4" fill="#0d130f" stroke="rgba(224,154,78,.35)" stroke-width="1" />
              <g>
                <rect x="46" y="315" width="12" height="10" rx="2" fill="#e04850" />
                <rect x="62" y="315" width="12" height="10" rx="2" fill="#3bb4c1" />
                <rect x="78" y="315" width="12" height="10" rx="2" fill="#3bb4c1" />
                <rect x="94" y="315" width="12" height="10" rx="2" fill="#e09a4e" />
                <rect x="110" y="315" width="12" height="10" rx="2" fill="#e09a4e" />
                <rect x="126" y="315" width="16" height="10" rx="2" fill="#1ec973" />
                <rect x="46" y="329" width="16" height="11" rx="2" fill="#e09a4e" />
                <rect x="66" y="329" width="13" height="11" rx="2" fill="#f2d29b" />
                <rect x="83" y="329" width="13" height="11" rx="2" fill="#f2d29b" />
                <rect x="100" y="329" width="13" height="11" rx="2" fill="#f2d29b" />
                <rect x="117" y="329" width="25" height="11" rx="2" fill="#b268f0" />
                <rect x="46" y="344" width="19" height="11" rx="2" fill="#1ec973" />
                <rect x="69" y="344" width="48" height="11" rx="2" fill="url(#crownMetal)" />
                <rect x="121" y="344" width="21" height="11" rx="2" fill="#e04850" />
                <text x="94" y="366" text-anchor="middle" fill="#f2d29b" font-family="IBM Plex Mono, monospace" font-size="8" letter-spacing="1.5">87-KEY SCEPTER</text>
              </g>
            </g>
          </svg>

          <canvas :ref="setCanvas" class="stage-fx" width="600" height="750" aria-hidden="true"></canvas>
          <div class="stage-drag-hint">{{ dragHint }}</div>
          <div class="stage-stamp" aria-hidden="true"><span>李</span><span>酋</span><span>长</span><span>印</span></div>
          <div class="plaque">
            <span class="t-minister">李部长 · MINISTER OF COMMUNITY</span>
            <span class="t-chief">李酋长 · CHIEF OF COPPERBELT</span>
            <b>{{ percentage }}%</b>
          </div>
        </div>

        <div class="variac">
          <div class="vhead">
            <label class="vtitle" for="coronation-slider">滑动变酋长器 · VARIAC</label>
            <div class="vcontrols">
              <output for="coronation-slider">{{ percentage }}%</output>
              <button type="button" class="sfx-btn" :aria-pressed="sfxEnabled" title="开关礼乐音效" @click="toggleSfx">
                {{ sfxEnabled ? '🔊 礼乐' : '🔇 静音' }}
              </button>
              <button type="button" class="play-btn" :data-playing="isPlaying" @click="togglePlayback">{{ playLabel }}</button>
            </div>
          </div>

          <input
            id="coronation-slider"
            type="range"
            min="0"
            max="100"
            step="1"
            :value="percentage"
            :style="sliderStyle"
            aria-describedby="coronation-status"
            @input="onSliderInput"
            @change="onSliderChange"
          >

          <div class="stage-jumps" role="group" aria-label="快捷切换加冕阶段">
            <button
              v-for="jump in coronationJumps"
              :key="jump.value"
              type="button"
              :class="{ 'is-active': isJumpActive(jump.value) }"
              @click="animateTo(jump.value, 700)"
            >{{ jump.label }}</button>
          </div>

          <p id="coronation-status" class="status" aria-live="polite">{{ detail.status }}</p>
          <div class="telemetry" aria-label="加冕实时参数">
            <div><span>当前头衔</span><b>{{ detail.title }}</b></div>
            <div><span>加冕礼冠</span><b>{{ crownStatus }}</b></div>
            <div><span>隐修院印章</span><b>+{{ signetValue }} 次要属性</b></div>
            <div><span>爆发技能</span><b>{{ spellStatus }}</b></div>
          </div>
        </div>
      </figure>

      <div class="rite-wrap">
        <ol class="rite">
          <li
            v-for="(step, index) in riteSteps"
            :key="step.target"
            :class="{
              fin: step.final,
              'is-current': detail.activeRite === index,
              'is-done': detail.activeRite > index,
            }"
            role="button"
            tabindex="0"
            @click="animateTo(step.target, 800)"
            @keydown.enter="animateTo(step.target, 800)"
            @keydown.space.prevent="animateTo(step.target, 800)"
          >
            <b>{{ step.title }}</b>
            <em class="pct-tag">{{ step.tag }}</em>
            <span v-if="step.description">{{ step.description }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
