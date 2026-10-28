<script setup></script>

<template>
  <div class="table-base">
    <div class="main-tabel">
      <div class="main-header">
        <div class="left">
          <p>left Component</p>
        </div>
        <div class="right">
          <p>right Component</p>
        </div>
      </div>
      <div class="table-yea">
        <table>
          <tr>
            <th>NO</th>
            <th>NIP</th>
            <th>NAMA</th>
            <th>MATA PELAJARAN</th>
            <th>ACTION</th>
          </tr>
          <tr>
            <td>01</td>
            <td>example name</td>
            <td>example name</td>
            <td>fiqih</td>
            <td>
              <div class="action">
                <a href=""><img src="@/assets/delete(1).png" /></a>
                <a href=""><img src="@/assets/edit.png" /></a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-base {
  justify-content: center;
  display: flex;
  width: 100%;
  min-height: 71vh;
}

.main-tabel {
  border: 1px solid white;
  border-radius: 20px;
  margin: 50px 100px;
  padding: 10px;
  flex-grow: 1;
}

.main-header {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-grow: 1;
}

.table-yea {
  display: flex;
  flex-grow: 1;
  border: 1px solid gainsboro;
}

.table-yea table {
  width: 100%;
  border-collapse: collapse;
}

.table-yea th {
  border-bottom: 1px solid #00000066;
}

.tab .table-yea tr:hover {
  background-color: #0000001a;
}

.action {
  display: flex;
  gap: 0px;
  width: 10%;
  justify-content: end;
}

.action a {
  border: 1px solid wheat;
  margin: 0px;
}

.action img {
  width: 50%;
}
</style>
