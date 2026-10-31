<script setup>
import { ref } from 'vue'
import { loginCheck } from '@/data/loginCheck'
const username = ref(null)
const password = ref(null)

function loginHandler() {
  if (username.value === 'admin' && password.value === 'admin') {
    loginCheck.value = 'sign in'
  } else {
    alert('worng username or password')
  }
}
</script>

<template>
  <div class="container">
    <div class="container-main">
      <div class="login-left">
        <div class="container-login">
          <div class="img">LOGO</div>
          <ul>
            <li>Login</li>
            <li>MA MANBAUL 'ULUM SUKAMAJU</li>
          </ul>
        </div>
        <form @submit.prevent="loginHandler">
          <input v-model="username" type="text" placeholder="Email address" />
          <input v-model="password" type="password" placeholder="Password" />
          <div class="button">
            <button>submit</button>
          </div>
        </form>
      </div>
      <div class="login-right">
        <p>test</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
:global(html),
:global(body),
:global(#app) {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  box-sizing: border-box;
}

ul {
  list-style: none;
  text-align: left;
  margin: 0px;
}

form {
  padding-top: 20px;
  width: 30%;
  display: flex;
  flex-direction: column;
  text-align: right;
}

input {
  background-color: transparent;
  margin: 5px 0px;
  padding: 10px;
  border: 1px solid whitesmoke;
  border-radius: 20px;
}

button {
  background-color: transparent;
  padding: 10px 20px;
  margin: 0px;
  border: 1px solid white;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
}

button:hover {
  background-color: #ffffff1a;
  color: #808080;
}

.button {
  padding: 4px;
  justify-content: flex-end;
}

.container {
  display: flex;
  background-color: green;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container-main {
  display: flex;
  background-color: #ffffff1a;
  border-radius: 30px;
  justify-content: space-between;
  height: 40%;
  width: 80%;
  border: 1px solid white;
}

.login-left {
  display: flex;
  height: 100%;
  width: 70%;
  border-radius: 30px 0px 0px 30px;
  border-right: 1px solid white;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #0000001a;
}

.login-right {
  height: 100%;
  width: 30%;
  border-radius: 0px 30px 30px 0px;
  border: 0px;
}

.container-login {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.img {
  padding: 10px;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border: 1px solid white;
  margin-right: 10px;
}
</style>
