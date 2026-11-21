<!-- todo
  - sidepanel hover img -> text
-->

<script setup>
import { ref } from 'vue'
import dashboard from './DashboardItem.vue'
import dataGuru from './DataGuru.vue'
import PenilaianKinerja from './PenilaianKinerja.vue'
import { brain, pagecheck } from '@/data/brain'
const status = ref(false)

const menus = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'guru', label: 'Data Guru' },
  { key: 'penilaian', label: 'Penilaian' },
]

const toggle = () => {
  status.value = !status.value
}

const page = (key) => {
  pagecheck.sidepanel = key
  pagecheck.main = ''
}

const logout = () => {
  if (!window.confirm('Apakah Anda yakin ingin keluar?')) return
  pagecheck.sidepanel = 'dashboard'
  pagecheck.main = ''
  status.value = false
  brain.value = 'sign out'
}
</script>

<template>
  <div class="container-base">
    <div class="container-center">
      <div class="container-sidepanel" :class="{ expanded: status }">
        <img class="dashboard-logo" src="../../assets/logo.png" role="button" tabindex="0"
          :title="status ? 'Tutup menu' : 'Buka menu'" @click="toggle" @keydown.enter="toggle" />
        <div v-for="menu in menus" :key="menu.key" class="container-sidepanel-menu"
          :class="{ hover: status, active: pagecheck.sidepanel === menu.key }" :title="menu.label" role="button"
          tabindex="0" @click="page(menu.key)" @keydown.enter="page(menu.key)">
          <img class="logo" src="../../assets/edit.png" />
          <a class="menu" :class="{ show: status }">{{ menu.label }}</a>
        </div>
      </div>
      <div class="main-container" :class="{ expanded: status }">
        <div class="main-header">
          <div class="main-header-1"></div>
          <div class="main-header-3">
            <a tabindex="0" title="Keluar" @click="logout" @keydown.enter="logout"><img class="exit-button" style=""
                src="@/assets/logout.png" />
            </a>
          </div>
        </div>
        <div class="main-body">
          <dashboard v-if="pagecheck.sidepanel === 'dashboard'" />
          <dataGuru v-if="pagecheck.sidepanel === 'guru'" />
          <PenilaianKinerja v-if="pagecheck.sidepanel === 'penilaian'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*Layout*/
.container-base {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.container-center {
  display: flex;
  width: 90%;
  height: 80%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.main-container {
  width: 95%;
  padding: 30px 0 0 25px;
  border-left: 1px solid var(--color-border);
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  background-color: var(--color-surface);
}

.main-container.expanded {
  width: 87%;
}

/* Header */
.main-header {
  display: flex;
  justify-content: space-between;
}

.main-header-1 {
  display: flex;
  width: 80%;
}

.main-header .input {
  flex-grow: 1;
  width: 100%;
  margin: 5px;
  padding: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: var(--font-size-search);
}

.main-header .input:hover {
  color: var(--color-primary);
}

.input:focus {
  border: none;
  background-color: transparent;
}

.main-header .search-logo {
  width: 50px;
  height: 50px;
  margin-right: 0;
  padding: 1px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
}

.main-header-3 .exit-button {
  width: 28px;
  margin: 0 20px 0 0;
  padding: 5px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  cursor: pointer;
}

/* Body */
.main-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: flex-start;
}

.container-sidepanel {
  width: 5%;
  padding: 15px 20px;
  border: 1px solid var(--color-primary-dark);
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  background-color: var(--color-primary);
  overflow: hidden;
  white-space: nowrap;
  transition: width 0.5s ease-in-out;
}

.container-sidepanel.expanded {
  width: 13%;
}

.container-sidepanel .dashboard-logo {
  height: 6%;
  margin-bottom: 20px;
}

.container-sidepanel .logo {
  position: relative;
  height: 30px;
}

/* Menu items */
.container-sidepanel-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  margin-top: 30px;
  padding: 20px 10px 20px 5px;
}

.container-sidepanel-menu:hover {
  border-radius: var(--radius-xl);
  background-color: var(--color-on-primary-hover);
}

.container-sidepanel-menu:active {
  background-color: var(--color-primary-dark);
}

.container-sidepanel-menu.hover:hover {
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  background-color: var(--color-on-primary-hover);
}

.menu {
  visibility: hidden;
  opacity: 0;
  color: var(--color-text-inverse);
  text-decoration: none;
}

.menu.show {
  visibility: visible;
  opacity: 1;
  margin-left: 15px;
  padding: 0;
  transition:
    visibility 0s 0s,
    opacity 0.4s linear;
}

@media (max-width: 360px) {
  .container-center {
    height: 90%;
  }

  /* Main area */
  .main-container {
    flex-grow: 1;
    padding: 30px 0 0 10px;
  }

  .main-header {
    align-items: center;
    width: 90%;
    height: 0%;
  }

  .main-header-1,
  .main-header-3 {
    width: 5%;
  }

  .main-header-2 {
    width: 90%;
  }

  .main-header .input {
    margin: 0 0 12px 30px;
    padding: 0;
    font-size: 10px;
  }

  .main-header .search-logo {
    width: 20px;
    height: 20px;
    margin: 10px;
  }

  .main-header-3 .exit-button {
    width: 18px;
    margin: 0 0 12px 20px;
    padding: 3px;
  }

  .main-body {
    margin-top: 10px;
  }

  /* Side panel */
  .container-sidepanel,
  .container-sidepanel.expanded {
    width: 50px;
  }

  .container-sidepanel {
    padding: 15px 30px 0 10px;
  }

  .container-sidepanel .dashboard-logo {
    margin-bottom: 0;
  }

  .container-sidepanel .logo {
    margin: 0 10px 10px 0;
  }

  .container-sidepanel-menu {
    padding: 30px 0 15px;
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  }

  .menu.show {
    visibility: hidden;
    opacity: 0;
  }
}
</style>
