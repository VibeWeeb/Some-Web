<script setup>
import { deleteData, getSingleData, pagecheck, postData, putData, get1 } from '@/data/brain'
import profile from './profile/TeacherProfile.vue'
import tables from './profile/tableProfile.vue'
import edit from './profile/EditProfile.vue'
import { ref } from 'vue'

const isEditMode = ref(false)
const key = ref(0)
const initialData = () => ({
  nip: '',
  name: '',
  email: '',
  phonenumber: '',
  address: '',
  pelajaran: '',
})
const dataGuru = ref(initialData())
const addButton = () => {
  isEditMode.value = false
  dataGuru.value = initialData()
  pagecheck.main = 'manage'
}
const editButton = async (guruObj, type) => {
  isEditMode.value = true
  dataGuru.value = { ...guruObj }
  pagecheck.main = type
}

const deleteButton = async (guruObj) => {
  const confirmation = window.confirm(`are you sure to delete ${guruObj.name} no ${guruObj.id} ?`)
  if (confirmation) {
    await deleteData(get1.value, guruObj.id)
    key.value++
  }
}
const checkAlert = async (value) => {
  const checkValue = await getSingleData(
    get1.value,
    value.get('nip'),
    value.get('email'),
    value.get('phonenumber'),
  )
  let alerts = []
  if (!isEditMode.value) {
    if (checkValue.nip) {
      alerts.push('nip')
    }
    if (checkValue.email) {
      alerts.push('email')
    }
    if (checkValue.phonenumber) {
      alerts.push('phonenumber')
    }
  }
  if (alerts.length > 0) {
    alert(`${alerts.join(', ')} sudah digunakan`)
    return true
  }
  return false
}
const submitForm = async (value) => {
  try {
    const duplicate = await checkAlert(value)
    if (duplicate) {
      return
    }

    if (isEditMode.value) {
      await putData(get1.value, value.get('id'), value)
    } else {
      await postData(get1.value, value)
    }
    pagecheck.main = ''
    key.value++
  } catch (err) {
    alert(err.response?.data?.message || 'something went wrong')
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
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 71vh;
}
</style>
