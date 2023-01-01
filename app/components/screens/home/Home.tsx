import {
	getAlbumsUrl,
	getAuthorsUrl,
	getPopularAlbumsUrl,
} from 'config/url.config'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Catalog, Gallery, Slider } from '@/components/ui'

import Meta from '@/utils/Meta'

import { IHome } from './Home.interface'

const Home: FC<IHome> = ({
	trendingTracks,
	newTracks,
	albums,
	popularAlbums,
	authors,
	slides,
}) => {
	return (
		<Meta>
			<Layout>
				{/* <Slider slides={slides} buttonTitle="Listen now" /> */}
				<Gallery
					title="Most streamed albums"
					data={popularAlbums}
					type="albums"
					link={getPopularAlbumsUrl()}
				/>
				<Catalog title="Trending right now" tracks={trendingTracks} />
				<Gallery
					title="Most popular artists"
					data={authors}
					type="authors"
					link={getAuthorsUrl()}
				/>
				<Catalog title="News tracks" tracks={newTracks} />
				<Gallery
					title="News albums"
					data={albums}
					type="albums"
					link={getAlbumsUrl()}
				/>
			</Layout>
		</Meta>
	)
}
export default Home
