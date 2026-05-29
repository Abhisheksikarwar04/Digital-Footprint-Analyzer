import dns from 'dns/promises';
import { env } from '../config/env.js';
import { cache } from '../utils/cache.js';
import { withTimeout } from '../utils/timeout.js';

const disposableDomains = new Set(['mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com']);

async function resolveMx(domain) {
  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}

export async function analyzeEmail(email) {
  const normalized = email.toLowerCase().trim();
  const key = `email:${normalized}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const [localPart, domain] = normalized.split('@');
  const hasMx = await withTimeout(resolveMx(domain), env.externalTimeoutMs, () => false);
  const suspiciousPattern = /(123|admin|test|temp|qwerty)/i.test(localPart) || localPart.length < 6;

  const result = {
    hasMx,
    disposable: disposableDomains.has(domain),
    domain,
    localPartLength: localPart.length,
    suspiciousPattern
  };

  cache.set(key, result, env.cacheTtlSeconds);
  return result;
}
