import express from 'express'
import path from 'path'
import fs from 'fs'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import './instrument'
import * as Sentry from '@sentry/node'

const apiRouter = require("./routes/api/api")
const protectedApiRouter = require("./routes/api/protected")
const authRouter = require("./routes/auth")
const utilsRouter = require("./routes/utils")

const port = process.env.PORT || 4000

const app = express()

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

var corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors());
app.use(
  morgan(":remote-addr :method :url :status :res[content-length] - :response-time ms" + "<br>", {
    stream: accessLogStream,
  })
);
app.use(express.static(path.join(__dirname, "public/dist")));
app.set("trust proxy", true)
app.use(cookieParser());

Sentry.setupExpressErrorHandler(app);

app.use(function onError(err:any, req:any, res:any, next:any) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use("/api", apiRouter)
app.use("/api/protected", protectedApiRouter)
app.use("/auth", authRouter)
app.use("/utils", utilsRouter);

app.get("*", (req:any, res:any) => {
  res.sendFile(path.join(__dirname, "public/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});

module.exports = app;