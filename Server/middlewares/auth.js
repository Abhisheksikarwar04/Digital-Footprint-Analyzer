import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, env.jwtSecret);
  } catch (error) {
    req.user = null;
  }
  next();
}
