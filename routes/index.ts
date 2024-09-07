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

router.get("/adduser", async (req: any, res: any) => {
    try {
      var salt = crypto.randomBytes(16)
      await db.none('INSERT INTO users (id, username, hashed_password, salt) VALUES ($1, $2, $3, $4)', [1, 'kouacc', crypto.pbkdf2Sync('pIj2TPr1*', salt, 310000, 32, 'sha256'), salt])
      res.json('utilisateur ajouté !')
    } catch (error) {
        res.status(500).json({ error: (error as any).message })
    }
})

router.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

module.exports = router