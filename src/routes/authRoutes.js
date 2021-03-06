const router = require("express").Router();
const authControllers = require("../controllers/authControllers");

router.post("/login-aluno", authControllers.loginAluno);
router.post("/login-professor", authControllers.loginProfessor);
router.post("/login-escola", authControllers.loginEscola);
router.post("/login", authControllers.login);

module.exports = router;
