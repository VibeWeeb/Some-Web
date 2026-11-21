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
/* Layout */
.profile-base {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  margin-top: 30px;
}

.header {
  display: flex;
  flex-direction: row;
  margin: 40px 40px 80px;
}

.rectangle {
  width: 25px;
  height: 10px;
  margin: 8px 10px 0 20px;
  background-color: var(--color-primary);
}

.profile-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 40px;
  height: 100%;
  margin-left: 0;
}

ul {
  list-style-image: url('../../../assets/stripped.png');
}

/* Photo + upload */
.profile-image {
  display: flex;
  flex-direction: column;
}

.profile-image img {
  display: block;
  width: 400px;
  height: 400px;
  border: 5px solid var(--color-primary-light);
  border-radius: var(--radius-md);
  object-fit: cover;
  object-position: center;
}

.profile-image label {
  align-self: center;
  width: 50%;
  margin: 10px 5px;
  padding: 6px 12px;
  border: 3px outset var(--color-primary);
  color: var(--color-primary);
  cursor: pointer;
}

.profile-image label:active {
  border: 3px inset var(--color-primary);
}

.profile-image input[type='file'] {
  display: none;
}

/* Form */
.profile-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
}

.profile-list label {
  width: 20%;
  margin-top: 10px;
  vertical-align: middle;
}

.nip,
.name,
.email,
.pelajaran,
.telp,
.address {
  display: flex;
  width: 50%;
}

.profile-list input {
  width: 70%;
  height: 40%;
  padding: 0 10px;
  border-color: var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
  background-color: transparent;
  font-size: var(--font-size-form);
}

.nip input {
  appearance: textfield;
}

.nip input:disabled {
  background: var(--color-primary-light);
  color: var(--color-text-muted);
}

.pelajaran label {
  width: 40%;
}

.pelajaran select {
  width: 50%;
  height: 40%;
  padding: 0 10px;
  border-color: var(--color-border);
  border-radius: var(--radius-md);
  background: transparent;
  font-size: var(--font-size-form);
  text-align: center;
}

.address textarea {
  box-sizing: border-box;
  width: 70%;
  height: 100%;
  padding: 0 10px;
  border-color: var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
  background-color: transparent;
  font-size: var(--font-size-form);
  resize: none;
}

/* Submit button */
.submit-button {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
}

.submit-button button {
  display: flex;
  width: 10%;
  height: 25%;
  margin-top: 15px;
  margin-right: 5%;
  border-color: var(--color-primary);
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  font-size: 15px;
  cursor: pointer;
}

.submit-button button:hover {
  border-color: var(--color-primary-dark);
  background-color: var(--color-primary-dark);
}

.submit-button img {
  width: 20%;
  height: 20px;
  margin: 6px 5px;
}

.submit-button p {
  width: 50%;
  margin-top: 7px;
  color: var(--color-text-inverse);
}
</style>
