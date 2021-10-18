const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authMiddleware");
const notasControllers = require("../controllers/notasControllers");

router.post("/", authentication(["escola"]), notasControllers.createNota);
router.get("/", authentication(["aluno"]), notasControllers.getNotasOfStudent);
router.delete("/:id", notasControllers.deleteNotasOfStundent);
module.exports = router;

