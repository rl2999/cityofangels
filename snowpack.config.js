/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018'
  },
  mount: {
    public: {
      url: '/',
      static: false,
      resolve: false
    },
    src: {
      url: '/',
      static: false,
      resolve: true
    }
    // src: '/_dist_',
  },
  plugins: [
    ['@snowpack/plugin-webpack'],
    ['@snowpack/plugin-sass', {
      style: 'compressed',
      update: false
    }],
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};