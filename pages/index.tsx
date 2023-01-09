import { getAlbumUrl, getAuthorUrl } from 'config/url.config'
import { GetStaticProps, NextPage } from 'next'

import { Home } from '@/components/screens'
import { IHome } from '@/components/screens/home/Home.interface'

import { AlbumService } from '@/services/album.service'
import { AuthorService } from '@/services/author.service'
import { TrackService } from '@/services/track.service'

const HomePage: NextPage<IHome> = ({
	authors,
	albums,
	popularAlbums,
	newTracks,
	trendingTracks,
	slides,
}) => {
	return (
		<Home
			authors={authors}
			albums={albums}
			popularAlbums={popularAlbums}
			newTracks={newTracks}
			trendingTracks={trendingTracks}
			slides={slides}
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: author } = await AuthorService.getAll()

		const authors = author.slice(0, 8).map((author) => ({
			...author,
			link: getAuthorUrl(author.slug),
		}))

		const slides = authors.slice(0, 3)

		const { data: album } = await AlbumService.getAll()

		const albums = album.slice(0, 8).map((album) => ({
			...album,
			link: getAlbumUrl(album.slug),
		}))

		const { data: popularAlbum } = await AlbumService.getMostPopular()

		const popularAlbums = popularAlbum.slice(0, 8).map((album) => ({
			...album,
			link: getAlbumUrl(album.slug),
		}))

		const dataNewTracks = await TrackService.getNewsTracks()

		const newTracks = dataNewTracks.slice(0, 10)

		const dataTrendingTracks = await TrackService.getPopularTracks()

		const trendingTracks = dataTrendingTracks.slice(0, 15)

		return {
			props: {
				authors,
				albums,
				popularAlbums,
				newTracks,
				trendingTracks,
				slides,
			} as IHome,
			revalidate: 60,
		}
	} catch (err) {
		return {
			props: {
				authors: [],
				albums: [],
				popularAlbums: [],
				newTracks: [],
				trendingTracks: [],
				slides: [],
			},
		}
	}
}

export default HomePage
