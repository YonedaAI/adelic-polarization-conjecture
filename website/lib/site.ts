export const project = 'Adelic Polarization Conjecture';
export const description = 'Prime-adjoining correspondences, local Weil distributions, and obstructions to compatible arithmetic polarization.';
export const github = 'https://github.com/YonedaAI/adelic-polarization-conjecture';
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
