import { getPlaylistsUrl } from 'config/url.config'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Empty, Gallery, Header, SkeletonLoader } from '@/components/ui'

import Meta from '@/utils/Meta'

import { usePlaylist } from '../playlist/usePlaylist'

import styles from './Profile.module.scss'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { profile, isLoading } = useProfile()
	const { createAsync } = usePlaylist()

	return (
		<Meta title="Edit profile" description="Your profile">
			<Layout haveGradient="gradientBlue">
				<Header
					subtitle="Profile"
					title={profile?.name || ''}
					description={`${profile?.playlists.length} open playlists`}
					poster={profile?.poster}
					useFunc={useProfile}
					isEdit
				/>
				{isLoading || !profile?.playlists ? (
					<SkeletonLoader
						count={7}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : profile?.playlists.length ? (
					<Gallery
						title="My playlists"
						data={profile.playlists}
						link={getPlaylistsUrl()}
						type="playlist"
					/>
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
export default Profile
