const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authMiddleware");
const frequenciasControllers = require("../controllers/frequenciasControllers");

router.post("/abrir-aula", authentication(["professor"]), frequenciasControllers.createFrequencia);
router.post("/:id", authentication(["aluno"]), frequenciasControllers.registrarFrequencia);

module.exports = router;
