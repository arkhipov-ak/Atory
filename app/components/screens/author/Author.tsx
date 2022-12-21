import { useRouter } from 'next/router'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Catalog, Gallery, Header } from '@/components/ui'

import t from '@/hooks/getLang'

import { ITrack } from '@/shared/types/track.types'

import Meta from '@/utils/Meta'

import { useAuthor } from './useAuthor'

interface IAuthorProps {
	title: string
	poster: string
	data: ITrack[]
	totalPlays: number
}

const Author: FC<IAuthorProps> = ({ title, poster, data, totalPlays }) => {
	const { query } = useRouter()

	const { data: albums } = useAuthor(String(query.slug))

	return (
		<Meta
			title="Your favorite artists are here"
			description="Listen to popular music right in your browser"
		>
			<Layout haveGradient="gradientBlue">
				<Header
					subtitle="Performer"
					title={title}
					description={`${totalPlays.toLocaleString()} ${t(
						'Listeners all the time'
					)}`}
					poster={poster}
				/>
				<Catalog title="Trending right now" tracks={data} />
				<Gallery title="Albums" data={albums} type="albums" isWrap />
			</Layout>
		</Meta>
	)
}
export default Author
