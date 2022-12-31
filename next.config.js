/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	swcMinify: true,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER,
	},
	i18n: {
		locales: ['ru', 'en', 'it', 'fr', 'de', 'uk', 'tr'],
		defaultLocale: 'ru',
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `https://atorybg-production.up.railway.app/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `https://atorybg-production.up.railway.app/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
