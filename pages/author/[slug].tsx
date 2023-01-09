import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Author } from '@/components/screens'

import { IAuthor, ITrack } from '@/shared/types/track.types'

import { AuthorService } from '@/services/author.service'
import { TrackService } from '@/services/track.service'

import Error404 from '../404'

interface IAuthorPage {
	tracks: {
		data: ITrack[]
		totalPlays: number
	}
	author: IAuthor
}

const AuthorPage: NextPage<IAuthorPage> = ({ author, tracks }) => {
	return author ? <Author {...author} {...tracks} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: authors } = await AuthorService.getAll()

		const paths = authors.map((author) => ({
			params: { slug: author.slug },
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
		const { data: author } = await AuthorService.getBySlug(String(params?.slug))

		const { data: tracks } = await TrackService.getByAuthor(author._id)

		return {
			props: {
				tracks,
				author,
			},
			revalidate: 60,
		}
	} catch (err) {
		return {
			notFound: true,
		}
	}
}

export default AuthorPage
