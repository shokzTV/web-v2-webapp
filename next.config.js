require('dotenv').config();

const withOffline = require('next-offline');
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withOffline({
    target: "serverless",
    transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*api/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'https-calls-v1',
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