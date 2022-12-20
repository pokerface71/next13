/** @type {import('next').NextConfig} */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const withPWA = require('next-pwa')({
  dest: 'public'
})
const { i18n } = require('./next-i18next.config.js');

const nextConfig = (phase, { defaultConfig }) => {
  return {
    reactStrictMode: false,
    // pwa: {
    //   dest: "public",
    //   register: true,
    //   skipWaiting: true,
    //   disable: phase === PHASE_DEVELOPMENT_SERVER,
    // },
    i18n,
    // productionBrowserSourceMaps: true,
    // compiler: {
    //   removeConsole: true,
    // },
    env: {
      NEXT_APP_VERSION: '0.1.1',
      shopListLocalStorageTitle: 'shopList',
      globalStateLocalStorageTitle: 'globalState',
      siteAddress:
        phase === PHASE_DEVELOPMENT_SERVER
          ? 'http://localhost:8585/'
          : 'https://baaz.org/',
      apiGateWay:
        phase === PHASE_DEVELOPMENT_SERVER
          ? 'http://192.168.10.175:8443'
          : 'https://baaz.org',
      pageItemNumber: 24,
      timeAutoCloseToast: 10000,
      googleAnalyticsTrackingId: 'UA-105803922-1'
    },
    images: {
      domains: ['crm.baaz.org', 'kpr.baaz.org']
    },
    trailingSlash: true,
    // /**
    //  * Custom Webpack Config
    //  * we have to remove this config after nextjs handle typing error by itself
    //  * https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    //  */
    // webpack(config, options) {
    //   const { dev, isServer } = options;
   
    //   // Do not run type checking twice:
    //   if (dev && isServer) {
    //     config.plugins.push(new ForkTsCheckerWebpackPlugin());
    //   }
   
    //   return config; 
    // },
  }
}


module.exports = nextConfig