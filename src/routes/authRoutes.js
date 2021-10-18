const router = require("express").Router();
const authControllers = require("../controllers/authControllers");

router.post("/login-aluno", authControllers.loginAluno);
router.post("/login-professor", authControllers.loginProfessor);
router.post("/login-escola", authControllers.loginEscola);

module.exports = router;
