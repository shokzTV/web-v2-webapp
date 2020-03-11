require('dotenv').config();

const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withOffline({
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
    API_URL: process.env.API_URL,
    GA_ID: process.env.GA_ID
  },
}));
