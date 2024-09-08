import express from 'express'
import crypto from 'crypto'
import { db } from '../utils/postgres'
import { queries } from '../utils/postgres'
import * as jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { generateJWT } from '../middleware/jwt'

const router = express.Router()

var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/login/password', urlencodedParser, async (req: any, res: any) => {
  try {
    const data_received = {
      username: req.body.username,
      password : req.body.password
    }

    //query la database
    const db_data = await db.one(queries.auth, data_received.username)
    // comparer les données
    if (crypto.pbkdf2Sync(data_received.password, db_data.salt, 310000, 32, 'sha256') === db_data.hashed_password) {
      //créer le JWT
      generateJWT(data_received.username)
      res.redirect('/admin')
    } else {
      res.json("Nom d'utilisateur ou mot de passe incorrect")
    }
  } catch (error) {
    throw new Error('Login failed')
  }
})

module.exports = router