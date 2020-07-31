import express from "express";
import * as userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/hello", (req, res) => res.send("Hello world!"));

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/auth", auth, userController.afterAuth);

router.get("/logout", auth, userController.logout);

export default router;
