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

// get all guru data
app.get('/api/guru/get', (_req, res) => {
  db.query('SELECT * FROM dataguru', (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

// get single data for checking
app.get('/api/guru/check/', (req, res) => {
  const nip = req.query.nip
  const email = req.query.email
  const phonenumber = req.query.phonenumber

  const querySql = 'SELECT 1 FROM dataguru WHERE nip= ? OR email= ? OR phonenumber = ? LIMIT 1'
  db.query(querySql, [nip, email, phonenumber], (err, result) => {
    if (err) return res.status(500).json(err)
    const isExists = result.length > 0
    res.json({ exists: isExists })
  })
})

// get 5 data in a row for checking page purpose
app.get('/api/guru/get/page', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 7

  const offset = (page - 1) * limit

  const querySql = 'SELECT * FROM dataguru LIMIT ? OFFSET ?'

  db.query(querySql, [Number(limit), Number(offset)], (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

// insert new data to table
app.post('/api/guru/post', (req, res) => {
  db.query(
    `INSERT INTO dataguru (name, nip, email, phonenumber,address) VALUES (?,?,?,?,?)`,
    [req.body.name, req.body.nip, req.body.email, req.body.phonenumber, req.body.address],
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json(result)
    },
  )
})

// delete exists data
app.delete('/api/delete', (req, res) => {
  const table = req.query.table
  const id = parseInt(req.query.id)

  const allowed = ['dataguru']

  if (!table || !allowed.includes(table)) {
    return res.status(400).json({ message: 'table name not allowed ' })
  }

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'id not valid' })
  }

  const querySql = `DELETE FROM \`${table}\` WHERE id = ?`
  db.query(querySql, [id], (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

app.put('/api/put', (req, res) => {
  const table = req.query.table
  const id = parseInt(req.query.id)

  let SET = ''
  let VALUES = ''
  let WHERE = ''

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Id not valid' })
  }

  if (table === 'dataguru') {
    const { nip, name, email, phonenumber, address } = req.body
    SET = 'nip = ?, name = ?, email = ?, phonenumber = ?, address =?  '
    VALUES = [nip, name, email, phonenumber, address, id]
    WHERE = 'id = ?'
  } else {
    return res.status(400).json({ message: `Table not Found ${id}, ${table}` })
  }

  const querySql = `UPDATE \`${table}\` SET ${SET} WHERE ${WHERE}`
  db.query(querySql, VALUES, (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

app.get('/api/user/get', (_req, res) => {
  db.query('SELECT * FROM user', (err, result) => {
    if (err) return res.status(500).json(err)
    res.json({ message: 'data deleted', affectedRows: result.affectedRows })
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`running in localhost:${PORT}`)
})
