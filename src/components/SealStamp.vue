<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'

const emit = defineEmits<{ stamp: [] }>()
const seal = ref<HTMLButtonElement | null>(null)
const rotation = ref('-6deg')
const stamping = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function stamp() {
  rotation.value = `${(-11 + Math.random() * 10).toFixed(1)}deg`
  stamping.value = false
  await nextTick()
  if (!seal.value) return
  void seal.value.offsetWidth
  stamping.value = true
  emit('stamp')
  clearTimeout(timer)
  timer = setTimeout(() => { stamping.value = false }, 360)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <button
    ref="seal"
    type="button"
    class="seal"
    :class="{ 'is-stamping': stamping }"
    :style="{ '--seal-rot': rotation }"
    @click="stamp"
  >
    <span>李</span>
    <span class="only-chief">酋</span><span class="only-minister">部</span>
    <span>长</span>
    <span>印</span>
  </button>
</template>
