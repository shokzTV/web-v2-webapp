require('dotenv').config();
const fetch = require('isomorphic-unfetch');

async function get(url) {
  const response = await fetch(process.env.API_URL + url);
  return await response.json();
}
async function fetchArticleIds() {
    return await get('/article/public/articleIds');
}
async function fetchTagIds() {
    return await get('/tag/ids');
}
async function fetchFeaturedEvents() {
  return await get('/event/featured');
}
async function fetchPastEventIds() {
  return await get('/event/pastIds');
}
async function fetchAllEventIds() {
  const featured = await fetchFeaturedEvents();
  const ids = featured.map(({id}) => id);
  const pastIds = await fetchPastEventIds();
  return ids.concat(pastIds);
}

const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withOffline({
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    skipWaiting: true,
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https?.*(webp|jp2|jpeg|ico|png|jpg)$/,
        handler: 'CacheFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https?.*(cdnjs|gstatic)/,
        handler: 'CacheFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https?.*(api)/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'alpha-v1',
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60,
            purgeOnQuotaError: true,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'alpha-page-chache-v1',
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60,
            purgeOnQuotaError: true,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL
  },
}));
