<script setup>
import loginPages from './components/loginPages/loginPages.vue'
import dashboard from './components/adminPanel/sidepanelItem.vue'
import { loginCheck } from '@/data/loginCheck'
</script>

<template>
  <loginPages v-if="loginCheck == 'sign out'" />
  <dashboard v-if="loginCheck == 'sign in'" />
</template>

<style>
* {
  box-sizing: border-box;
  color: wheat;
  margin: 0;
  padding: 0;
}

body {
  background-color: #808080;
}
</style>
