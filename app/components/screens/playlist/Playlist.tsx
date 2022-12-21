import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Catalog, Empty, Header, SkeletonLoader } from '@/components/ui'

import t from '@/hooks/getLang'

import Meta from '@/utils/Meta'

import styles from './Playlist.module.scss'
import { usePlaylist } from './usePlaylist'

const Playlist: FC = () => {
	const { playlist, isLoading } = usePlaylist()

	return (
		<Meta
			title="Listen music online"
			description="Listen to popular music right in your browser"
		>
			<Layout haveGradient="gradientBlue">
				<Header
					subtitle="Open playlist"
					title={playlist?.name || t('Loading...')}
					description={`${
						playlist?.author[0].name
							? playlist?.author[0].name
							: t('Loading...')
					} · 
				${
					playlist && playlist?.tracks.length > 0
						? playlist?.tracks.length + ' ' + t('Tracks')
						: t('Tracks missing')
				}
					`}
					id={playlist?._id}
					poster={playlist?.poster}
					useFunc={usePlaylist}
					isEdit
				/>

				{isLoading || !playlist?.tracks ? (
					<SkeletonLoader
						count={5}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : playlist.tracks.length ? (
					<Catalog tracks={playlist.tracks} playlistId={playlist._id} />
				) : (
					<Empty
						title="There are no tracks in the playlist"
						subtitle="Add a track to the playlist by clicking on the three dots"
						link="/search"
						text="Find tracks"
					/>
				)}
			</Layout>
		</Meta>
	)
}
export default Playlist
