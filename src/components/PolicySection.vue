<script setup lang="ts">
import { planks } from '../data/content'
</script>

<template>
  <section id="planks">
    <div class="sec-head">
      <span class="sec-num">五</span>
      <h2>施政纲领</h2>
      <span class="sub">Six Planks</span>
    </div>
    <p class="sec-intro">上任第一天的六条，写下来好对照着做。</p>
    <div class="planks">
      <!-- 内容来自仓库内的静态数据，不包含用户输入。 -->
      <article v-for="plank in planks" :key="plank" class="plank"><p v-html="plank"></p></article>
    </div>
  </section>
</template>
