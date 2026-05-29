import Joi from 'joi';
import { HttpError } from '../utils/httpError.js';

const scanSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().trim().min(3).max(30).optional().allow('')
});

export function validateScanRequest(req, res, next) {
  const { error, value } = scanSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return next(new HttpError(400, error.details.map((item) => item.message).join(', ')));
  }
  req.validatedBody = value;
  next();
}
