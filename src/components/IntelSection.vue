<script setup lang="ts">
import { repositories, stats } from '../data/content'
</script>

<template>
  <section id="intel">
    <div class="sec-head">
      <span class="sec-num">二</span>
      <h2>情报档案</h2>
      <span class="sub">Open Source Dossier</span>
    </div>
    <p class="sec-intro">全部取自 GitHub 公开主页，没有打听任何内部消息。</p>

    <dl class="stats">
      <div v-for="stat in stats" :key="stat.label">
        <dt>{{ stat.label }}</dt>
        <dd>{{ stat.value }}<small>{{ stat.note }}</small></dd>
      </div>
    </dl>

    <div class="repos">
      <article v-for="repo in repositories" :key="repo.name" class="repo-card">
        <h3><a :href="repo.url" target="_blank" rel="noopener">{{ repo.name }}</a></h3>
        <p>{{ repo.description }}</p>
        <p class="meta">{{ repo.meta }}</p>
      </article>
    </div>

    <p class="source-note">
      <img src="/assets/li-chief.jpg" alt="GitHub 头像" width="44" height="44" loading="lazy" decoding="async">
      <span>数据抓取时间 2026-10-18 · 来源 github.com/shiptux 公开页面</span>
    </p>
  </section>
</template>
