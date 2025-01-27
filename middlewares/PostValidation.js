const Joi = require("joi");

const storeValidation = (req, res, next) => {
  const schema = Joi.object({
    cv: Joi.string().required(),
    userId: Joi.number().required(),
    jobId: Joi.number().required(),
    entiteId: Joi.number().required(),
    status: Joi.string().valid('pending', 'accepted', 'rejected').default('pending')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const updateValidation = (req, res, next) => {
  const schema = Joi.object({
    cv: Joi.string().optional(),
    status: Joi.string().valid('pending', 'accepted', 'rejected').optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

module.exports = {
  storeValidation,
  updateValidation
};