//validations desc.
const schemas = require("../validations/Projects");// get schemas
//validate middleware
const validate = require("../middlewares/validate");//get func
const express = require("express");
const { create, index } = require("../controllers/Projects");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.route("/").get(authenticate, index);
router.route("/").post(authenticate ,validate(schemas.createValidation), create);

module.exports = {
    router,
}