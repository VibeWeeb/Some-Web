<script setup>
import { pagecheck } from '@/data/loginCheck'
import profile from './profile/TeacherProfile.vue'
import tableProfile from './profile/tableProfile.vue'
</script>

<template>
  <div class="data-base">
    <table-profile v-if="pagecheck === false" />
    <profile v-if="pagecheck === true" />
  </div>
</template>

<style scoped>
.data-base {
  justify-content: center;
  display: flex;
  width: 100%;
  min-height: 71vh;
}
</style>
