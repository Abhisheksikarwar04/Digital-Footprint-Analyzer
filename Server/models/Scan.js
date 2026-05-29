import mongoose from 'mongoose';
import { env } from '../config/env.js';

const scanSchema = new mongoose.Schema({
  emailHash: { type: String, required: true, index: true },
  username: { type: String, default: '' },
  status: { type: String, enum: ['processing', 'completed', 'failed'], default: 'processing', index: true },
  breaches: {
    type: [
      {
        name: String,
        severity: String,
        records: Number,
        compromisedData: [String],
        breachDate: String,
        source: String
      }
    ],
    default: []
  },
  profiles: {
    type: [
      {
        platform: String,
        found: Boolean,
        url: String,
        confidence: Number
      }
    ],
    default: []
  },
  emailCheck: {
    hasMx: Boolean,
    disposable: Boolean,
    domain: String,
    localPartLength: Number,
    suspiciousPattern: Boolean
  },
  riskScore: { type: Number, default: 0 },
  riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
  breakdown: {
    breach: { type: Number, default: 0 },
    password: { type: Number, default: 0 },
    presence: { type: Number, default: 0 },
    email: { type: Number, default: 0 },
    posture: { type: Number, default: 0 }
  },
  recommendations: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + env.scanTtlDays * 24 * 60 * 60 * 1000),
    index: { expires: 0 }
  }
}, { versionKey: false });

export const Scan = mongoose.model('Scan', scanSchema);
