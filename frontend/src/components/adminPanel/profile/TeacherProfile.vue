<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['editButton'])

const props = defineProps({
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

const guru = ref({ ...props.initialData })

watch(
  () => props.initialData,
  (newData) => {
    guru.value = { ...newData }
  },
  { deep: true },
)
const edit = () => {
  emit('editButton', guru.value, 'manage')
}
</script>

<template>
  <div class="profile-base">
    <div class="header">
      <div class="rectangle" />
      <h3>PROFIL GURU</h3>
    </div>
    <div class="profile-page">
      <div class="profile-image">
        <img src="@/assets/people.png" alt="" />
      </div>
      <div class="profile-list">
        <label>NIP :</label>
        <p>{{ guru.nip }}</p>
        <p>NAMA :</p>
        <p>{{ guru.name }}</p>
        <p>EMAIL :</p>
        <p>{{ guru.email }}</p>
        <p>NO TELP :</p>
        <p>{{ guru.phonenumber }}</p>
        <p>ALAMAT :</p>
        <p>{{ guru.address }}</p>
        <a @click="edit">
          <img src="@/assets/edit.png" />
          <p>Edit Profile</p>
        </a>
      </div>
    </div>
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

.profile-image img {
  height: 80%;
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

.profile-list a {
  display: flex;
  border: 1px solid white;
  width: 190px;
  height: 40px;
  font-size: 15px;
}

.profile-list img {
  width: 14%;
  margin: 6px;
}

.profile-list a p {
  margin-top: 6px;
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
