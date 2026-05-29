import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Scan } from '../models/Scan.js';
import { env } from '../config/env.js';
import { sha256 } from '../utils/hash.js';
import { fetchBreaches } from './breachService.js';
import { analyzeEmail } from './emailService.js';
import { lookupProfiles } from './profileService.js';
import { computeRisk } from './riskService.js';
import { HttpError } from '../utils/httpError.js';

export async function createToken() {
  return jwt.sign({ role: 'demo-user' }, env.jwtSecret, { expiresIn: '7d' });
}

export async function createScan({ email, username = '' }) {
  const emailHash = sha256(email);
  const scan = await Scan.create({
    emailHash,
    username,
    status: 'processing'
  });

  processScan(scan._id.toString(), { email, username }).catch(async () => {
    await Scan.findByIdAndUpdate(scan._id, { status: 'failed' });
  });

  return {
    scanId: scan._id.toString(),
    status: 'processing'
  };
}

async function processScan(scanId, { email, username }) {
  const [breaches, emailCheck, profiles] = await Promise.all([
    fetchBreaches(email),
    analyzeEmail(email),
    lookupProfiles(username)
  ]);

  const riskResult = computeRisk({ email, username, breaches, emailCheck, profiles });

  await Scan.findByIdAndUpdate(scanId, {
    status: 'completed',
    breaches,
    profiles,
    emailCheck,
    riskScore: riskResult.riskScore,
    riskLevel: riskResult.riskLevel,
    breakdown: riskResult.breakdown,
    recommendations: riskResult.recommendations
  });
}

export async function getScanById(scanId) {
  if (!mongoose.Types.ObjectId.isValid(scanId)) {
    throw new HttpError(400, 'Invalid scan id');
  }

  const scan = await Scan.findById(scanId).lean();
  if (!scan) throw new HttpError(404, 'Scan not found');

  return {
    status: scan.status,
    riskScore: scan.riskScore,
    riskLevel: scan.riskLevel,
    breakdown: scan.breakdown,
    breaches: scan.breaches,
    profiles: scan.profiles,
    recommendations: scan.recommendations
  };
}
