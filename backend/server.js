import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'nihan',
  password: '177013',
  database: 'kinerjaguru',
  port: 3307,
})
// GET
// get single guru
app.get('/api/guru/:id', (req, res) => {
  const id = parseInt(req.params.id)

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Bad Request : id not valid' })
  }

  const querySql = 'SELECT 1 FROM dataguru WHERE id = ? LIMIT 1'
  db.query(querySql, [id], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
    const isExists = result.length > 0
    res.json({ message: 'data ditemukan ', exists: isExists })
  })
})

// get single nilai
app.get('/api/nilai/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Bad Request : id not valid' })
  }

  const querySql = `SELECT p.id,
    p.id_guru,
    g.nip,
    g.name,
    p.pedagogik,
    p.profesional,
    p.sosial,
    p.kepribadian
    FROM penilaian p
    INNER JOIN dataguru g ON p.nip_guru = g.nip
    WHERE p.id = ?`

  db.query(querySql, [id], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
    const isExists = result.length > 0
    res.json({ message: 'data ditemukan ', exists: isExists })
  })
})

// get all penilaian data
app.get('/api/nilai', (req, res) => {
  const { search, page, limit } = req.query

  let queryParams = []
  let whereSql = ''

  if (search) {
    whereSql = ' WHERE g.name LIKE ? or g.nip LIKE ?'
    queryParams.push(`%${search}%`, `%${search}%`)
  }
  const countSql = `SELECT COUNT (*) AS total FROM dataguru ${whereSql}`
  db.query(countSql, queryParams, (err, resCount) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
    const totalData = resCount[0].total
    const pages = parseInt(page) || 1
    const maxLimit = parseInt(limit)
    const offset = (pages - 1) * maxLimit
    const totalPages = Math.ceil(totalData / maxLimit)

    let querySql = `SELECT p.id,
    p.id_guru,
    g.nip,
    g.name,
    p.pedagogik,
    p.profesional,
    p.sosial,
    p.kepribadian
    FROM penilaian p
    INNER JOIN dataguru g ON p.nip_guru = g.nip
    ${whereSql}`

    if (page) {
      querySql += `LIMIT ? OFFSET ?`
      queryParams.push(maxLimit, offset)
    }

    db.query(querySql, queryParams, (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Not Found' })
      }
      res.json({
        message: 'Data Get',
        result: result,
        totalPages: totalPages,
        totalData: totalData,
      })
    })
  })
})

// get all guru data
app.get('/api/guru', (req, res) => {
  const { search, page, limit } = req.query

  let queryParams = []
  let whereSql = ''

  if (search) {
    whereSql = 'WHERE name LIKE ? or nip LIKE ?'
    queryParams.push(`%${search}%`, `%${search}%`)
  }
  const countSql = `SELECT COUNT (*) AS total FROM dataguru ${whereSql}`
  db.query(countSql, queryParams, (err, resCount) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
    const totalData = resCount[0].total
    const pages = parseInt(page) || 1
    const maxLimit = parseInt(limit)
    const offset = (pages - 1) * maxLimit
    const totalPages = Math.ceil(totalData / maxLimit)

    let querySql = `SELECT * FROM dataguru ${whereSql}`

    if (page) {
      querySql += `LIMIT ? OFFSET ?`
      queryParams.push(maxLimit, offset)
    }

    db.query(querySql, queryParams, (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Not Found' })
      }
      res.json({
        message: 'Data Get',
        result: result,
        totalPages: totalPages,
        totalData: totalData,
      })
    })
  })
})

// POST (INSERT)
// insert new data to table
app.post('/api/guru', (req, res) => {
  db.query(
    `INSERT INTO dataguru (name, nip, email, phonenumber,address) VALUES (?,?,?,?,?)`,
    [req.body.name, req.body.nip, req.body.email, req.body.phonenumber, req.body.address],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_BAD_NULL_ERROR') {
          return res.status(400).json({ message: 'All data Must be filled' })
        }

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Input data must be new' })
        }

        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
      res.status(201).json({
        message: 'Data saved successfully',
        id: result.insertId,
      })
    },
  )
})

// DELETE
//
// delete exists data guru
app.delete('/api/guru/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Bad Request : id not valid' })
  }

  const querySql = 'DELETE FROM dataguru WHERE id = ?'
  db.query(querySql, [id], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not Found' })
    }
    res.json({ message: `Data Deleted`, id: id })
  })
})

// PUT (UPDATE)
// PUT guru
app.put('/api/guru/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { nip, name, email, phonenumber, address } = req.body

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Bad Request : id not valid' })
  }

  const set = 'nip = ?, name = ?, email = ?, phonenumber = ?, address =?  '
  const value = [nip, name, email, phonenumber, address, id]
  const querySql = `UPDATE dataguru SET ${set} WHERE id = ?`

  db.query(querySql, value, (err, result) => {
    if (err) {
      if (err.code === 'ER_BAD_NULL_ERROR') {
        return res.status(400).json({ message: 'All data Must be filled' })
      }

      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Input data must be new' })
      }
      console.log(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Bad Request : data doesnt changed' })
    }
    if (result.changedRows === 0) {
      return res.json({ message: 'Tidak ada perubahan data', id: id })
    }
    res.status(201).json({ message: `Data Updated`, id: id })
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`running in localhost:${PORT}`)
})
