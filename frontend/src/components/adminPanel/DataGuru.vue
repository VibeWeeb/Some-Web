<script setup>
import { deleteData, getSingleData, pagecheck, postData, putData, obj } from '@/data/loginCheck'
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
  nip: '',
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
const editButton = (guruObj, type) => {
  isEditMode.value = true
  dataGuru.value = { ...guruObj }
  pagecheck.main = type
}

const deleteButton = async (guruObj) => {
  const confirmation = window.confirm(`are you sure to delete ${guruObj.name} no ${guruObj.id} ?`)
  if (confirmation) {
    await deleteData(obj.value, guruObj.id)
    key.value++
  }
}

const submitForm = async (value) => {
  if (isEditMode.value) {
    await putData(obj.value, value.id, value)
    pagecheck.main = ''
  } else {
    if (await getSingleData(value.nip, value.email, value.phonenumber)) {
      alert('data sudah ada')
    } else {
      await postData('guru', value)
      pagecheck.main = ''
      key.value++
    }
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
