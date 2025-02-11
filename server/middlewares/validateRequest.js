<<<<<<< HEAD
const Joi = require('joi');

exports.validateCreateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });
  
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
=======
const Joi = require('joi');

exports.validateCreateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });
  
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
}; 