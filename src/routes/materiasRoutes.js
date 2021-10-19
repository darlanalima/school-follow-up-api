const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authMiddleware");
const materiasControllers = require("../controllers/materiasControllers");

router.get("/", authentication(["escola"]), materiasControllers.getAllMaterias);
router.get("/aluno", authentication(["aluno"]), materiasControllers.getMateriasOfStudent);
router.post("/", authentication(["escola"]), materiasControllers.createMateria);
router.get("/professor", authentication(["professor"]), materiasControllers.getMateriasOfTeacher);
router.delete("/:id", materiasControllers.deleteMateria);
module.exports = router;
