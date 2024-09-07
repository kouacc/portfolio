import express from 'express'
import { db } from '../utils/postgres'

const router = express.Router()

router.get("/projects", async (req: any, res: any) => {
    try {

    } catch (error) {
        res.status(500).json({ error: (error as any).message })
    }
})

router.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

module.exports = router