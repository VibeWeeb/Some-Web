<script setup>
import { pagecheck, listUser } from '@/data/loginCheck'
import EditProfile from './EditProfile.vue'
</script>
<template>
  <div class="profile-base">
    <div class="header">
      <div class="rectangle" />
      <h3>PROFIL GURU</h3>
    </div>
    <div class="profile-page">
      <div class="profile-image">
        <p>IMAGE</p>
      </div>
      <div class="profile-list">
        <p>NIP</p>
        <p>{{ listUser.nip }}</p>
        <p>NAMA</p>
        <p>{{ listUser.nama }}</p>
        <p>EMAIL</p>
        <p>{{ listUser.email }}</p>
        <p>NO TELP</p>
        <p>{{ listUser.telp }}</p>
        <p>ALAMAT</p>
        <p>{{ listUser.alamat }}</p>
        <a @click="pagecheck = !pagecheck">
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

.profile-image {
  border: 1px solid;
  border-color: white;
  padding: 200px;
}

.profile-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
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
</style>
