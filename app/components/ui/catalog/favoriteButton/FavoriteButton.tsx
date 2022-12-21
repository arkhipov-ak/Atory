import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import t from '@/hooks/getLang'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import MaterialIcon from '../../MaterialIcon'

import styles from './FavoriteButton.module.scss'
import useFavorites from './useFavorites'

const FavoriteButton: FC<{ trackId: string }> = ({ trackId }) => {
	const [isFavorite, setIsFavorite] = useState(false)
	const { favoriteTracks, refetch } = useFavorites()

	useEffect(() => {
		if (!favoriteTracks) return

		const isHasTrack = favoriteTracks.some((f) => f._id == trackId)
		if (isFavorite !== isHasTrack) setIsFavorite(isHasTrack)
	}, [favoriteTracks, isFavorite, trackId])

	const { mutateAsync } = useMutation(
		'update favorites',
		() => UserService.toggleFavorite(trackId),
		{
			onError: (error) => {
				toastrError(error, t('Update favorite list'))
			},
			onSuccess() {
				setIsFavorite(!isFavorite)
				refetch()
			},
		}
	)

	return (
		<div className={styles.favoriteWrapper} onClick={() => mutateAsync()}>
			{isFavorite ? (
				<span className={styles.favoriteActive}>
					<MaterialIcon name="MdFavorite" />
				</span>
			) : (
				<span className={styles.favorite}>
					<MaterialIcon name="MdFavoriteBorder" />
				</span>
			)}
		</div>
	)
}
export default FavoriteButton
