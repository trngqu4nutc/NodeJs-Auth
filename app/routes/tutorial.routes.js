const express = require("express");
const router = express.Router();
const tutorals = require("../controllers/tutorial.controller");

const authJwt = require("../middleware/authJwt");

//tutorial?page=1&limit=2
router.get("/", tutorals.findAll);

//tutorial/id
router.get("/:id", tutorals.findOneById);

//create and update.
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], tutorals.save);

//delete with id
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], tutorals.delete);

module.exports = router;