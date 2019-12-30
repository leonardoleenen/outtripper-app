const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const nextRuntimeDotenv = require('next-runtime-dotenv')

const withConfig = nextRuntimeDotenv({
  public: [
    'API_SERVER',
  ],
})


const nextConfig = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module.
    config.node = { // eslint-disable-line no-param-reassign
      fs: 'empty',
    }
    return config
  },
}

module.exports = withConfig(withPlugins([
  [withConfig], withSass,
], nextConfig))

/* exports.default = {
  env: {
    API_SERVER: process.env.API_SERVER,
  },
} */
