const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");

const express = require("express");
const router = express.Router();

//localhost:8080/api/auth/signup
router.post("/signup",
            [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
            controller.signup);

//localhost:8080/api/auth/signin
router.post("/signin", controller.signin);

module.exports = router;