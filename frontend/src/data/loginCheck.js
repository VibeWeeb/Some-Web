import { reactive, ref } from 'vue'
import axios from 'axios'

export const loginCheck = ref('sign out')
export const pagecheck = reactive({
  sidepanel: 'dashboard',
  main: '',
})

export const ids = ref(0)

export const getData = async (table) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/${table}/get`)
    return response.data
  } catch (error) {
    console.error('error in :', error)
  } finally {
    console.log(`Get data from ${table} completed!`)
  }
}

export const getLimit = async (table, page) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/${table}/get/page?page=${page}`)
    return response.data
  } catch (error) {
    console.error('error in :', error)
  } finally {
    console.log(`Get data from ${table} completed!`)
  }
}

export const postData = async (table, value, id) => {
  try {
    id = getData(table)
    const dataClean = {
      id: id.length + 1,
      ...value,
      phonenumber: value.phonenumber ? Number(value.phonenumber) : null,
    }
    const response = await axios.post(`http://localhost:3000/api/${table}/post`, dataClean)
    console.log(response.data)
  } catch (err) {
    console.error('Error in :', err)
  } finally {
    console.log(`Post data for ${table} completed!`)
  }
}
