import express from 'express'
import { db, queries } from '../../utils/postgres'
import { authorization } from '../../middleware/jwt'

const router = express.Router()

router.get("/projects", async (req: any, res: any) => {
    try {
      const data = await db.many(queries.getProjectsList);
      res.json(data)
    } catch (error) {
        res.status(500).json({ error: (error as any).message })
    }
})





module.exports = router