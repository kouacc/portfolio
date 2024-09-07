import pgp from 'pg-promise'

require("dotenv").config();
export const db = pgp()(`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`);

export const queries = {
    auth: 'SELECT * FROM users WHERE username = $1'
}