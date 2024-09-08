import * as jwt from 'jsonwebtoken'
import express from 'express'
require("dotenv").config();


export function generateJWT(username: string): string {
    return jwt.sign(username, process.env.JWT_TOKEN as string, { expiresIn: '1800s'})
}



export function authenticateJWT(req:any, res:any, next:any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}