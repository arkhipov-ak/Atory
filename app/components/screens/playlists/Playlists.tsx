import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Empty, Gallery, SkeletonLoader } from '@/components/ui'

import Meta from '@/utils/Meta'

import { usePlaylist } from '../playlist/usePlaylist'

import styles from './Playlist.module.scss'

const Playlists: FC = () => {
	const { queryData } = usePlaylist()
	const { isLoading, data } = queryData
	const { createAsync } = usePlaylist()

	return (
		<Meta>
			<Layout haveGradient="gradientBlue">
				{isLoading || !data ? (
					<SkeletonLoader
						count={12}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : data.length ? (
					<Gallery data={data} title="Playlists" type="playlists" isWrap />
				) : (
					<Empty
						title="Playlists missing"
						subtitle="Create a new playlist."
						handleData={createAsync}
						text="Create playlist"
					/>
				)}
			</Layout>
		</Meta>
	)
}
export default Playlists
