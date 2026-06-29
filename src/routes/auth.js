import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

const usuarios = [];

router.post("/register", AuthController.registrarUsuario);

router.post("/login", AuthController.login);

export default router;
