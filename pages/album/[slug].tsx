import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Album from '@/components/screens/album/Album'

import { IAlbum, ITrack } from '@/shared/types/track.types'

import { AlbumService } from '@/services/album.service'
import { TrackService } from '@/services/track.service'

import Error404 from '../404'

interface IAlbumPage {
	tracks: {
		data: ITrack[]
		totalDuration: number
	}
	album: IAlbum
}

const AlbumPage: NextPage<IAlbumPage> = ({ album, tracks }) => {
	return album ? <Album {...album} {...tracks} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: album } = await AlbumService.getAll()
		const paths = album.map((album) => ({
			params: { slug: album.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch (err) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: album } = await AlbumService.getBySlug(String(params?.slug))

		const { data: tracks } = await TrackService.getByAlbum([album._id])

		return {
			props: {
				album,
				tracks,
			},
			revalidate: 60,
		}
	} catch (err) {
		return {
			notFound: true,
		}
	}
}
export default AlbumPage
