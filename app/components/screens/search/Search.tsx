import dynamic from 'next/dynamic'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import useSearch from '@/components/layout/Search/useSearch'
import { Catalog, Empty, Gallery, SearchField } from '@/components/ui'

import Meta from '@/utils/Meta'

import styles from './Search.module.scss'

const DynamicUser = dynamic(() => import('../../layout/User/User'), {
	ssr: false,
})
const Search: FC = () => {
	const { handleSearch, searchTerm, authors, tracks, albums } = useSearch()

	const isSuccess = tracks.isSuccess && authors.isSuccess && albums.isSuccess
	const isHaveData =
		tracks.data?.length || authors.data?.length || albums.data?.length

	return (
		<Meta>
			<Layout showUser={false}>
				<div className={styles.header}>
					<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
					<div>
						<DynamicUser />
					</div>
				</div>
				{isSuccess ? (
					<>
						{tracks.data.length > 0 && (
							<Catalog tracks={tracks.data.slice(0, 15)} title="TracksU" />
						)}
						{authors.data.length > 0 && (
							<Gallery title="Performers" data={authors.data} type="authors" />
						)}
						{albums.data.length > 0 && (
							<Gallery title="Albums" data={albums.data} type="albums" />
						)}
						{!isHaveData && (
							<Empty
								title="Nothing found😞"
								subtitle="The track you are looking for may not be available on our website. Try reformulating your request."
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
