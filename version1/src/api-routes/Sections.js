//validations desc.
const schemas = require("../validations/Sections");// get schemas
//validate middleware
const validate = require("../middlewares/validate");//get func
const express = require("express");
const { create, index, update, deleteSection } = require("../controllers/Sections");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.route("/:projectId").get(authenticate, index);
router.route("/").post(authenticate ,validate(schemas.createValidation), create);
router.route("/:id").delete(authenticate, deleteSection)
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), update)

module.exports = {
    router,
}