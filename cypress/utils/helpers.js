export function getEnvUrl(key) {
  return Cypress.env('urls')[key];
}

export function generateUniqueTitle(prefix) {
  const randomSuffix = Math.random().toString(36).substring(2, 8);

  return `${prefix}_${randomSuffix}`;
}
