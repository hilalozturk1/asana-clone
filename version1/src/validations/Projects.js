const Joi = require("joi");
//create - update -> validations schema
const createValidation = Joi.object({
    name: Joi.string().required().min(5),
});

module.exports = {
    createValidation,
}