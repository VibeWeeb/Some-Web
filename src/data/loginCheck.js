import { ref, reactive } from 'vue'

export const loginCheck = ref('sign out')
export const admin = ref('Kepala Sekolah')
export const pagecheck = ref(false)
export const listUser = reactive({
  nip: 12345678,
  nama: 'example name',
  email: 'example@example',
  telp: 1234567890,
  alamat: 'jl.example kota example',
})
