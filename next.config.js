// const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const nextRuntimeDotenv = require('next-runtime-dotenv')

const withConfig = nextRuntimeDotenv({
  public: [],
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
  [withConfig], withCSS,
], nextConfig))
