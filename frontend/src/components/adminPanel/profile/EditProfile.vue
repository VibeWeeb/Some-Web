<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    default: () => ({
      nip: null,
      name: '',
      email: '',
      phonenumber: '',
      address: '',
    }),
  },
})

const dataGuru = ref({ ...props.initialData })

watch(
  () => props.initialData,
  (newData) => {
    dataGuru.value = { ...newData }
  },
  { deep: true, immediate: true },
)
const emit = defineEmits(['submitForm'])

const submitHandler = () => {
  const err = { nip: '', name: '', email: '', phonenumber: '', address: '' }
  const nipLength = String(dataGuru.value.nip).trim().length
  const phoneLength = String(dataGuru.value.phonenumber).trim().length

  if (nipLength !== 12) {
    err.nip = 'NIP harus berjumlah tepat 12 digit!'
  }

  if (phoneLength < 11 || phoneLength > 13) {
    err.phonenumber = `Nomor Hp terlalu ${phoneLength < 11 ? 'sedikit' : 'banyak'}!`
  }

  if (dataGuru.value.email === '') {
    err.email = 'Email harus diisi!'
  }

  if (dataGuru.value.name === '') {
    err.name = 'Nama harus diisi!'
  }

  if (dataGuru.value.address === '') {
    err.address = 'Alamat harus diisi!'
  }

  if (
    err.nip === '' &&
    err.name === '' &&
    err.email === '' &&
    err.phonenumber === '' &&
    err.address === ''
  ) {
    emit('submitForm', dataGuru.value)
  } else {
    const message = Object.values(err).filter((msg) => msg !== '')
    const messageJoin = message.join('\n')
    alert(messageJoin)
  }
}
</script>
<template>
  <div class="profile-base">
    <div class="header">
      <div class="rectangle" />
      <h3>{{ isEdit ? 'Edit Data Guru' : 'Tambahkan data Guru' }}</h3>
    </div>
    <form class="profile-page" @submit.prevent="submitHandler">
      <div class="profile-image">
        <img src="@/assets/people.png" alt="" />
        <label for="file">Ganti Profile</label>
        <input id="file" type="file" />
      </div>
      <div class="profile-list">
        <label>NIP :</label>
        <input id="nip" type="number" v-model="dataGuru.nip" />
        <label>NAMA :</label>
        <input id="name" type="text" v-model="dataGuru.name" />
        <label>EMAIL :</label>
        <input id="email" type="email" v-model="dataGuru.email" />
        <label>NO TELP :</label>
        <input id="telp" type="tel" v-model="dataGuru.phonenumber" />
        <label>ALAMAT :</label>
        <input id="address" type="text" v-model="dataGuru.address" />
        <button type="submit">
          <img src="@/assets/edit.png" />
          <p>Simpan</p>
        </button>
      </div>
    </form>
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
  margin: 8px 10px 0px 20px;
  background-color: wheat;
}

.profile-page {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 40px;
  margin-left: 0px;
}

.profile-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-image img {
  height: 80%;
}

.profile-image label {
  padding: 6px 12px;
  cursor: pointer;
}

.profile-image label:hover {
  color: #00000066;
}

.profile-image label:active {
  color: green;
}

.profile-image input[type='file'] {
  display: none;
}

.profile-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.profile-list.hidden {
  visibility: hidden;
}

.profile-list button {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 15px;
  width: 100px;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
}

.profile-list img {
  width: 20px;
  height: 20px;
  margin: 6px;
  filter: brightness(0);
}

.profile-list p {
  margin-top: 7px;
}

.profile-list form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
  margin-left: 0px;
}

.profile-list input {
  background-color: transparent;
  outline: none;
  border: 1px solid black;
  border-radius: 15px;
  padding: 10px 0px 10px 5px;
  font-size: 18px;
  width: 250px;
}

.profile-list input[type='number'] {
  appearance: textfield;
}

.profile-list #address {
  width: 500px;
}
</style>
