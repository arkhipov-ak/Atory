import dynamic from 'next/dynamic'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Catalog, Empty, SkeletonLoader } from '@/components/ui'

import t from '@/hooks/getLang'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/Meta'

import styles from './Playlist.module.scss'
import { usePlaylist } from './usePlaylist'

const DynamicHeader = dynamic(() => import('@/components/ui/header/Header'), {
	ssr: false,
})

const Playlist: FC = () => {
	const { playlist, isLoading } = usePlaylist()
	const { user } = useAuth()

	return (
		<Meta>
			<Layout haveGradient="gradientBlue">
				<DynamicHeader
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
					isEdit={user?._id === playlist?.author[0]._id}
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
