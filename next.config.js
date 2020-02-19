// const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const nextRuntimeDotenv = require('next-runtime-dotenv')
const withOffline = require('next-offline')

const withConfig = nextRuntimeDotenv({
  public: [],
})

const nextConfig = {
  target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}

// module.exports = withConfig(withPlugins([[withConfig], withCSS]),withOffline(nextConfig))

// module.exports = withPlugins([withCSS, withOffline(nextConfig)])

// module.exports = withPlugins([withCSS], [withOffline(nextConfig)])

// module.export = withOffline(nextConfig)

// module.export = withCSS()

module.exports = withPlugins([withCSS, withOffline], nextConfig)
