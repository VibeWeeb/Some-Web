<script setup>
import { getLimit, serchData } from '@/data/brain'
import sortButton from '@/components/sortButton.vue'
import { ref, onMounted, watch } from 'vue'

const val = ref([])
const page = ref(1)
const max = ref(7)
const sh = ref('')
const totalPages = ref(1)
const sort = ref('')
const order = ref('')

const emit = defineEmits(['addButton', 'deleteButton', 'editButton', 'showData'])

const add = () => {
  emit('addButton')
}
const show = (item) => {
  emit('showData', item)
}
const deletes = (item) => {
  emit('deleteButton', item)
}

const data = async () => {
  try {
    const data = await getLimit('penilaian', page.value, max.value, sort.value, order.value)
    val.value = data.result
    totalPages.value = data.totalPages
  } catch (error) {
    console.error("error Doesn't read table : ", error)
  }
}

const search = async () => {
  if (!sh.value.trim()) {
    page.value = 1
    return data()
  }
  if (page.value !== 1) {
    page.value = 1
    return
  }
  try {
    const data = await serchData(
      'penilaian',
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

// total (skala 1 - 4, sudah berbobot) -> persen
const percent = (total) => Math.round((Number(total) / 4) * 1000) / 10

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
        <p></p>
      </div>
      <div class="right">
        <a @click="add">NEW</a>
      </div>
    </div>
    <div class="table-component">
      <table>
        <thead>
          <tr>
            <th class="number">
              NO
              <sortButton field="id" :sort="sort" :order="order" @sort="sortBy" />
            </th>
            <th class="nip">
              NIP
              <sortButton field="nip" :sort="sort" :order="order" @sort="sortBy" />
            </th>

            <th class="name">
              NAMA
              <sortButton field="name" :sort="sort" :order="order" @sort="sortBy" />
            </th>

            <th class="result">
              NILAI
              <sortButton field="total" :sort="sort" :order="order" @sort="sortBy" />
            </th>

            <th class="some-action">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="val.length > 0">
            <tr v-for="(item, index) in val" :key="item.id">
              <td class="number">{{ numbering(index) }}</td>
              <td class="nip">{{ item.nip }}</td>
              <td class="name">{{ item.name }}</td>
              <td class="result">{{ percent(item.total) }}%</td>
              <td class="action">
                <img @click="deletes(item)" src="@/assets/delete(1).png" />
                <img @click="show(item)" src="@/assets/eye.png" />
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
      <img class="footer-2" :class="{ disable: page >= totalPages }" src="@/assets/change-right.png" @click="after" />
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
  margin-right: 8px;
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
.number {
  width: 9%;
  padding-left: 10px;
}

.nip {
  width: 30%;
}

.name {
  width: 34%;
}

.result {
  width: 12%;
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
