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
      profile: '',
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
        <!-- <video controls autoplay loop playsinline width="640" crossorigin="anonymous"> -->
        <!--   <source :src="`http://localhost:3000/uploads/video.mp4`" type="video/mp4" /> -->
        <!-- </video> -->
        <img v-if="guru.profile" :src="`http://localhost:3000/uploads/${guru.profile}`" alt="" />
        <img src="@/assets/people.png" alt="Empty Foto" v-else />
      </div>
      <div class="profile-list">
        <label>NIP :</label>
        <p>{{ guru.nip }}</p>
        <p>NAMA :</p>
        <p>{{ guru.name }}</p>
        <p>EMAIL :</p>
        <p>{{ guru.email }}</p>
        <p>Mata Pelajaran :</p>
        <p>{{ guru.pelajaran }}</p>
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
  margin-left: 0;
}

ul {
  list-style-image: url('../../../assets/stripped.png');
}

/* Photo */
.profile-image img {
  display: block;
  width: 400px;
  height: 400px;
  border: 5px solid var(--color-primary-light);
  border-radius: var(--radius-md);
  object-fit: cover;
  object-position: center;
}

/* Details */
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
  width: 190px;
  height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  font-size: 15px;
  cursor: pointer;
}

.profile-list a:hover {
  border-color: var(--color-primary-dark);
  background-color: var(--color-primary-dark);
}

.profile-list a p {
  margin-top: 6px;
  color: var(--color-text-inverse);
}

.profile-list img {
  width: 14%;
  margin: 6px;
}

.profile-list form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  margin-left: 0;
}

.profile-list input {
  width: 250px;
  padding: 10px 0 10px 5px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
  background-color: transparent;
  font-size: var(--font-size-form);
}

.profile-list input[type='number'] {
  appearance: textfield;
}

.profile-list #address {
  width: 500px;
}
</style>
