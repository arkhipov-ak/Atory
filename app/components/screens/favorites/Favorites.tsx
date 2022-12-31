import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import {
	Catalog,
	Empty,
	Header,
	SkeletonLoader,
	useFavorites,
} from '@/components/ui'

import t from '@/hooks/getLang'
import { useAuth } from '@/hooks/useAuth'

import FavoriteCover from '@/assets/images/favorite.png'

import Meta from '@/utils/Meta'

import styles from './Favorite.module.scss'

const Favorite: FC = () => {
	const { user } = useAuth()

	const { favoriteTracks, isLoading } = useFavorites()

	const tracksT = t('Tracks')
	const tracksMissingT = t('Favorite tracks missing')

	return (
		<Meta>
			<Layout haveGradient="gradientPurple">
				<Header
					subtitle="Playlist"
					title={t('Favorite tracks')}
					poster={FavoriteCover}
					description={`${user?.name} ·  ${
						favoriteTracks &&
						(favoriteTracks.length > 0
							? favoriteTracks.length + ' ' + tracksT
							: tracksMissingT)
					}`}
				/>
				{isLoading ? (
					<SkeletonLoader
						count={5}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					<>
						{!favoriteTracks?.length ? (
							<Empty
								title="Tracks you like will appear here"
								subtitle="Add tracks by clicking on the heart icon."
								link="/search"
								text="Find tracks"
							/>
						) : (
							<Catalog tracks={favoriteTracks} />
						)}
					</>
				)}
			</Layout>
		</Meta>
	)
}
export default Favorite
