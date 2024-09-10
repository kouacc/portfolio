import express from "express";
import { db, queries } from "../../utils/postgres";
import { authorization } from "../../middleware/jwt";
import multer from "multer";
import type { Projects } from "../../utils/types";
import * as fs from 'fs'
import * as path from 'path'

const upload = multer()

const router = express.Router();

router.post("/createproject", upload.array('photos', 12), authorization, async (req: any, res: any) => {
    const data = req.body
    try {
        await db.none(queries.registerProject, [])
        //write the images in /public/img/projects
        /* for (img in req.files) {
            fs.writeFileSync(path.join(__dirname, "/public/projects"), img);
        } */
    } catch (error) {
        console.log(error)
        throw new Error('Impossible de créer le nouveau projet')
    }
})

router.post("/updateproject/:id", upload.none, authorization, async (req: any, res: any) => {
    const project_id: String = req.params.id;
    try {

    } catch (error) {
        console.log(error)
        throw new Error(`Impossible de modifier le projet d'ID ${project_id}`)
    }
})

router.post("/deleteproject/:id", authorization, async (req: any, res: any) => {
    const project_id: String = req.params.id
    try {
        await db.none(queries.deleteProject)
        res.json('Projet supprimé !')
    } catch (error) {
        console.log(error)
        throw new Error(`Impossible de supprimer le projet d'ID ${project_id}`)
    }
})


module.exports = router;
