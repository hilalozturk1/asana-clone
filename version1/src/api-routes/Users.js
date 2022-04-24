const schemas = require("../validations/Users");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const express = require("express");
const { create, index, login, projectsList } = require("../controllers/Users");

const router = express.Router();

router.get("/", index);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/login").post(validate(schemas.loginValidation), login);
router.route("/projects").get(authenticate,projectsList)

module.exports = router;