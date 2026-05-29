function calculateBreachExposure(breaches = []) {
  if (!breaches.length) return 0;
  const severityScore = breaches.reduce((score, breach) => score + (breach.severity === 'high' ? 18 : breach.severity === 'medium' ? 10 : 6), 0);
  return Math.min(40, severityScore + Math.min(10, breaches.length * 2));
}

function calculatePasswordStrength(email = '', username = '') {
  const seed = `${email}:${username}`.toLowerCase();
  let score = 4;
  if (/\d/.test(seed)) score += 4;
  if (/[._-]/.test(seed)) score += 2;
  if (seed.length > 18) score += 2;
  if (/(123|admin|qwerty|test)/.test(seed)) score += 8;
  return Math.min(20, score);
}

function calculateUsernamePresence(profiles = []) {
  const foundCount = profiles.filter((profile) => profile.found).length;
  return Math.min(15, foundCount * 3);
}

function calculateEmailHygiene(emailCheck) {
  let score = 0;
  if (!emailCheck?.hasMx) score += 8;
  if (emailCheck?.disposable) score += 5;
  if (emailCheck?.suspiciousPattern) score += 4;
  return Math.min(15, score);
}

function calculateSecurityPosture({ breaches = [], emailCheck, profiles = [] }) {
  let score = 0;
  if (breaches.some((breach) => breach.compromisedData.includes('password hashes'))) score += 4;
  if (profiles.filter((profile) => profile.found).length >= 3) score += 3;
  if (emailCheck?.disposable || !emailCheck?.hasMx) score += 3;
  return Math.min(10, score);
}

function deriveRiskLevel(score) {
  if (score >= 67) return 'HIGH';
  if (score >= 34) return 'MEDIUM';
  return 'LOW';
}

function buildRecommendations({ breaches = [], emailCheck, profiles = [] }) {
  const recommendations = [];
  if (breaches.length) recommendations.push('Change passwords for breached accounts and enable MFA immediately.');
  if (emailCheck?.disposable) recommendations.push('Replace disposable email usage with a trusted inbox for account recovery.');
  if (emailCheck?.suspiciousPattern) recommendations.push('Use less predictable aliases and remove weak patterns from usernames or email local parts.');
  if (profiles.filter((profile) => profile.found).length >= 3) recommendations.push('Review privacy settings on public profiles and reduce unnecessary visibility.');
  recommendations.push('Monitor new breaches regularly and rotate critical credentials every 90 days.');
  return [...new Set(recommendations)];
}

export function computeRisk(payload) {
  const breakdown = {
    breach: calculateBreachExposure(payload.breaches),
    password: calculatePasswordStrength(payload.email, payload.username),
    presence: calculateUsernamePresence(payload.profiles),
    email: calculateEmailHygiene(payload.emailCheck),
    posture: calculateSecurityPosture(payload)
  };

  const riskScore = Math.min(100, Object.values(breakdown).reduce((sum, value) => sum + value, 0));
  return {
    riskScore,
    riskLevel: deriveRiskLevel(riskScore),
    breakdown,
    recommendations: buildRecommendations(payload)
  };
}
