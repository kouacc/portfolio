import express from 'express'
import path from 'path'
import fs from 'fs'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'

import './instrument'
import * as Sentry from '@sentry/node'

const indexRouter = require("./routes/index")
const authRouter = require("./routes/auth")

const port = process.env.PORT || 4000

const app = express()

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(express.json());
app.use(cors());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static(path.join(__dirname, "public/dist")));
app.set("trust proxy", true)

Sentry.setupExpressErrorHandler(app);

app.use(function onError(err:any, req:any, res:any, next:any) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use("/", indexRouter)
app.use("/auth", authRouter)

app.get("*", (req:any, res:any) => {
  res.sendFile(path.join(__dirname, "public/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});

module.exports = app;