import { env } from '../config/env.js';
import { cache } from '../utils/cache.js';
import { withTimeout } from '../utils/timeout.js';

const mockBreaches = [
  { name: 'LinkedPro Forum', severity: 'high', records: 1200000, compromisedData: ['emails', 'password hashes'], breachDate: '2024-01-14', source: 'mock' },
  { name: 'ShopEase', severity: 'medium', records: 450000, compromisedData: ['emails', 'phone numbers'], breachDate: '2023-09-08', source: 'mock' },
  { name: 'PixelChat', severity: 'high', records: 3200000, compromisedData: ['emails', 'password hashes', 'locations'], breachDate: '2022-11-26', source: 'mock' }
];

function generateBreaches(email) {
  const local = email.split('@')[0].toLowerCase();
  const seed = local.length + local.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  if (seed % 5 === 0) return [];
  if (seed % 2 === 0) return mockBreaches.slice(0, 2);
  return mockBreaches.slice(0, 1);
}

export async function fetchBreaches(email) {
  const key = `breach:${email.toLowerCase()}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const result = await withTimeout(
    new Promise((resolve) => setTimeout(() => resolve(generateBreaches(email)), 300)),
    env.externalTimeoutMs,
    () => []
  );

  cache.set(key, result, env.cacheTtlSeconds);
  return result;
}
