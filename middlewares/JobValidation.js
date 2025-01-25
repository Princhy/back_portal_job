const Joi = require("joi");

const storeValidation = (req, res, next) => {
  const schema = Joi.object({
    titre: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    salary: Joi.string().required(),
    publied_by: Joi.string().required(),
    type: Joi.string().valid('emploi', 'stage').required(),
    statuts: Joi.string().valid('Disponible', 'Non Disponible').required(),
    photo: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const updateValidation = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().optional(),
    titre: Joi.string().optional(),
    location: Joi.string().optional(),
    salary: Joi.string().optional(),
    statuts: Joi.string().valid("Disponible", "Non disponible").optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const assignValidation = (req, res, next) => {
  const schema = Joi.object({
    assigned_to: Joi.array().items(Joi.string().required()).required(),
    assigned_by: Joi.string().required(),
    assigned_at: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

module.exports = {
  storeValidation,
  updateValidation,
  assignValidation,
};