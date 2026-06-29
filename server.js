import app from "./src/app.js";
import dotenv from "dotenv";

import express from "express";

dotenv.config();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
