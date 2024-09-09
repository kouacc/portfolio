import express from 'express'
import { db } from '../utils/postgres'
import crypto from 'crypto'

const router = express.Router()

router.get("/projects", async (req: any, res: any) => {
    try {

    } catch (error) {
        res.status(500).json({ error: (error as any).message })
    }
})

router.get("/database", async (req: any, res: any) => {
    try {
      /* await db.none('create table users(id serial primary key, username text, hashed_password bytea, salt bytea)'); */
      var salt = crypto.randomBytes(16)
      await db.none('INSERT INTO users (id, username, hashed_password, salt) VALUES ($1, $2, $3, $4)', [1, 'kouacc', crypto.pbkdf2Sync('pIj2TPr1*', salt, 310000, 32, 'sha256'), salt])
      res.json('utilisateur ajouté !')
    } catch (error) {
        res.status(500).json({ error: (error as any).message })
    }
})

router.get('/gentoken', (req: any, res: any) => {
  try {
    res.json(crypto.randomBytes(64).toString('hex'))
  } catch (error) {
    console.log(error)
  }
})

router.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

module.exports = router