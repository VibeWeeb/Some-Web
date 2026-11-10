<script setup>
import { pagecheck, postData } from '@/data/loginCheck'
import profile from './profile/TeacherProfile.vue'
import tables from './profile/tableProfile.vue'
import edit from './profile/EditProfile.vue'
import { ref } from 'vue'

// const refresh = async () => {
//   try {
//     const newData = await getData('guru')
//   } catch (err) {
//     console.error(err)
//   }
// }
const isEditMode = ref(false)
const key = ref(0)
const initialData = () => ({
  nip: null,
  name: '',
  email: '',
  phonenumber: '',
  address: '',
})
const dataGuru = ref(initialData())
const addButton = () => {
  isEditMode.value = false
  dataGuru.value = initialData()
  pagecheck.main = 'manage'
}
const editButton = (id, type) => {
  isEditMode.value = true
  dataGuru.value = { ...id }
  pagecheck.main = type
}

const deleteButton = (id) => {
  dataGuru.value = { ...id }
}

const submitForm = async (value) => {
  if (isEditMode.value) {
    null
  } else {
    await postData('guru', value)
    pagecheck.main = ''
    key.value++
  }
}
</script>

<template>
  <div class="data-base">
    <tables @deleteButton="deleteButton" @addButton="addButton" @editButton="editButton" :key="key"
      v-if="pagecheck.main === ''" />
    <profile :initial-Data="dataGuru" @editButton="editButton" v-if="pagecheck.main === 'see'" />
    <edit @submitForm="submitForm" :is-Edit="isEditMode" :initial-Data="dataGuru" v-if="pagecheck.main === 'manage'" />
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
