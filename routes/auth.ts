import express from 'express'
import { db } from '../utils/postgres'

const router = express.Router()

router.get('/login/password', (req, res) => {
    try {
        res.json('ça marche mdr')
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
        throw new Error("ça marche pas en fait");
    }
})

module.exports = router