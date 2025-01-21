const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const Joi = require("joi");


const signupValidation = (req, res, next) => {
    const schema = Joi.object({
      nom: Joi.string().min(3).max(100).required(),
      prenom: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().required(),
      role: Joi.string().valid("recruiter", "Candidate",).required(),
      photo: Joi.string().optional(),
      password: Joi.string().min(4).max(100).required(),
      contact: Joi.string().optional(),
      
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Bad request", error: error.details[0].message });
    }
    next();
  };

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(100).required(),
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Bad request", error });
    }
    next();
  };

  module.exports = {
    loginValidation,
    signupValidation,
  };