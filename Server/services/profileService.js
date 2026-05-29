import { env } from '../config/env.js';
import { cache } from '../utils/cache.js';
import { withTimeout } from '../utils/timeout.js';

const platforms = ['GitHub', 'Reddit', 'X', 'Instagram', 'LinkedIn'];

function buildProfiles(username = '') {
  if (!username) return [];
  const normalized = username.toLowerCase();
  return platforms.map((platform, index) => {
    const found = (normalized.length + index) % 2 === 0 || normalized.includes(platform[0].toLowerCase());
    return {
      platform,
      found,
      url: found ? `https://${platform.toLowerCase()}.com/${normalized}` : '',
      confidence: found ? 0.72 + (index * 0.04) : 0.2
    };
  });
}

export async function lookupProfiles(username) {
  const key = `profiles:${(username || '').toLowerCase()}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const result = await withTimeout(
    new Promise((resolve) => setTimeout(() => resolve(buildProfiles(username)), 250)),
    env.externalTimeoutMs,
    () => []
  );

  cache.set(key, result, env.cacheTtlSeconds);
  return result;
}
