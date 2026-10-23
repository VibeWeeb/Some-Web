<script setup>
import { readonly } from 'vue'
import { admin } from '@/data/loginCheck'
const name = admin
const userName = readonly(name)
</script>

<template>
  <h1>Hello {{ userName }}</h1>
  <div class="main-container">
    <div class="total-guru">
      <div class="header">guru</div>
      <div class="body">VALUES</div>
    </div>

    <div class="total-perhitungan">
      <div class="header">guru</div>
      <div class="body">VALUES</div>
    </div>

    <div class="rata-rata">
      <div class="header">guru</div>
      <div class="body">VALUES</div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: center;
}

.header {
  border-bottom: 1px solid black;
}

.body {
  margin-top: 30px;
}

.total-guru,
.total-perhitungan,
.rata-rata {
  border: 1px solid black;
  width: 150px;
  height: 130px;
  border-radius: 20px;
}

@media(max-width:  360px){
  h1{
    font-size: 30px;
    padding-bottom: 40px;
  }

.main-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.header {
  border-bottom: 1px solid black;
}

.body {
  margin-top: 30px;
}

.total-guru,
.total-perhitungan,
.rata-rata {
  border: 1px solid black;
  width: 130px;
  height: 100px;
  border-radius: 20px;
  margin-left: 55px;
}
}
</style>
