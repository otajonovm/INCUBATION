<script setup>
import HeaderSection from '../components/sections/HeaderSection.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import StatsSection from '../components/sections/StatsSection.vue'
import ServicesLogosSection from '../components/sections/ServicesLogosSection.vue'
import NewsCarouselSection from '../components/sections/NewsCarouselSection.vue'
import TasksSection from '../components/sections/TasksSection.vue'
import TeamCarouselSection from '../components/sections/TeamCarouselSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'
import { useHomepageContent } from '../composables/useHomepageContent'

const { content } = useHomepageContent()
</script>

<template>
  <div class="min-h-screen bg-[#ececef] text-[#1a2744] font-sans selection:bg-[#ff6224] selection:text-white">
    <HeaderSection :nav="content.nav" />
    <main class="overflow-x-hidden">
      <HeroSection :hero="content.hero" />
      <StatsSection :stats="content.stats" />
      <ServicesLogosSection :services="content.services" />
      <NewsCarouselSection :news="content.news" />
      <TasksSection :tasks="content.tasks" />
      <TeamCarouselSection :team="content.team" />
    </main>
    <FooterSection :footer="content.footer" />
  </div>
</template>
