import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

import config from "./config/index.js";
import userRouter from "./routes/userRouter.js";

const app = express();

//appliation/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
//cookie
app.use(cookieParser());

const port = process.env.PORT;
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Web app listening on port ${port}`));
