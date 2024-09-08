import express from 'express'
import crypto from 'crypto'
import { db, queries } from '../utils/postgres'
import * as jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { generateJWT } from '../middleware/jwt'

const router = express.Router()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/checkuser'), async (req:any, res:any) => {
  try {
    const data = await db.one(queries.checkIfUserExists)
    res.json(data)
  } catch (error) {
    res.json(error)
    throw new Error ('Impossible de vérifier si un user existe dans la database')
  }
}

router.post('/login/password', urlencodedParser, async (req: any, res: any) => {
  try {
    const data_received = {
      username: req.body.username,
      password : req.body.password
    }

    //query la database
    const db_data = await db.one(queries.auth, data_received.username)
    // comparer les données
    if (Buffer.compare(crypto.pbkdf2Sync(data_received.password, db_data.salt, 310000, 32, 'sha256'), db_data.hashed_password) === 0) {
      //créer le JWT
      res.json(generateJWT(data_received.username))
    } else {
      res.json("Nom d'utilisateur ou mot de passe incorrect")
    }
  } catch (error) {
    console.log(error)
    throw new Error('Login failed')
  }
})

module.exports = router