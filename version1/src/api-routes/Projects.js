//validations desc.
const schemas = require("../validations/Projects");// get schemas
//validate middleware
const validate = require("../middlewares/validate");//get func
const express = require("express");
const { create, index, update } = require("../controllers/Projects");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.route("/").get(authenticate, index);
router.route("/").post(authenticate ,validate(schemas.createValidation), create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), update)

module.exports = {
    router,
}