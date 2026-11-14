<script setup>
import { deleteData, getSingleData, pagecheck, postData, putData, get1 } from '@/data/loginCheck'
import profile from './profile/TeacherProfile.vue'
import tables from './profile/tableProfile.vue'
import edit from './profile/EditProfile.vue'
import { ref } from 'vue'

const check = ref(false)

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
    await deleteData(get1.value, guruObj.id)
    key.value++
  }
}

const checkAlert = async (value) => {
  const checkValue = await getSingleData(get1.value, value.nip, value.email, value.phonenumber)
  let alerts = []
  if (!isEditMode.value) {
    if (checkValue.nip) {
      alerts.push('nip')
    }
  }
  if (checkValue.email) {
    alerts.push('email')
  }
  if (checkValue.phonenumber) {
    alerts.push('phonenumber')
  }
  if (alerts.length > 0) {
    alert(`${alerts.join(', ')} sudah digunakan`)
    check.value = true
  }
}

const submitForm = async (value) => {
  try {
    if (isEditMode.value) {
      checkAlert(value)
      if (!check.value) {
        await putData(get1.value, value.id, value)
        pagecheck.main = ''
        key.value++
      } else {
        return
      }
    } else {
      checkAlert(value)
      if (!check.value) {
        await postData(get1.value, value)
        pagecheck.main = ''
        key.value++
      } else {
        return
      }
    }
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
  justify-content: center;
  display: flex;
  width: 100%;
  min-height: 71vh;
}
</style>
