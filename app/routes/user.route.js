const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

//localhost:8080/api/test/all
router.get("/all", controller.allAccess);

router.get("/user", [authJwt.verifyToken], controller.userBoard);

router.get("/admin",
            [authJwt.verifyToken, authJwt.isAdmin],
            controller.adminBoard);

module.exports = router;