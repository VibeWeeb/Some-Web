<script setup>
import { get1, getLimit, serchData } from '@/data/brain'
import { ref, onMounted, watch } from 'vue'
import sortButton from '@/components/sortButton.vue'
const val = ref([])
const page = ref(1)
const max = ref(7)
const sh = ref('')
const totalPages = ref(1)
const sort = ref('')
const order = ref('')

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
    const data = await getLimit(get1.value, page.value, max.value, sort.value, order.value)
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
    const data = await serchData(
      get1.value,
      sh.value,
      page.value,
      max.value,
      sort.value,
      order.value,
    )
    val.value = data.result
    totalPages.value = data.totalPages
  } catch (err) {
    console.error(err)
  }
}

const sortBy = (field, direction) => {
  if (sort.value === field && order.value === direction) {
    sort.value = ''
    order.value = ''
  } else {
    sort.value = field
    order.value = direction
  }
  if (page.value !== 1) {
    page.value = 1 // watch(page) yang memuat ulang
  } else {
    search()
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
            <th class="some-numbering">
              NO
              <sortButton field="id" :sort="sort" :order="order" @sort="sortBy" />
            </th>
            <th class="some-nip">
              NIP

              <sortButton field="nip" :sort="sort" :order="order" @sort="sortBy" />
            </th>

            <th class="some-nameing">
              NAMA
              <sortButton field="name" :sort="sort" :order="order" @sort="sortBy" />
            </th>

            <th class="some-study">
              MATA PELAJARAN
              <sortButton field="pelajaran" :sort="sort" :order="order" @sort="sortBy" />
            </th>

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
              <td class="some-study">{{ item.pelajaran }}</td>
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
/* ==========================================================================
   Table wrapper
   ========================================================================== */
.table-base {
  flex-grow: 1;
  margin: 50px 100px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  visibility: visible;
}

.table-base.hide {
  visibility: hidden;
}

/* ==========================================================================
   Header (search + "NEW" button)
   ========================================================================== */
.main-header {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  gap: 20px;
}

.left {
  display: flex;
}

.left img {
  width: 20px;
  height: 20px;
  margin: 10px;
  padding: 1px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
}

.left input {
  flex-grow: 1;
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: var(--font-size-search);
}

.right {
  margin-top: 10px;
}

.right a {
  padding: 10px 25px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-xl);
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: 13px;
  cursor: pointer;
}

.right a:hover {
  border-color: var(--color-primary-dark);
  background-color: var(--color-primary-dark);
}

.right a:active {
  background-color: var(--color-primary-dark);
}

/* ==========================================================================
   Table
   ========================================================================== */
.table-component {
  display: flex;
  flex-grow: 1;
  height: 80%;
  margin: 40px 10px 0;
  padding: 5px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.table-component table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: var(--font-size-lg);
}

.table-component thead {
  max-height: 10%;
  border-bottom: 1px solid var(--color-primary);
}

.table-component th {
  color: var(--color-primary-dark);
  text-align: left;
}

.table-component td {
  max-height: 10%;
  overflow-wrap: break-word;
  text-align: left;
}

.table-component tr:hover {
  background-color: var(--color-primary-light);
}

.table-component .empty td {
  height: 90%;
  text-align: center;
}

/* Column widths */
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

/* Action icons */
.action {
  right: 50px;
  width: 15%;
  margin: 10px 10px 10px 80px;
  gap: 0;
}

.action a {
  width: 20px;
  height: 20px;
}

.action img {
  width: 30%;
  margin-top: 10px;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-xl);
  background-color: var(--color-primary);
  cursor: pointer;
}

.action img:active {
  border-color: var(--color-primary-dark);
  background-color: var(--color-primary-dark);
}

/* ==========================================================================
   Footer (pagination)
   ========================================================================== */
.footer {
  display: flex;
  justify-content: flex-start;
  gap: 2px;
}

.footer p {
  width: 100%;
  margin-top: 10px;
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
