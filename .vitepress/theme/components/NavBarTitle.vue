<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()
const pluginName = computed(() => theme.value?.pluginName || null)
const siteTitle = computed(() => theme.value?.siteTitle ?? null)
const isActive = computed(() => siteTitle.value === false)
</script>

<template>
  <div v-if="isActive" class="nav-bar-title-custom">
    <span class="title-text">CakePHP</span>
    <span v-if="pluginName" class="plugin-name">
      <svg class="plugin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M14 20.6703L12.7 21.4003C12.4667 21.5336 12.2333 21.6003 12 21.6003C11.7667 21.6003 11.5333 21.5336 11.3 21.4003L3.55 17.0003C3.06667 16.7336 2.75 16.2669 2.6 15.6003V8.40029C2.6 8.0669 2.68333 7.75029 2.85 7.45029C3.01667 7.15029 3.25 6.91696 3.55 6.75029L11.3 2.60029C11.5333 2.46696 11.7667 2.40029 12 2.40029C12.2333 2.40029 12.4667 2.46696 12.7 2.60029L20.45 6.75029C20.75 6.91696 20.9833 7.15029 21.15 7.45029C21.3167 7.75029 21.4 8.0669 21.4 8.40029V12.0003"/>
        <path d="M17 15L19 17L23 13" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      {{ pluginName }}
    </span>
  </div>
</template>

<style scoped>
.nav-bar-title-custom {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  padding-left: 4px;
}

.title-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.plugin-name {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin-top: -1px;
}

.plugin-icon {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
}
</style>
