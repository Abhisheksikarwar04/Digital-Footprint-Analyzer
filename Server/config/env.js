import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dfa',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS || 300),
  scanTtlDays: Number(process.env.SCAN_TTL_DAYS || 7),
  externalTimeoutMs: Number(process.env.EXTERNAL_TIMEOUT_MS || 2500)
};
