import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Gallery, SkeletonLoader } from '@/components/ui'

import Meta from '@/utils/Meta'

import { usePlaylist } from '../playlist/usePlaylist'

import styles from './Playlist.module.scss'

const Playlists: FC = () => {
	const { queryData } = usePlaylist()
	const { isLoading, data } = queryData
	return (
		<Meta
			title="Listen music online"
			description="Listen to popular music right in your browser"
		>
			<Layout haveGradient="gradientBlue">
				{isLoading || !data ? (
					<SkeletonLoader
						count={5}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					<Gallery data={data} title="Playlists" type="playlist" isWrap />
				)}
			</Layout>
		</Meta>
	)
}
export default Playlists
