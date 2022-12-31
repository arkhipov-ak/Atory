import Head from 'next/head'
import NextProgressBar from 'nextjs-progressbar'
import React, { FC } from 'react'

import Favicons from './FavIcons'

interface IHeadProvider {
	children: React.ReactNode
}

const HeadProvider: FC<IHeadProvider> = ({ children }) => {
	return (
		<>
			<NextProgressBar
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				color="#1090B8"
			/>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=2"
				/>
				<Favicons />
				<meta name="theme-color" content={'#181B1E'} />
				<meta name="msapplication-navbutton-color" content={'#181B1E'} />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={'#181B1E'}
				/>
				<meta name="msapplication-TileColor" content="#1090b8" />
			</Head>
			{children}
		</>
	)
}
export default HeadProvider
