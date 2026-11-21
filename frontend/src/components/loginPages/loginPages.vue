<script setup>
import { ref } from 'vue'
import { currentUser, brain, loginUser } from '@/data/brain'
const username = ref(null)
const password = ref(null)

async function loginHandler() {
  try {
    currentUser.value = await loginUser(username.value, password.value)
    password.value = null
    brain.value = 'sign in'
  } catch (err) {
    if (!err.response) {
      alert('cannot connect to server')
    } else if (err.response.status === 401) {
      alert('wrong username or password')
    } else {
      alert(err.response.data?.message || 'something went wrong')
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="container-main">
      <div class="login-left">
        <div class="container-login">
          <div class="img">
            <img src="@/assets/logo.png" alt="" />
            <ul>
              <li>Login</li>
              <li>MA MANBAUL 'ULUM SUKAMAJU</li>
            </ul>
          </div>
        </div>
        <form @submit.prevent="loginHandler">
          <input v-model="username" type="text" placeholder="username" />
          <input v-model="password" type="password" placeholder="Password" />
          <div class="button">
            <button>submit</button>
          </div>
        </form>
      </div>
      <div class="login-right" />
    </div>
  </div>
</template>

<style scoped>
/* Global reset */
:global(html),
:global(body),
:global(#app) {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  box-sizing: border-box;
}

/* Layout */
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--color-surface);
}

.container-main {
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 60%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  background-color: var(--color-surface);
}

/* Left panel (form) */
.login-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 100%;
  border-right: 1px solid var(--color-border);
  border-radius: var(--radius-xl) 0 0 var(--radius-xl);
  background-color: var(--color-surface);
}

.container-login {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.img {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--color-primary);
}

.img img {
  width: 10%;
}

ul {
  margin: 0;
  list-style: none;
  text-align: left;
}

form {
  display: flex;
  flex-direction: column;
  width: 30%;
  padding-top: 20px;
  text-align: right;
}

input {
  margin: 5px 0;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  background-color: var(--color-surface);
}

input:focus {
  border-color: var(--color-primary);
}

.button {
  justify-content: flex-end;
  padding: 4px;
}

button {
  display: inline-block;
  margin: 0;
  padding: 10px 20px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-lg);
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  text-align: center;
  cursor: pointer;
}

button:hover {
  border-color: var(--color-primary-dark);
  background-color: var(--color-primary-dark);
}

/* Right panel */
.login-right {
  width: 30%;
  height: 100%;
  border: 0;
  border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
}

.login-right {
  background-image: url('@/assets/potrait.jpeg');
  background-size: cover;
  opacity: 0.8;
}
</style>
