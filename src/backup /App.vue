<script setup>
import loginPages from './components/loginPages/loginPages.vue'
import dashboard from './components/adminPanel/sidepanelItem.vue'
import { loginCheck } from '@/data/loginCheck'
</script>

<template>
  <loginPages v-if="loginCheck == true" />
  <dashboard v-if="loginCheck == false" />
</template>

<style>
* {
  color: wheat;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #808080;
}
</style>
