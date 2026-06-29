import express from "express";
import auth from "../middleware/authMiddleware.js";
import AlunoController from "../controllers/alunoController.js"

const router = express.Router();

router.use(auth);

router.get("/alunos", AlunoController.buscarAlunos);

router.get("/alunos/medias", AlunoController.buscarMedias);

router.get("/alunos/aprovados", AlunoController.buscarAprovados);

router.post("/alunos", AlunoController.registrarAluno);

router.get("/alunos/:id", AlunoController.buscarAlunoPorId);

router.put("/alunos/:id", AlunoController.atualizarAluno);

router.delete("/alunos/:id", AlunoController.removerAluno);

export default router;
