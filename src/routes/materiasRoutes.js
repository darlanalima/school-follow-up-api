const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authMiddleware");
const materiasControllers = require("../controllers/materiasControllers");

router.get("/aluno", authentication(["aluno"]), materiasControllers.getMateriasOfStudent);
router.post("/", authentication(["escola"]), materiasControllers.createMateria);
router.get("/professor/:id", authentication(["professor"]), materiasControllers.getMateriasOfTeacher);
router.get("/materias", authentication(["materias"]), materiasControllers.getMateriasAll);
router.delete("/:id", materiasControllers.deleteMateria);
module.exports = router;
