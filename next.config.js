require('dotenv').config();
const fetch = require('isomorphic-unfetch');

async function get(url) {
  const response = await fetch(process.env.API_URL + url);
  return await response.json();
}
async function fetchArticleIds() {
    return await get('/article/public/articleIds');
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
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/articles': { page: '/articles' },
      '/article/[articleId]': { page: '/article/[articleId]' },
      '/dataProtection': { page: '/dataProtection' },
      '/events': { page: '/events' },
      '/event/[eventId]': { page: '/event/[eventId]' },
      '/imprint': { page: '/imprint' },
      '/videos': { page: '/videos' },
    };
    const articleIds = await fetchArticleIds();
    const eventIds = await fetchAllEventIds();

    articleIds.forEach(articleId => paths[`/article/${articleId}`] = { page: '/article/[articleId]' });
    eventIds.forEach(eventId => paths[`/event/${eventId}`] = { page: '/event/[eventId]' });

    return paths;
  },
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  workboxOpts: {
    swDest: 'static/service-worker.js',
    skipWaiting: true,
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https?.*(webp|jp2|jpeg|.ico|.png)$/,
        handler: 'CacheFirst'
      },
      {
        urlPattern: /^https?.*(cdnjs|gstatic)/,
        handler: 'CacheFirst'
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
    ],
  },
  env: {
    API_URL: process.env.API_URL
  },
}));
