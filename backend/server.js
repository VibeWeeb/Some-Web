import express from 'express'
import mysql from 'mysql2'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// __dirname tidak ada di ES module, jadi dibuat manual
const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
app.get('/api/nilai', (_req, res) => {
  db.query(
    'SELECT p.id_guru, g.name, p.total FROM penilaian p INNER JOIN dataguru g ON p.id_guru = g.id ORDER BY p.total DESC',
    (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
      res.json({ message: 'data ditemukan ', result: result })
    },
  )
})
const buildOrderBy = (sort, order, allowed, defaultColumn) => {
  const column = Object.prototype.hasOwnProperty.call(allowed, sort) ? allowed[sort] : defaultColumn
  const direction = String(order).toLowerCase() === 'desc' ? 'DESC' : 'ASC'
  return ` ORDER BY ${column} ${direction}, ${defaultColumn} ASC`
}

const PENILAIAN_SORT = { id: 'p.id', nip: 'g.nip', name: 'g.name', total: 'p.total' }
const GURU_SORT = { id: 'id', nip: 'nip', name: 'name', pelajaran: 'pelajaran' }

// get all penilaian
app.get('/api/penilaian', (req, res) => {
  const { search, page, limit, sort, order } = req.query

  let queryParams = []
  let whereSql = ''

  if (search) {
    whereSql = 'WHERE g.name LIKE ? or g.nip LIKE ?'
    queryParams.push(`%${search}%`, `%${search}%`)
  }
  const countSql = `SELECT COUNT (*) AS total FROM penilaian p INNER JOIN dataguru g ON p.id_guru = g.id ${whereSql}`
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

    let querySql = `
    SELECT p.id,
    p.id_guru,
    g.nip,
    g.name,
    g.profile,
    p.pedagogik,
    p.profesional,
    p.sosial,
    p.kepribadian,
    p.total
    FROM penilaian p
    INNER JOIN dataguru g ON p.id_guru = g.id
    ${whereSql}
`
    querySql += buildOrderBy(sort, order, PENILAIAN_SORT, 'p.id')

    if (page) {
      querySql += ` LIMIT ? OFFSET ?`
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
  const { search, page, limit, sort, order } = req.query

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
    querySql += buildOrderBy(sort, order, GURU_SORT, 'id')

    if (page) {
      querySql += ` LIMIT ? OFFSET ?`
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

// login user (check tabel `user`)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password must be filled' })
  }

  const querySql = 'SELECT id, name, username, password, position FROM `user` WHERE username = ?'
  db.query(querySql, [String(username)], async (err, rows) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Wrong username or password' })
    }

    try {
      const user = rows[0]
      const stored = String(user.password)
      const isHashed = /^\$2[aby]\$/.test(stored)
      const valid = isHashed
        ? await bcrypt.compare(String(password), stored)
        : stored === String(password)

      if (!valid) {
        return res.status(401).json({ message: 'Wrong username or password' })
      }

      if (!isHashed) {
        const hash = await bcrypt.hash(String(password), 10)
        db.query('UPDATE `user` SET password = ? WHERE id = ?', [hash, user.id], (updErr) => {
          if (updErr) console.error('cannot upgrade password hash', updErr)
        })
      }

      res.json({
        message: 'Login success',
        user: { id: user.id, name: user.name, username: user.username, position: user.position },
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  })
})

// insert new penilaian (nilai 1 - 4, total = pembobotan 40/30/20/10)
app.post('/api/penilaian', (req, res) => {
  const { id_guru, pedagogik, profesional, sosial, kepribadian } = req.body || {}
  const idGuru = parseInt(id_guru)
  const scores = [pedagogik, profesional, sosial, kepribadian].map((v) => parseInt(v))

  if (!idGuru || scores.some((v) => isNaN(v) || v < 1 || v > 4)) {
    return res.status(400).json({ message: 'Bad Request : data not valid' })
  }

  const [ped, pro, sos, kep] = scores
  const total = Math.round((0.3 * ped + 0.2 * pro + 0.15 * sos + 0.35 * kep) * 100) / 100

  db.query('SELECT id FROM penilaian WHERE id_guru = ?', [idGuru], (err, row) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    if (row.length > 0) {
      return res.status(409).json({ message: 'Guru sudah memiliki penilaian' })
    }

    const querySql = `INSERT INTO penilaian (id_guru, pedagogik, profesional, sosial, kepribadian, total) VALUES (?,?,?,?,?,?)`
    db.query(querySql, [idGuru, ped, pro, sos, kep, total], (err, result) => {
      if (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
          return res.status(404).json({ message: 'Guru Not Found' })
        }
        console.error(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
      res.status(201).json({
        message: 'Data saved successfully',
        id: result.insertId,
      })
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

    const fotoFile = row[0].profile

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

// delete exists penilaian
app.delete('/api/penilaian/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Bad Request : id not valid' })
  }

  db.query('DELETE FROM penilaian WHERE id = ?', [id], (err, result) => {
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
      if (req.file) fs.unlink(req.file.path, () => {})
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    if (row.length === 0) {
      if (req.file) fs.unlink(req.file.path, () => { })
      return res.status(404).json({ message: 'Not Found!' })
    }

    const old = row[0].profile
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
