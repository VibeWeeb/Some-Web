<script setup>
import tables from '@/components/adminPanel/kinerja/tableK.vue'
import profile from '@/components/adminPanel/kinerja/profileK.vue'
import ae from '@/components/adminPanel/kinerja/addAndEdit.vue'
import { deleteData, pagecheck, postData } from '@/data/brain'
import { ref } from 'vue'

const key = ref(0)

const initialData = () => ({
  id: null,
  id_guru: null,
  nip: '',
  name: '',
  pedagogik: null,
  profesional: null,
  sosial: null,
  kepribadian: null,
  total: null,
})

const realData = ref(initialData())

const addButton = () => {
  realData.value = initialData()
  pagecheck.main = 'ae'
}

const deleteButton = async (dataObj) => {
  const confirmation = window.confirm(`are you sure to delete ${dataObj.name} no ${dataObj.id} ?`)
  if (confirmation) {
    try {
      await deleteData('penilaian', dataObj.id)
      key.value++
    } catch (err) {
      alert(err.response?.data?.message || 'something went wrong')
    }
  }
}

const showData = (dataObj) => {
  realData.value = dataObj
  pagecheck.main = 'profile'
}

const submitButton = async (dataObj) => {
  realData.value = dataObj
  try {
    await postData('penilaian', realData.value)
    pagecheck.main = ''
    key.value++
  } catch (err) {
    alert(err.response?.data?.message || 'something went wrong')
  }
}
</script>

<template>
  <div class="data-base">
    <tables :key="key" v-if="pagecheck.main === ''" @addButton="addButton" @deleteButton="deleteButton"
      @showData="showData" />
    <profile :initial-data="realData" v-if="pagecheck.main === 'profile'" @showData="showData" />
    <ae v-if="pagecheck.main === 'ae'" @submitButton="submitButton" />
  </div>
</template>

<style scoped>
.data-base {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 71vh;
}
</style>
