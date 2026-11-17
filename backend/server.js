import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { constants } from 'buffer'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, suffix + path.extname(file.originalname))
  },
})

const filterUploads = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
})

const db = mysql.createConnection({
  host: 'localhost',
  user: 'nihan',
  password: '177013',
  database: 'kinerjaguru',
  port: 3307,
})

// GET
// get single guru
app.get('/api/guru/check', (req, res) => {
  const { nip, email, phonenumber } = req.query

  const querySql = `
    SELECT nip, email, phonenumber
    FROM dataguru
    WHERE nip = ? OR email = ? OR phonenumber = ?
  `

  db.query(querySql, [nip || '', email || '', phonenumber || ''], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    res.json({
      nip: results.some((row) => String(row.nip) === String(nip)),
      email: results.some((row) => String(row.email).toLowerCase() === String(email).toLowerCase()),
      phonenumber: results.some((row) => String(row.phonenumber) === String(phonenumber)),
    })
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
app.post('/api/guru', filterUploads.single('profile'), (req, res) => {
  const { name, nip, email, phonenumber, address, pelajaran } = req.body
  const fotoFile = req.file ? req.file.filename : null
  const querySql = `INSERT INTO dataguru (name, nip, email, phonenumber,address,pelajaran,profile) VALUES (?,?,?,?,?,?,?)`
  const queryParams = [name, nip, email, phonenumber, address, pelajaran, fotoFile]

  db.query(querySql, queryParams, (err, result) => {
    if (err) {
      if (req.file) {
        fs.unlink(req.file.path, (unlinkErr) => {
          if (unlinkErr) console.error('cannot remove file', unlinkErr)
        })
      }
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
  })
})

// DELETE
//
// delete exists data guru
app.delete('/api/guru/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Bad Request : id not valid' })
  }

  db.query('SELECT profile from dataguru WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    if (row.length === 0) {
      return res.status(404).json({ message: 'File not Found' })
    }

    const fotoFile = row.profile

    const querySql = 'DELETE FROM dataguru WHERE id = ?'
    db.query(querySql, [id], (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Not Found' })
      }
      if (fotoFile) {
        const filePath = path.join(__dirname, 'uploads', fotoFile)
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('cannot delete file', unlinkErr)
        })
      }
      res.json({ message: `Data Deleted`, id: id })
    })
  })
})

// PUT (UPDATE)
// PUT guru
app.put('/api/guru/:id', filterUploads.single('profile'), (req, res) => {
  const id = parseInt(req.params.id)
  const { nip, name, email, phonenumber, address, pelajaran } = req.body
  const fotoFile = req.file ? req.file.filename : null
  const querySet =
    'nip = ?, name = ?, email = ?, phonenumber = ?, address = ?, pelajaran = ?, profile=?'
  const querySql = `UPDATE dataguru SET ${querySet} WHERE id = ?`

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Bad Request : id not valid' })
  }

  db.query('SELECT profile FROM dataguru WHERE id = ?', [id], (err, row) => {
    if (err) {
      if (req.file) fs.unlink(req.file.path, () => { })
      console.error(err)
    }

    if (row.length === 0) {
      if (req.file) fs.unlink(req.file.path, () => { })
      return res.status(404).json({ message: 'Not Found!' })
    }

    const old = row.profile
    const final = fotoFile ? fotoFile : old
    const queryParams = [nip, name, email, phonenumber, address, pelajaran, final, id]

    db.query(querySql, queryParams, (err, result) => {
      if (err) {
        if (req.file) {
          fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) console.error('cannot remove file', unlinkErr)
          })
        }

        if (err.code === 'ER_BAD_NULL_ERROR') {
          return res.status(400).json({ message: 'All data Must be filled' })
        }

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Input data must be new' })
        }
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
      if (old && fotoFile) {
        const oldPath = path.join(__dirname, 'uploads', old)
        fs.unlink(oldPath, (unlinkErr) => {
          if (unlinkErr) console.error('cannot delete Old Photo')
        })
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
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`running in localhost:${PORT}`)
})
