import { getAlbumsUrl, getAuthorsUrl } from 'config/url.config'
import dynamic from 'next/dynamic'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import useSearch from '@/components/layout/Search/useSearch'
import { Catalog, Empty, Gallery, SearchField } from '@/components/ui'
import styles from './Search.module.scss'
import Meta from '@/utils/Meta'

const DynamicUser = dynamic(() => import('../../layout/User/User'), {
	ssr: false,
})
const Search: FC = () => {
	const { handleSearch, searchTerm, authors, tracks, albums } = useSearch()

	const isSuccess = tracks.isSuccess && authors.isSuccess && albums.isSuccess
	const isHaveData =
		tracks.data?.length || authors.data?.length || albums.data?.length

	return (
		<Meta
			title="Listen music online"
			description="Listen to popular music right in your browser"
		>
			<Layout showUser={false}>
				<div className={styles.header}>
					<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
					<div>
						<DynamicUser />
					</div>
				</div>

				{isSuccess ? (
					<>
						{tracks.data.length ? (
							<Catalog tracks={tracks.data.slice(0, 15)} title="TracksU" />
						) : (
							<span />
						)}
						{authors.data.length ? (
							<Gallery
								title="Performers"
								data={authors.data}
								type="authors"
								link={getAuthorsUrl()}
							/>
						) : (
							<span />
						)}
						{albums.data.length ? (
							<Gallery
								title="Albums"
								data={albums.data}
								type="albums"
								link={getAlbumsUrl()}
							/>
						) : (
							<span />
						)}
						{!isHaveData && (
							<Empty
								title="Nothing found😞"
								subtitle="Try reformulating your request."
							/>
						)}
					</>
				) : (
					<Empty
						title="Find your favorite tracks"
						subtitle="Find the track you are interested in."
					/>
				)}
			</Layout>
		</Meta>
	)
}
export default Search
