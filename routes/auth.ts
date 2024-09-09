import express from 'express'
import crypto from 'crypto'
import { db, queries } from '../utils/postgres'
import * as jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { authorization, generateJWT, verifyJWT } from '../middleware/jwt'

const router = express.Router()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/checkuser'), async (req:any, res:any) => {
  try {
    const data = await db.one(queries.checkIfUserExists)
    res.json(data)
  } catch (error) {
    res.json(error)
    throw new Error('Impossible de vérifier si un user existe dans la database')
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
      res
        .cookie("access_token", generateJWT(db_data.id, data_received.username), {
          httpOnly: true,
          secure: process.env.STATUS === "production",
        })
        .status(200)
        .redirect('/admin');
    } else {
      res.json("Nom d'utilisateur ou mot de passe incorrect")
    }
  } catch (error) {
    console.log(error)
    throw new Error('Login failed')
  }
})

router.get("/logout", authorization, (req: any, res: any) => {
  return res.clearCookie("access_token").status(200).redirect("/");
})

router.get('/verify', async (req: any, res: any) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = verifyJWT(token)
    res.json(data)

  } catch (error) {
    console.log(error)
    throw new Error('Impossible de vérifier le token')
  }
})

module.exports = router