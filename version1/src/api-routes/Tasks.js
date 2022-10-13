//validations desc.
const schemas = require("../validations/Tasks");// get schemas
//validate middleware
const validate = require("../middlewares/validate");//get func
const express = require("express");
const { create, update, deleteTask, makeComment } = require("../controllers/Tasks");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.route("/").post(authenticate ,validate(schemas.createValidation), create);
router.route("/:id").delete(authenticate, deleteTask)
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), update)
router.route("/:id/make-comment").post(authenticate, validate(schemas.commentValidation), makeComment)

module.exports = {
    router,
}