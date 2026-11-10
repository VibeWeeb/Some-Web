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

app.get('/api/guru/get', (_req, res) => {
  db.query('SELECT * FROM dataguru', (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

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

app.get('/api/user/get', (_req, res) => {
  db.query('SELECT * FROM user', (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

app.post('/api/guru/post', (req, res) => {
  db.query(
    'SELECT * FROM dataguru WHERE nip = ? or email = ?',
    [req.body.nip, req.body.email],
    (err, result) => {
      if (err) return res.status(400).json(err)

      if (result.length > 0) {
        if (result[0].nip === Number(req.body.nip)) {
          return res.status(400).json({ message: 'Nip already used' })
        }
        if (result[0].email === req.body.email) {
          return res.status(400).json({ message: 'Email already used' })
        }
      }
    },
    db.query(
      `INSERT INTO dataguru (name, nip, email, phonenumber,address) VALUES (?,?,?,?,?)`,
      [req.body.name, req.body.nip, req.body.email, req.body.phonenumber, req.body.address],
      (err, result) => {
        if (err) return res.status(500).json(err)
        res.json(result)
      },
    ),
  )
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`running in localhost:${PORT}`)
})
