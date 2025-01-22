module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    assetPrefix: process.env.NODE_ENV === 'production' ? '/{your-repo-name}' : '',
  }
};