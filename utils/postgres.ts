import pgp from 'pg-promise'

require("dotenv").config();
export const db = pgp()(`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`);

export const queries = {
    auth: 'SELECT * FROM users WHERE username = $1',
    checkIfUserExists: 'SELECT EXISTS(SELECT 1 FROM users)',
    getProjectsList: 'SELECT id, title, year, status FROM projects',
    registerProject: 'INSERT INTO projects (id, title, content, year, status, techs) VALUES ($1, $2, $3, $4, $5, $6)',
    updateProject: 'UPDATE',
    deleteProject: 'DELETE FROM projects WHERE id = $1',
}