const hoistNonReactStatics = require('hoist-non-react-statics')

module.exports = {
  locales: ["es", "en"],
  defaultLocale: 'en',
  localeDetection: false,
  pages: {
    '*': ["common", "shopping"],
    '/': ['home'],
    '/shoppinglist': ['shopping']
  },
  staticsHoc: hoistNonReactStatics,
}