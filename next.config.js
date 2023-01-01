/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	swcMinify: true,
	env: {
		APP_ENV: process.env.REACT_APP_ENV,
		APP_URL: process.env.REACT_APP_URL,
		APP_SERVER: process.env.REACT_APP_SERVER,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	i18n: {
		locales: ['ru', 'en', 'it', 'fr', 'de', 'uk', 'tr'],
		defaultLocale: 'ru',
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.REACT_APP_SERVER_URL}/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${process.env.REACT_APP_SERVER}/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
