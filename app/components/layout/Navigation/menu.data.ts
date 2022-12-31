import { IMenu } from './menu.interface'

export const navMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			title: 'Home',
			icon: 'MdHome',
			link: '/',
		},
		{
			title: 'Search',
			icon: 'MdSearch',
			link: '/search',
		},
		{
			title: 'Favorite',
			icon: 'MdOutlineFavoriteBorder',
			link: '/favorite',
		},
	],
}
