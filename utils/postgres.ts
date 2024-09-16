import pgp from 'pg-promise'

require("dotenv").config();
export const db = pgp()(`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`);

export const queries = {
  auth: "SELECT * FROM users WHERE username = $1",
  checkIfUserExists: "SELECT EXISTS(SELECT 1 FROM users)",
  getProjectsList: "SELECT id, title, year, status FROM projects",
  registerProject:
    "INSERT INTO projects (id, title, content, year, status, techs, repository) VALUES ($1, $2, $3, $4, $5, $6, $7)",
  updateProject:
    "UPDATE projects SET title = $1, content = $2, year = $3, status = $4, techs = $5, created = $6, modified = $7, repository = $8 WHERE id = $9",
  deleteProject: "DELETE FROM projects WHERE id = $1",
  getProjectById: "SELECT * FROM projects WHERE id = $1",
};