import { reactive, ref } from 'vue'
import axios from 'axios'

export const loginCheck = ref('sign out')
export const pagecheck = reactive({
  sidepanel: 'dashboard',
  main: '',
})

export const obj = ref('dataguru')

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

export const getSingleData = async (a, b, c) => {
  try {
    const response = await axios.get('http://localhost:3000/api/guru/check', {
      params: {
        nip: a,
        email: b,
        phonenumber: c,
      },
    })
    return response.data.exists
  } catch (err) {
    console.error('Error in : ', err)
  } finally {
    console.log(`Get data completed!`)
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

export const postData = async (table, data) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/${table}/post`, data)
    console.log(response.data)
  } catch (err) {
    console.error('Error in :', err)
  } finally {
    console.log(`Post data for ${table} completed!`)
  }
}

export const deleteData = async (table, id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/delete`, {
      params: {
        table: table,
        id: id,
      },
    })
    return response.data
  } catch (err) {
    console.error("Erorr can't be deleted :", err.response?.data?.message || err.message)
    throw err
  }
}

export const putData = async (a, b, c) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/put`, c, {
      params: {
        table: a,
        id: b,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
}
