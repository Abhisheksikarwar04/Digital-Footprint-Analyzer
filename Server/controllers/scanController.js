import { createScan, getScanById, createToken } from '../services/scanService.js';

export async function startScan(req, res, next) {
  try {
    const result = await createScan(req.validatedBody);
    res.status(202).json(result);
  } catch (error) {
    next(error);
  }
}

export async function fetchScan(req, res, next) {
  try {
    const result = await getScanById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function issueDemoToken(req, res, next) {
  try {
    const token = await createToken();
    res.json({ token });
  } catch (error) {
    next(error);
  }
}
