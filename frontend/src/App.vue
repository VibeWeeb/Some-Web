<script setup>
import loginPages from './components/loginPages/loginPages.vue'
import dashboard from './components/adminPanel/sidepanelItem.vue'
import { brain } from '@/data/brain'
</script>

<template>
  <loginPages v-if="brain == 'sign out'" />
  <dashboard v-if="brain == 'sign in'" />
</template>

<style>
/* Global reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: var(--color-text);
}

body {
  background-color: var(--color-bg);
}
</style>
