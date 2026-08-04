export function getEnvUrl(key) {
  return Cypress.env('urls')[key];
}
