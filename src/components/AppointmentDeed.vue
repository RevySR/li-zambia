<script setup lang="ts">
import { computed, ref } from 'vue'
import SealStamp from './SealStamp.vue'
import { playSfx } from '../composables/ceremonyAudio'

const stampCount = ref(0)
const stampNote = computed(() => stampCount.value === 0
  ? '点击朱印可盖章续期'
  : `已亲自加盖御印 ${stampCount.value} 次 · 任期顺延至下 ${stampCount.value} 次 rebase`)

function stamp() {
  stampCount.value += 1
  playSfx('seal')
}
</script>

<template>
  <section id="deed">
    <div class="sec-head">
      <span class="sec-num">三</span>
      <h2>任命状</h2>
      <span class="sub">Letter of Appointment</span>
    </div>

    <div class="deed">
      <div class="deed-head">
        <div>
          <h2>兹任命 李部长 为 荣誉酋长</h2>
          <p class="sub">Republic of Zambia · Copperbelt Province</p>
        </div>
        <SealStamp aria-label="点击加盖李酋长御印" @stamp="stamp" />
      </div>

      <p class="body">
        兹任命 <em>李部长</em> 为赞比亚共和国铜带省 <span class="fill">荣誉酋长</span>，主管 RISC-V 事务、开源社区外交与跨时区 standup。任期至下一次 rebase 为止，可无限续期。
      </p>

      <dl class="perms">
        <div><dt>前序职级</dt><dd>李处长 → 李部长（群众口头提拔）</dd></div>
        <div><dt>领地</dt><dd>铜带省 Copperbelt，含所有能连上 Wi-Fi 的村落</dd></div>
        <div><dt>权杖</dt><dd>机械键盘一把，键帽不得更换</dd></div>
        <div><dt>语言</dt><dd>中文、English、Bemba、C</dd></div>
        <div><dt>货币</dt><dd>克瓦查 Kwacha，也接受 commit 结算</dd></div>
        <div><dt>座驾</dt><dd>银河系内任意交通工具</dd></div>
        <div><dt>装备</dt><dd>装备等级 721，隐修院印章常备，爆发期 20 秒</dd></div>
        <div><dt>例会</dt><dd>每周一次部族大会，UTC+2，与北京时间差 6 小时</dd></div>
      </dl>

      <div class="sign">
        <div>
          <div class="who"><span class="only-chief">李酋长</span><span class="only-minister">李部长</span></div>
          <div class="sub sign-id">@shiptux · 全网通用</div>
          <p class="stamp-note" aria-live="polite">{{ stampNote }}</p>
        </div>
        <SealStamp class="sm" title="点击加盖李酋长印" aria-label="点击加盖李酋长御印" @stamp="stamp" />
      </div>
    </div>
  </section>
</template>
