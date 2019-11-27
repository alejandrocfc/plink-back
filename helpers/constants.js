const Joi = require('@hapi/joi');
const userSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().length(8).required(),
    name: Joi.string().alphanum().min(2).max(100).required(),
    lastname: Joi.string().alphanum().min(2).max(100).required(),
    currency: Joi.string().valid('eur', 'usd', 'cop')
});
const criptoSchema = Joi.object().keys({
    name: Joi.string().required()
});
const ApiKey = '78a4f7a824mshc139234a286ab1ep1bd37djsn0e0c176f8a7b';
module.exports = {userSchema, criptoSchema, ApiKey};
