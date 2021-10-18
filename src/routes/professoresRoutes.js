const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authMiddleware");
const professoresControllers = require("../controllers/professoresControllers");

router.post("/", authentication(["escola"]), professoresControllers.createProfessor);
router.get("/" , professoresControllers.getProfessor)
router.delete("/:id", professoresControllers.deleteProfessor)
module.exports = router;
