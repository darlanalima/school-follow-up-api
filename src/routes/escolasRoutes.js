const express = require("express");
const router = express.Router();

const escolasControllers = require("../controllers/escolasControllers");

router.post("/", escolasControllers.createEscola);

module.exports = router;
