<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  delay: {
    type: Number,
    default: 4500,
  },
})

const activeIndex = ref(0)
const hovered = ref(false)
const viewportWidth = ref(window.innerWidth)
let timerId = null

const visibleCount = computed(() => {
  if (viewportWidth.value < 768) {
    return 1
  }
  if (viewportWidth.value < 1100) {
    return 2
  }
  return 3
})

const maxIndex = computed(() => Math.max(0, props.items.length - visibleCount.value))

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIndex.value * (100 / visibleCount.value)}%)`,
}))

function handleResize() {
  viewportWidth.value = window.innerWidth
}

function nextSlide() {
  if (!props.items.length) {
    return
  }
  activeIndex.value = activeIndex.value >= maxIndex.value ? 0 : activeIndex.value + 1
}

function prevSlide() {
  if (!props.items.length) {
    return
  }
  activeIndex.value = activeIndex.value <= 0 ? maxIndex.value : activeIndex.value - 1
}

function goToSlide(index) {
  activeIndex.value = Math.max(0, Math.min(index, maxIndex.value))
}

function clearAutoplay() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

function startAutoplay() {
  clearAutoplay()
  if (!props.autoplay || hovered.value || props.items.length <= visibleCount.value) {
    return
  }
  timerId = setInterval(nextSlide, props.delay)
}

watch([() => props.autoplay, () => props.items.length, visibleCount, hovered], () => {
  if (activeIndex.value > maxIndex.value) {
    activeIndex.value = maxIndex.value
  }
  startAutoplay()
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
  startAutoplay()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  clearAutoplay()
})
</script>

<template>
  <div
    class="relative group focus-within:z-10"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="hovered = true"
    @focusout="hovered = false"
  >
    <div class="overflow-hidden">
      <div class="flex transition-transform duration-[420ms] ease-out" :style="trackStyle">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="shrink-0 min-w-0"
          :style="{ flexBasis: `${100 / visibleCount}%` }"
        >
          <slot name="item" :item="item" :index="index" />
        </div>
      </div>
    </div>

    <div class="mt-4 md:mt-[26px] flex justify-center gap-3 md:gap-[14px]" aria-label="Karusel boshqaruvi">
      <button class="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full border border-[#e3e7ef] bg-white text-xl md:text-[22px] flex items-center justify-center cursor-pointer shadow-[0_8px_18px_rgba(19,23,32,0.08)] hover:-translate-y-px transition-transform text-[#1a2744]" type="button" aria-label="Oldingi" @click="prevSlide">
        ←
      </button>
      <button class="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full border border-[#e3e7ef] bg-white text-xl md:text-[22px] flex items-center justify-center cursor-pointer shadow-[0_8px_18px_rgba(19,23,32,0.08)] hover:-translate-y-px transition-transform text-[#1a2744]" type="button" aria-label="Keyingi" @click="nextSlide">
        →
      </button>
    </div>

    <div class="mt-3 md:mt-[14px] flex justify-center gap-2" role="tablist" aria-label="Karusel navigatsiyasi">
      <button
        v-for="(_, index) in maxIndex + 1"
        :key="`dot-${index}`"
        type="button"
        class="h-2 md:h-[9px] rounded-full border-none p-0 transition-all duration-300"
        :class="index === activeIndex ? 'w-5 md:w-[24px] bg-[#202b47]' : 'w-2 md:w-[9px] bg-[#c8ccd4] hover:bg-[#aab0bd]'"
        :aria-label="`${index + 1}-slayd`"
        @click="goToSlide(index)"
      />
    </div>
  </div>
</template>