const Joi = require('@hapi/joi');
const userSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().length(8).required(),
    name: Joi.string().alphanum().min(2).max(100).required(),
    lastname: Joi.string().alphanum().min(2).max(100).required(),
    currency: Joi.string().valid('eur', 'usd', 'cop')
});
const criptoSchema = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    source: Joi.string().alphanum().required()
});
module.exports = {userSchema, criptoSchema};
