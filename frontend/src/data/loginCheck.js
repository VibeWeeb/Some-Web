import { reactive, ref } from 'vue'
import axios from 'axios'

export const loginCheck = ref('sign out')
export const pagecheck = reactive({
  sidepanel: 'dashboard',
  main: '',
})

export const obj = ref('guru')
export const get1 = ref('guru')

export const ids = ref(0)

export const getData = async (table) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/${table}`)
    return response.data.result
  } catch (err) {
    console.error("Error can't get some data:", err.response?.data?.message || err.message)
    throw err
  } finally {
    console.log(`Get data from ${table} completed!`)
  }
}

export const getSingleData = async (table, a, b, c) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/${table}/check`, {
      params: {
        nip: a,
        email: b,
        phonenumber: c,
      },
    })
    return response.data
  } catch (err) {
    console.error("Error can't be deleted:", err.response?.data?.message || err.message)
    return { nip: false, email: false, phonenumber: false }
  } finally {
    console.log(`data check completed!`)
  }
}

export const getLimit = async (table, page, max) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/${table}`, {
      params: {
        page: page,
        limit: max,
      },
    })
    return response.data
  } catch (err) {
    console.error("Error can't be deleted:", err.response?.data?.message || err.message)
    throw err
  } finally {
    console.log(`Get data from ${table} completed!`)
  }
}

export const serchData = async (table, searchObj, page, max) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/${table}`, {
      params: {
        search: searchObj,
        page: page,
        limit: max,
      },
    })

    return response.data
  } catch (err) {
    console.error("Error can't be deleted:", err.response?.data?.message || err.message)
    throw err
  } finally {
    console.log(`completed!`)
  }
}

export const postData = async (table, data) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/${table}`, data)
    console.log(response.data)
  } catch (err) {
    console.error('Error cant post data:', err.response?.data?.message || err.message)
    throw err
  } finally {
    console.log(`Post data for ${table} completed!`)
  }
}

export const deleteData = async (table, id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/${table}/${id}`)
    return response.data.id
  } catch (err) {
    console.error("Erorr can't be deleted :", err.response?.data?.message || err.message)
    throw err
  }
}

export const putData = async (table, id, data) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/${table}/${id}`, data)
    return response.data.result
  } catch (err) {
    console.error("Error can't be changed:", err.response?.data?.message || err.message)
    throw err
  }
}
