<script setup>
import { pagecheck } from '@/data/loginCheck'
</script>

<template>
  <div class="table-base" :class="{ hide: pagecheck }">
    <div class="main-header">
      <div class="left">
        <p>left Component</p>
      </div>
      <div class="right">
        <p @click="pagecheck = !pagecheck">test</p>
      </div>
    </div>
    <div class="table-component">
      <table>
        <thead>
          <tr>
            <th class="some-numbering">NO</th>
            <th class="some-nip">NIP</th>
            <th class="some-nameing">NAMA</th>
            <th class="some-study">MATA PELAJARAN</th>
            <th class="some-action">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>example name</td>
            <td>example name</td>
            <td>fiqih</td>
            <td class="action">
              <a @click="pagecheck = !pagecheck"> <img src="@/assets/edit.png" /></a><a> <img
                  src="@/assets/delete(1).png" /></a>
            </td>
          </tr>
          <tr>
            <td>{{ pagecheck }}</td>
            <td>example name</td>
            <td>example name</td>
            <td>fiqih</td>
            <td class="action">
              <a @click="pagecheck = !pagecheck"> <img src="@/assets/edit.png" /></a><a> <img
                  src="@/assets/delete(1).png" /></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.table-base {
  visibility: visible;
  border: 1px solid white;
  border-radius: 20px;
  margin: 50px 100px;
  padding: 10px;
  flex-grow: 1;
}

.table-base.hide {
  visibility: hidden;
}

.main-header {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-grow: 1;
}

.table-component {
  display: flex;
  flex-grow: 1;
  border: 1px solid gainsboro;
}

.table-component table {
  width: 100%;
  border-collapse: collapse;
}

.table-component th {
  border-bottom: 1px solid #00000066;
}

.table-component tr:hover {
  background-color: #0000001a;
}

.table-component .some-numbering {
  width: 10%;
}

.table-component .some-nip,
.some-nameing,
.some-study {
  width: 20%;
}

.action {
  gap: 0px;
  width: 15%;
  margin: 10px 10px 10px 80px;
  right: 50px;
}

.action a:hover {
  border: 1px solid white;
  border-radius: 30px;
}

.action img {
  width: 17%;
}
</style>
