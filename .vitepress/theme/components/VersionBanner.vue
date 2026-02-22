<script setup>
import { computed, onUnmounted, watchEffect } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

const bannerConfig = computed(() => theme.value.versionBanner)

const isVisible = computed(() => {
  if (bannerConfig.value === true) {
    return true
  }

  if (bannerConfig.value && typeof bannerConfig.value === 'object') {
    return bannerConfig.value.enabled !== false
  }

  return false
})

const message = computed(() => {
  if (bannerConfig.value && typeof bannerConfig.value === 'object' && bannerConfig.value.message) {
    return bannerConfig.value.message
  }

  return 'This version of the documentation is outdated.'
})

const link = computed(() => {
  if (bannerConfig.value && typeof bannerConfig.value === 'object') {
    return bannerConfig.value.link || ''
  }

  return ''
})

const linkText = computed(() => {
  if (bannerConfig.value && typeof bannerConfig.value === 'object' && bannerConfig.value.linkText) {
    return bannerConfig.value.linkText
  }

  return 'View the latest version.'
})

const activeClassName = 'has-version-banner'

function toggleActiveClass(isActive) {
  if (typeof document === 'undefined') {
    return
  }

  document.body.classList.toggle(activeClassName, isActive)
}

watchEffect(() => {
  toggleActiveClass(isVisible.value)
})

onUnmounted(() => {
  toggleActiveClass(false)
})
</script>

<template>
  <div
    v-if="isVisible"
    class="version-banner"
    role="status"
    aria-live="polite"
  >
    {{ message }}
    <a v-if="link" :href="link">{{ linkText }}</a>
  </div>
</template>


<style scoped>
  .version-banner {
    position: fixed;
    z-index: 1;
    top: var(--vp-nav-height);
    background: #fff7e8;
    color: #734a00;
    padding: 12px 16px;
    width: 100%;
    text-align: center;
    user-select: none;
  }

  .version-banner a {
    color: inherit;
    text-decoration: underline;
  }

  .dark .version-banner {
    border-color: #9b6a1f;
    background: #2d2417;
    color: #f3c372;
  }
</style>
