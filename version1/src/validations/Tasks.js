const Joi = require("joi");
//create - update -> validations schema
const createValidation = Joi.object({
    title: Joi.string().required().min(5),
    section_id: Joi.string().required().min(8),
    project_id: Joi.string().required().min(8),
});

const updateValidation = Joi.object({
    title: Joi.string().min(5),
    due_date: Joi.date()
});

module.exports = {
    createValidation,
    updateValidation
}