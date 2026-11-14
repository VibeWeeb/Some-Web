<script setup>
import { get1, getLimit, serchData } from '@/data/loginCheck'
import { ref, onMounted, watch } from 'vue'
const val = ref([])
const page = ref(1)
const max = ref(7)
const sh = ref('')
const totalPages = ref(1)

const emit = defineEmits(['addButton', 'editButton', 'deleteButton'])
const add = () => {
  emit('addButton')
}
const edit = (guruObj, page) => {
  emit('editButton', guruObj, page)
}

const deletes = (guruObj) => {
  emit('deleteButton', guruObj)
}

const data = async () => {
  try {
    const data = await getLimit(get1.value, page.value, max.value)
    val.value = data.result
    totalPages.value = data.totalPages
  } catch (error) {
    console.error("error Doesn't read tablle : ", error)
  }
}

const search = async () => {
  if (!sh.value.trim()) {
    page.value = 1
    return data()
  }
  try {
    const data = await serchData(get1.value, sh.value, page.value, max.value)
    val.value = data.result
    totalPages.value = data.totalPages
  } catch (err) {
    console.error(err)
  }
}

const before = () => {
  if (page.value > 1) {
    page.value--
  }
}

const after = () => {
  if (page.value < totalPages.value) {
    page.value++
  }
}

const numbering = (idObj) => {
  const number = (page.value - 1) * max.value + (idObj + 1)
  if (number < 10) {
    return '0' + number
  } else {
    return number
  }
}

watch(page, () => {
  if (!sh.value.trim()) {
    data()
  } else {
    search()
  }
})

onMounted(async () => {
  data()
})
</script>

<template>
  <div class="table-base">
    <div class="main-header">
      <div class="left">
        <img src="@/assets/search.png" alt="" />
        <input class="input" type="text" @keyup.enter="search" v-model="sh" placeholder="Searching Bar" />
        <p>{{ val.value }}</p>
      </div>
      <div class="right">
        <a @click="add">NEW</a>
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
          <template v-if="val.length > 0">
            <tr v-for="(item, index) in val" :key="item.id">
              <td v-if="item === null">test</td>
              <td class="some-numbering">{{ numbering(index) }}</td>
              <td class="some-nip">{{ item.nip }}</td>
              <td class="some-nameing">{{ item.name }}</td>
              <td class="some-study">{{ item.email }}</td>
              <td class="action">
                <img @click="deletes(item)" src="@/assets/delete(1).png" />
                <img @click="edit(item, 'see')" src="@/assets/eye.png" />
              </td>
            </tr>
          </template>
          <tr v-else class="empty">
            <td colspan="5">No Data Found</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer">
      <p>Halaman : {{ page }}</p>
      <img class="footer-1" :class="{ disable: page === 1 }" src="@/assets/change-left.png" @click="before" />
      <img class="footer-2" :class="{ disable: val.length < max }" src="@/assets/change-right.png" @click="after" />
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

.left {
  display: flex;
}

.left img {
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  margin: 10px;
  padding: 1px;
}

.left input {
  background-color: transparent;
  padding: 10px;
  font-size: 1.05rem;
  flex-grow: 1;
  outline: none;
  border: none;
  width: 100%;
}

.right {
  margin-top: 10px;
}

.right a {
  border: 1px solid black;
  border-radius: 30px;
  padding: 10px 25px;
  font-size: 13px;
}

.right a:active {
  border: 1px solid white;
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
  margin: 40px 10px 0px 10px;
  border: 1px solid gainsboro;
  border-radius: 15px;
  padding: 5px;
  height: 80%;
}

.table-component table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
  table-layout: fixed;
}

.table-component thead {
  border-bottom: 1px solid #00000066;
  max-height: 10%;
}

.table-component td {
  overflow-wrap: break-word;
  text-align: left;
  max-height: 10%;
}

.table-component th {
  text-align: left;
}

.table-component .empty td {
  height: 90%;
  text-align: center;
}

.table-component tr:hover {
  background-color: #0000001a;
}

.some-numbering {
  width: 10%;
}

.some-nip {
  width: 20%;
}

.some-nameing {
  width: 30%;
}

.some-study {
  width: 30%;
}

.action {
  gap: 0px;
  width: 15%;
  margin: 10px 10px 10px 80px;
  right: 50px;
}

.action a {
  height: 20px;
  width: 20px;
}

.action img:active {
  border: 1px solid black;
  border-radius: 30px;
  filter: brightness(0);
}

.action img {
  width: 30%;
  border: 1px solid white;
  border-radius: 30px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 5px;
}

.footer {
  display: flex;
  justify-content: flex-start;
  gap: 2px;
}

.footer p {
  margin-top: 10px;
  width: 100%;
}

.footer img {
  width: 15px;
  height: 15px;
  margin-top: 10px;
}

.footer .footer-1 {
  margin-right: 3px;
  cursor: pointer;
}

.footer .footer-2 {
  margin-right: 20px;
  cursor: pointer;
}

.footer .disable {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
