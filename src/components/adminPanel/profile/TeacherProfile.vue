<script setup>
import { pagecheck } from '@/data/loginCheck'
</script>
<template>
  <div class="profile-base">
    <p @click="pagecheck = !pagecheck">test</p>
    <div class="header">
      <div class="rectangle" />
      <p>test</p>
    </div>
    <div class="konotl">
      <p>testing testt</p>
    </div>
  </div>
</template>

<style scoped>
.profile-base {
  display: flex;
  width: 100%;
  align-items: start;
  flex-direction: column;
  margin-top: 30px;
}

ul {
  list-style-image: url('../../../assets/stripped.png');
}

.header {
  display: flex;
  flex-direction: row;
  margin: 40px;
  margin-bottom: 80px;
}

.rectangle {
  width: 25px;
  height: 10px;
  margin: 10px 10px 0px 20px;
  background-color: wheat;
}
</style>
