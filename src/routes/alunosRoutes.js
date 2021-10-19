const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authMiddleware");
const alunosControllers = require("../controllers/alunosControllers");

router.post("/", alunosControllers.createAluno);
router.get("/me", authentication(["aluno"]), alunosControllers.getAluno);
router.get("/boletim", authentication(["aluno"]), alunosControllers.getBoletim);
router.delete("/:id", alunosControllers.deleteAluno);
router.get("/", alunosControllers.getAllAlunos);

module.exports = router;
