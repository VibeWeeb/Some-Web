<script setup>
import { computed, onMounted, ref } from 'vue'
import { getData, nilaiOptions, pagecheck } from '@/data/brain'

const emit = defineEmits(['submitButton'])

const guruList = ref([])
const form = ref({
  id_guru: '',
  pedagogik: '',
  profesional: '',
  sosial: '',
  kepribadian: '',
})

const selectedGuru = computed(() => guruList.value.find((item) => item.id === form.value.id_guru))

onMounted(async () => {
  try {
    const [guru, penilaian] = await Promise.all([getData('guru'), getData('penilaian')])
    const sudahDinilai = new Set(penilaian.map((item) => item.id_guru))
    guruList.value = guru.filter((item) => !sudahDinilai.has(item.id))
  } catch (error) {
    console.error("error Doesn't read table : ", error)
  }
})

const cancel = () => {
  pagecheck.main = ''
}

const submit = () => {
  const f = form.value
  if (!selectedGuru.value) {
    alert('Pilih guru terlebih dahulu!')
    return
  }
  if ([f.pedagogik, f.profesional, f.sosial, f.kepribadian].some((v) => v === '')) {
    alert('Semua nilai harus diisi!')
    return
  }

  emit('submitButton', {
    id_guru: selectedGuru.value.id,
    nip: selectedGuru.value.nip,
    name: selectedGuru.value.name,
    pedagogik: f.pedagogik,
    profesional: f.profesional,
    sosial: f.sosial,
    kepribadian: f.kepribadian,
    total: null,
  })
}
</script>
<template>
  <div class="back-side">
    <div class="left-side">
      <div class="left-title">
        <div class="rectangle" />
        <h3>Penilaian Baru</h3>
      </div>
      <img v-if="selectedGuru?.profile" :src="`http://localhost:3000/uploads/${selectedGuru.profile}`" alt="" />
      <img src="@/assets/people.png" alt="" v-else />
    </div>
    <div class="right-side">
      <form action="" @submit.prevent="submit">
        <div class="form">
          <div class="lable-form">
            <label for="nip">NIP : </label>
            <label for="name">NAMA : </label>
            <label for="name">Pedagogik (30%): </label>
            <label for="name">Profesional (20%): </label>
            <label for="name">Sosial (15%): </label>
            <label for="name">Kepribadian (35%): </label>
          </div>
          <div class="input-form">
            <input type="number" :value="selectedGuru?.nip ?? ''" disabled />

            <select name="" id="" v-model="form.id_guru">
              <option disabled value="">pilih guru</option>
              <option v-for="item in guruList" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>

            <select name="" id="" v-model="form.pedagogik">
              <option disabled value="">pilih nilai</option>
              <option v-for="item in nilaiOptions" :key="item.value" :value="item.value">
                {{ item.text }}
              </option>
            </select>

            <select name="" id="" v-model="form.profesional">
              <option disabled value="">pilih nilai</option>
              <option v-for="item in nilaiOptions" :key="item.value" :value="item.value">
                {{ item.text }}
              </option>
            </select>

            <select name="" id="" v-model="form.sosial">
              <option disabled value="">pilih nilai</option>
              <option v-for="item in nilaiOptions" :key="item.value" :value="item.value">
                {{ item.text }}
              </option>
            </select>

            <select name="" id="" v-model="form.kepribadian">
              <option disabled value="">pilih nilai</option>
              <option v-for="item in nilaiOptions" :key="item.value" :value="item.value">
                {{ item.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="button">
          <button type="button" class="cancle" @click="cancel">Batal</button>
          <button type="submit" class="accept">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.back-side {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.rectangle {
  width: 40px;
  height: 20px;
  padding-right: 30px;
  background-color: var(--color-primary);
}

/* Left: photo */
.left-side {
  width: 40%;
}

.left-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 10%;
  margin-left: 10px;
}

.left-side img {
  width: 80%;
  margin-top: 20px;
  border: 1px solid var(--color-border);
}

/* Right: form */
.right-side {
  width: 60%;
}

.right-side form {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.right-side .form {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
}

.lable-form,
.input-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
}

.lable-form {
  width: 30%;
}

.lable-form label {
  height: 10%;
}

.input-form {
  width: 70%;
}

.right-side form input,
.right-side form select {
  width: 40%;
  height: 10%;
  border-radius: var(--radius-md);
  outline: none;
  background-color: transparent;
  font-size: var(--font-size-lg);
  text-align: center;
}

.right-side form input {
  appearance: textfield;
  border-color: var(--color-border);
  color: var(--color-text);
}

.right-side form input:disabled {
  background-color: var(--color-primary-light);
  color: var(--color-text-muted);
}

.right-side form select {
  border-color: var(--color-border);
}

/* Buttons */
.button {
  display: flex;
  gap: 10px;
  height: 10%;
}

.button button {
  width: 10%;
  height: 50%;
  border-color: var(--color-primary);
  outline: none;
  background-color: var(--color-surface);
  color: var(--color-primary);
  cursor: pointer;
}

.button .accept {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.button .accept:hover {
  border-color: var(--color-primary-dark);
  background-color: var(--color-primary-dark);
}
</style>
/style>
