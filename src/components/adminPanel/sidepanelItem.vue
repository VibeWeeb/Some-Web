<!-- todo
  - sidepanel hover img -> text
-->

<script setup>
import { ref } from 'vue'
import dashboard from './DashboardItem.vue'
import dataGuru from './DataGuru.vue'
import PenilaianKinerja from './PenilaianKinerja.vue'
import { loginCheck } from '@/data/loginCheck'
const pageCode = ref('dashboard')
const status = ref(false)

function page(name) {
  pageCode.value = name
}
</script>

<template>
  <div class="container-base">
    <div class="container-center">
      <div class="container-sidepanel" :class="{ expanded: status }">
        <img class="dashboard-logo" src="../../assets/search.png" @click="status = !status" />
        <div class="container-sidepanel-menu" :class="{ hover: status }">
          <img class="logo" src="../../assets/edit.png" @click="page('dashboard')" />
          <a class="menu" :class="{ show: status }" @click="page('dashboard')">Dashboard</a>
        </div>
        <div class="container-sidepanel-menu" :class="{ hover: status }">
          <img class="logo" src="../../assets/edit.png" @click="page('guru')" />
          <a class="menu" :class="{ show: status }" @click="page('guru')"> Data Guru</a>
        </div>
        <div class="container-sidepanel-menu" :class="{ hover: status }">
          <img class="logo" src="../../assets/edit.png" @click="page('penilaian')" />
          <a class="menu" :class="{ show: status }" @click="page('penilaian')"> Penilaian</a>
        </div>
      </div>
      <div class="main-container" :class="{ expanded: status }">
        <div class="main-header">
          <div class="main-header-1">
            <img class="search-logo" src="../../assets/search.png" alt="" />
            <input class="input" type="text" placeholder="Searching Bar" />
          </div>
          <div class="main-header-3">
            <a @click="loginCheck = !loginCheck"><img class="exit-button" style="" src="@/assets/logout.png" />
            </a>
          </div>
        </div>
        <div class="main-body">
          <dashboard v-if="pageCode === 'dashboard'" />
          <dataGuru v-if="pageCode === 'guru'" />
          <PenilaianKinerja v-if="pageCode === 'penilaian'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-base {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.container-center {
  display: flex;
  border: 1px solid #00000066;
  border-radius: 20px;
  width: 90%;
  height: 80vh;
}

/*main item css */
.main-container {
  border-left: 1px solid #00000066;
  border-radius: 0px 20px 20px 0px;
  padding: 30px 0px 0px 25px;
  width: 95%;
}

.main-container.expanded {
  width: 87%;
}

/*main header css */
.main-header {
  display: flex;
  justify-content: space-between;
}

.main-header-1 {
  display: flex;
}

.main-header .input {
  background-color: transparent;
  padding: 10px;
  margin: 5px;
  flex-grow: 1;
  font-size: 1.05rem;
  outline: none;
  border: none;
  width: 100%;
}

.main-header .input:hover {
  color: black;
}

.main-header-3 .exit-button {
  margin: 0px 20px 0px 0px;
  width: 20px;
}

.main-header .search-logo {
  width: 50px;
  height: 50px;
  border: 1px solid white;
  border-radius: 50%;
  margin-right: 0px;
  padding: 1px;
}

.input:focus {
  border: none;
  background-color: transparent;
}

/*main body css */
.main-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
}

/* sidepanel css */
.container-sidepanel {
  border: 1px solid black;
  border-radius: 20px 0px 0px 20px;
  padding: 15px 20px;
  width: 5%;

  transition: width 0.5s ease-in-out;
  overflow: hidden;
  white-space: nowrap;
  background-color: #00000066;
}

.container-sidepanel.expanded {
  width: 13%;
}

/*dashboard logo customization */
.container-sidepanel .dashboard-logo {
  left: 60px;
  top: 460px;
  height: 30px;
  margin-bottom: 20px;
}

.container-sidepanel-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  margin-top: 30px;
  padding: 30px 0px 15px 0px;
  border-radius: 0px 20px 20px 0px;
}

.container-sidepanel-menu:active {
  background-color: darkgray;
}

.container-sidepanel-menu.hover:hover {
  background-color: #00000066;
}

.container-sidepanel .logo {
  position: relative;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 10px;
}

.menu {
  visibility: hidden;
  opacity: 0;
  text-decoration: none;
}

.menu.show {
  visibility: visible;
  opacity: 1;
  margin-bottom: 15px;
  padding: 0px;
  transition:
    visibility 0s 0s,
    opacity 0.4s linear;
}

@media (max-width: 360px) {
  .container-base {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
  }

  .container-center {
    display: flex;
    border: 1px solid #00000066;
    border-radius: 20px;
    width: 90%;
    height: 90%;
  }

  .main-container {
    border-radius: 0px 20px 20px 0px;
    padding: 30px 0px 0px 10px;
    flex-grow: 1;
  }

  .main-header {
    display: flex;
    width: 90%;
    height: 0%;
    align-items: center;
  }

  .main-header-1,
  .main-header-3 {
    width: 5%;
  }

  .main-header-2 {
    width: 90%;
  }

  .main-header .input {
    background-color: transparent;
    padding: 0px;
    margin: 0px 0px 12px 30px;
    flex-grow: 1;
    font-size: 10px;
    outline: none;
    border: none;
    width: 100%;
  }

  .main-header .input:hover {
    color: black;
  }

  .main-header-3 .exit-button {
    padding-top: 10px;
    margin: 0px 0px 12px 20px;
    width: 10px;
  }

  .main-header .search-logo {
    width: 20px;
    height: 20px;
    border: 1px solid white;
    border-radius: 50%;
    margin: 10px;
    padding: 1px;
  }

  .input:focus {
    border: none;
    background-color: transparent;
  }

  /*main body css */
  .main-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    margin-top: 10px;
  }

  /* sidepanel css */
  .container-sidepanel {
    border: 1px solid black;
    border-radius: 20px 0px 0px 20px;
    padding: 15px 30px 0px 10px;
    width: 50px;
  }

  .container-sidepanel.expanded {
    width: 50px;
  }

  /*dashboard logo customization */
  .container-sidepanel .dashboard-logo {
    left: 60px;
    top: 460px;
    height: 30px;
    margin-bottom: 0px;
  }

  .container-sidepanel-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    margin-top: 30px;
    padding: 30px 0px 15px 0px;
    border-radius: 0px 20px 20px 0px;
  }

  .container-sidepanel-menu:active {
    background-color: darkgray;
  }

  .container-sidepanel-menu.hover:hover {
    background-color: #00000066;
  }

  .container-sidepanel .logo {
    position: relative;
    height: 30px;
    margin-top: 0px;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  .menu {
    visibility: hidden;
    opacity: 0;
    text-decoration: none;
  }

  .menu.show {
    visibility: hidden;
    opacity: 0;
    margin-bottom: 0px;
    padding: 0px;
  }
}
</style>
