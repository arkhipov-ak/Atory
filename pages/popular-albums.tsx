import { getAlbumUrl } from 'config/url.config'
import { GetStaticProps, NextPage } from 'next'

import { Albums } from '@/components/screens'

import { IAlbum } from '@/shared/types/track.types'

import { AlbumService } from '@/services/album.service'

interface IAlbumsPage {
	albums: IAlbum[]
}

const AlbumsPage: NextPage<IAlbumsPage> = ({ albums }) => {
	return <Albums albums={albums} title="Most streamed albums" />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: album } = await AlbumService.getMostPopular()

		const albums = album.map((album) => ({
			...album,
			link: getAlbumUrl(album.slug),
		}))

		return {
			props: {
				albums,
			},
			revalidate: 60,
		}
	} catch (err) {
		return {
			props: {
				albums: [],
			},
		}
	}
}

export default AlbumsPage
