<script setup>
import { ref, onMounted } from 'vue'
import { currentUser, get1, get2, getData } from '@/data/brain'
const value = ref([])
const nilai = ref([])

onMounted(async () => {
  try {
    const data = await getData(get1.value)
    const pen = await getData(get2.value)
    nilai.value = pen
    value.value = data
    console.log(nilai.value.length)
  } catch (error) {
    console.error("error Doesn't read table : ", error)
  }
})
</script>

<template>
  <h1>Hello {{ currentUser.name }}</h1>
  <div class="main-container">
    <div class="total-guru">
      <div class="header">guru</div>
      <div class="body">{{ value.length }}</div>
    </div>

    <div class="total-perhitungan">
      <div class="header">Kinerja</div>
      <div class="body">{{ nilai.length }}</div>
    </div>

    <div class="rata-rata">
      <div class="header">Kinerja Terbaik</div>
      <div class="body">{{ nilai[0]?.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

/* Summary cards */
.total-guru,
.total-perhitungan,
.rata-rata {
  width: 150px;
  height: 130px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.header {
  border-bottom: 1px solid var(--color-border);
  color: var(--color-primary-dark);
}

.body {
  margin-top: 30px;
}

/* Mobile */
@media (max-width: 360px) {
  h1 {
    padding-bottom: 40px;
    font-size: 30px;
  }

  .main-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 10px;
  }

  .total-guru,
  .total-perhitungan,
  .rata-rata {
    width: 130px;
    height: 100px;
    margin-left: 55px;
  }
}
</style>
