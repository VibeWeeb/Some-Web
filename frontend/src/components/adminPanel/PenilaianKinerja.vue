<script setup>
import kinerja from '@/components/adminPanel/kinerja/tableKinerja.vue'
import { pagecheck } from '@/data/loginCheck'
// import { ref } from 'vue'

// cons isEdit = ref(false)
// const initialData = ref({
// nip: '',
// name: '',
// pedagogg
//
//
// })
//
// const addButton = () =>{
//   isEdit.value = false
//
// }
</script>

<template>
  <div class="data-base">
    <kinerja v-if="pagecheck.main === ''" />
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
