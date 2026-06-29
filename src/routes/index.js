import express from "express";

import rotasAuth from "./auth.js"
import rotasAlunos from "./alunos.js"

const routes = app => {
    app.use(express.json());

    app.route("/").get( (req, res) => {
        res.status(200).json(
            { message: "Hello Wolrd!"}
        );
    })

    app.use(rotasAuth);
    app.use(rotasAlunos);
}

export default routes;
