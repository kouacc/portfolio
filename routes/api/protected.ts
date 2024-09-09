import express from "express";
import { db, queries } from "../../utils/postgres";
import { authorization } from "../../middleware/jwt";

const router = express.Router();

router.patch("/updateproject/:id", authorization, async (req: any, res: any) => {
    const project_id = req.params.id;
    try {

    } catch (error) {
        console.log(error)
        throw new Error(`Impossible de modifier le projet d'ID ${project_id}`)
    }
})

router.delete("/deleteproject/:id", authorization, async (req: any, res: any) => {
    const project_id = req.params.id
    try {
        await db.none(queries.deleteProject)
        res.json('Projet supprimé !')
    } catch (error) {
        console.log(error)
        throw new Error(`Impossible de supprimer le projet d'ID ${project_id}`)
    }
})

module.exports = router;
