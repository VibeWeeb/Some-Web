<script setup>
import { watch, ref, computed } from 'vue'
const image = ref(null)
const previewImage = ref(null)

const pelajaran = ref([
  { text: "Al-Qur'an Hadits", Item: "al-qur'an hadist" },
  { text: "Baca Tulis Al-Qur'an", Item: "baca tulis al-qur'an" },
  { text: 'Fiqih', Item: 'fiqih' },
  { text: 'Sejarah Kebudayaan Islam', Item: 's.kebudayaan islam' },
  { text: 'Aqidah Akhlak', Item: 'aqidah akhlak' },
  { text: 'Bahasa Arab', Item: 'b.arab' },
  { text: 'Bahasa Indonesia', Item: 'b.indo' },
  { text: 'Bahasa Inggris', Item: 'b.inggris' },
  { text: ' Seni Budaya dan Ketrampilan', Item: 'sbk' },
  { text: 'Sunda', Item: 'sunda' },
  { text: 'Matematika', Item: 'mtk' },
  { text: 'Geografi', Item: 'geografi' },
  { text: 'Ilmu Pengetahuan Sosial', Item: 'ips' },
  { text: 'Pendidikan Kewarganegaraan', Item: 'pkn' },
  { text: 'Kimia', Item: 'kimia' },
  { text: 'Fisika', Item: 'fisika' },
  { text: 'Biologi', Item: 'biologi' },
  { text: 'Sejarah Umum', Item: 'sejarah umum' },
  { text: 'Sejarah Indonesia', Item: 'sejarah indonesia' },
  { text: 'Prakarya dan Kewira Usahaan', Item: 'pku' },
  { text: 'Teknologi Informasi dan Komunikasi', Item: 'tik' },
  { text: 'Ekonomi', Item: 'ekonomi' },
  { text: 'Ilmu Pengetahuan Alam', Item: 'ipa' },
  { text: 'Pendidikan Jasmani Olahraga dan Kesehatan', Item: 'pjok' },
  { text: 'Prakarya', Item: 'prakarya' },
  { text: 'Sosiologi', Item: 'sosiologi' },
])

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    default: () => ({
      nip: '',
      name: '',
      email: '',
      phonenumber: '',
      address: '',
      pelajaran: '',
      profile: '',
    }),
  },
})

const dataGuru = ref({ ...props.initialData })

const fileHandler = (value) => {
  const file = value.target.files[0]
  if (file) {
    image.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const displayImage = computed(() => {
  if (previewImage.value) return previewImage.value
  if (dataGuru.value.profile) return `http://localhost:3000/uploads/${dataGuru.value.profile}`
  return null
})

watch(
  () => props.initialData,
  (newData) => {
    dataGuru.value = { ...newData }
    image.value = null
    previewImage.value = null
  },
  { deep: true, immediate: true },
)
const emit = defineEmits(['submitForm'])

const submitHandler = () => {
  const err = { nip: '', name: '', email: '', phonenumber: '', address: '' }
  const nipLength = String(dataGuru.value.nip).trim().length
  const phoneLength = String(dataGuru.value.phonenumber).trim().length

  if (nipLength >= 13) {
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
    const formData = new FormData()
    if (props.isEdit && dataGuru.value.id) {
      formData.append('id', dataGuru.value.id)
    }
    formData.append('nip', dataGuru.value.nip)
    formData.append('name', dataGuru.value.name)
    formData.append('email', dataGuru.value.email)
    formData.append('phonenumber', dataGuru.value.phonenumber)
    formData.append('address', dataGuru.value.address)
    formData.append('pelajaran', dataGuru.value.pelajaran)
    if (image.value) {
      formData.append('profile', image.value)
    }

    emit('submitForm', formData)
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
        <img :src="displayImage" alt="Foto Guru" v-if="displayImage" />
        <img src="@/assets/people.png" alt="Empty Foto" v-else />
        <input id="file" type="file" accept="image/*" @change="fileHandler" />
        <label for="file">Ganti Profile</label>
      </div>
      <div class="profile-list">
        <div class="nip">
          <label>NIP :</label>
          <input id="nip" type="number" v-model="dataGuru.nip" :disabled="isEdit" />
        </div>

        <div class="name">
          <label>NAMA :</label>
          <input id="name" type="text" v-model="dataGuru.name" />
        </div>

        <div class="telp">
          <label>NO TELP :</label>
          <input id="telp" type="tel" v-model="dataGuru.phonenumber" />
        </div>

        <div class="email">
          <label>EMAIL :</label>
          <input id="email" type="email" v-model="dataGuru.email" />
        </div>

        <div class="pelajaran">
          <label for="pelajaran">Mata pelajaran :</label>
          <select name="pelajaran" id="pelajaran" v-model="dataGuru.pelajaran">
            <option v-for="item in pelajaran" :key="item.Item" :value="item.Item">
              {{ item.text }}
            </option>
          </select>
        </div>

        <div class="address">
          <label>ALAMAT :</label>
          <textarea id="address" type="text" v-model="dataGuru.address" />
        </div>
        <div class="submit-button">
          <button type="submit">
            <img src="@/assets/edit.png" />
            <p>Simpan</p>
          </button>
        </div>
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
  height: 100%;
  margin-left: 0px;
}

.profile-image {
  display: flex;
  flex-direction: column;
}

.profile-image img {
  border: 5px solid #0000001a;
  border-radius: 15px;
  width: 400px;
  height: 400px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.profile-image label {
  margin: 10px 5px;
  padding: 6px 12px;
  border: 3px outset #949494;
  cursor: pointer;
  width: 50%;
  align-self: center;
}

.profile-image label:active {
  border: 3px inset #949494;
}

.profile-image input[type='file'] {
  display: none;
}

.profile-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
}

.profile-list label {
  width: 20%;
  vertical-align: middle;
  margin-top: 10px;
}

.nip,
.name,
.email,
.pelajaran,
.telp,
.address,
.submit-button {
  width: 50%;
  display: flex;
}

.submit-button {
  align-items: center;
  justify-content: end;
  width: 100%;
}

.profile-list input {
  border-color: #00000066;
  background-color: transparent;
  outline: none;
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;

  font-size: 18px;

  width: 70%;
  height: 40%;
}

.profile-list input:focus {
  border-color: #00000066;
}

.nip input {
  appearance: textfield;
}

.nip input:disabled {
  background: #0000001a;
  color: #ffffff1a;
}

.address textarea {
  background-color: transparent;
  outline: none;
  border-color: #00000066;
  border-radius: 15px;
  box-sizing: border-box;
  resize: none;
  font-size: 18px;
  padding: 0px 10px;
  width: 70%;
  height: 100%;
}

.pelajaran label {
  width: 40%;
}

.pelajaran select {
  border-color: #00000066;
  text-align: center;
  background: transparent;
  border-radius: 15px;
  width: 50%;
  height: 40%;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
}

.submit-button button {
  display: flex;
  border-color: #00000066;
  border-radius: 5px;
  margin-top: 15px;
  margin-right: 5%;
  width: 10%;
  height: 25%;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
}

.submit-button img {
  width: 20%;
  height: 20px;
  margin: 6px 5px;
  filter: brightness(0);
}

.submit-button p {
  width: 50%;
  margin-top: 7px;
}
</style>
