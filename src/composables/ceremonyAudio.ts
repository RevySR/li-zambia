import { ref } from 'vue'

export type SoundEffect = 'drum' | 'scepter' | 'crown' | 'burst' | 'seal'

export const sfxEnabled = ref(true)
let audioContext: AudioContext | null = null

function ensureAudio(): AudioContext | null {
  if (!sfxEnabled.value) return null
  const AudioContextClass = window.AudioContext
  if (!AudioContextClass) return null

  if (!audioContext) {
    try {
      audioContext = new AudioContextClass()
    } catch {
      return null
    }
  }
  if (audioContext.state === 'suspended') {
    void audioContext.resume().catch(() => {})
  }
  return audioContext
}

function tone(
  context: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  volume: number,
  type: OscillatorType,
  endFrequency?: number,
) {
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  if (endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration - 0.005)
  }
  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.01)
}

export function playSfx(kind: SoundEffect) {
  const context = ensureAudio()
  if (!context) return
  const now = context.currentTime

  switch (kind) {
    case 'drum':
      // 87 键青轴机械键盘的清脆三连击。
      ;[0, 0.11, 0.22].forEach((offset) => {
        tone(context, 1950, now + offset, 0.05, 0.11, 'triangle', 420)
      })
      break
    case 'scepter':
      ;[523.25, 659.25].forEach((frequency, index) => {
        tone(context, frequency, now + index * 0.08, 0.22, 0.08, 'sine')
      })
      break
    case 'crown':
      ;[440, 880, 1318.5].forEach((frequency, index) => {
        tone(context, frequency, now, 0.45, 0.09 / (index + 1), index === 0 ? 'triangle' : 'sine')
      })
      break
    case 'burst':
      ;[293.66, 369.99, 440, 587.33, 880].forEach((frequency, index) => {
        tone(context, frequency, now + index * 0.04, 0.85, 0.075, index % 2 === 0 ? 'triangle' : 'sine')
      })
      break
    case 'seal':
      tone(context, 160, now, 0.16, 0.22, 'sine', 42)
      break
  }
}

export function toggleSfx() {
  sfxEnabled.value = !sfxEnabled.value
  if (sfxEnabled.value) playSfx('crown')
}
