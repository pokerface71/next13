// module.exports = {
// 	debug: process.env.NODE_ENV === 'development',

// 	i18n: {
// 		locales: ['fa', 'en'],
// 		defaultLocale: 'fa',
// 	},
// 	localeDetection:false,
// 	fallbackLng: {
// 		default: ['fa'],
// 	  },
// 	  nonExplicitSupportedLngs: true,
// 	// /** To avoid issues when deploying to some paas (vercel...) */
// 	// localePath:
// 	// typeof window === 'undefined'
// 	// ? require('path').resolve('./public/locales')
// 	// : '/locales',
// 	// nonExplicitSupportedLngs: false,
// 	// reloadOnPrerender: process.env.NODE_ENV === 'development'
// }
module.exports = {
	debug: process.env.NODE_ENV === 'development',

	i18n: {
		locales: ['fa', 'en'],
		defaultLocale: 'fa',
		localeDetection: false,
		fallbackLng: ['fa'],
	},
	defaultLanguage: "fa",
	otherLanguages: ['fa', 'en'],
	reloadOnPrerender: process.env.NODE_ENV === 'development'
}
