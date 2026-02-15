<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <div class="sa-badge">
    <a
      href="https://www.simpleanalytics.com/?utm_source=&utm_content=badge"
      referrerpolicy="origin"
      target="_blank"
    >
      <img
        :src="isDark
          ? 'https://simpleanalyticsbadges.com/?mode=dark&background=1a1a1a&text=ff6b6b'
          : 'https://simpleanalyticsbadges.com/?mode=light&background=d33c43&text=ffffff'"
        loading="lazy"
        referrerpolicy="no-referrer"
        crossorigin="anonymous"
        alt="Simple Analytics"
      />
    </a>
  </div>
</template>

<style scoped>
.sa-badge {
  margin-top: 2rem;
  padding-top: 1rem;
}

.sa-badge img {
  display: block;
  margin: 0 auto;
}
</style>
