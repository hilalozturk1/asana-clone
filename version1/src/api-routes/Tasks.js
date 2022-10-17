//validations desc.
const schemas = require("../validations/Tasks");// get schemas
//validate middleware
const validate = require("../middlewares/validate");//get func
const express = require("express");
const { create, update, deleteTask, makeComment, deleteComment, addSubTask, fetchTask } = require("../controllers/Tasks");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.route("/:id").get(authenticate, fetchTask)
router.route("/").post(authenticate ,validate(schemas.createValidation), create);
router.route("/:id").delete(authenticate, deleteTask)
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), update)
router.route("/:id/make-comment").post(authenticate, validate(schemas.commentValidation), makeComment)
router.route("/:id/:commentId/").delete(authenticate, deleteComment)
router.route("/:id/sub-task").post(authenticate, validate(schemas.createValidation), addSubTask)

module.exports = {
    router,
}