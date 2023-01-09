import { useMemo } from 'react'
import { useMutation } from 'react-query'

import { usePlaylist } from '@/components/screens/playlist/usePlaylist'

import { t } from '@/hooks/getLang'

import { PlaylistService } from '@/services/playlist.service'

import { toastrError } from '@/utils/toastr-error'

export const useNavigation = (trackId: string) => {
	const errorText = t('Update favorite list')

	const { refetch } = usePlaylist()

	const { mutateAsync } = useMutation(
		'add track to playlist',
		(_id: string) => PlaylistService.updatePlaylistTracks(_id, trackId),
		{
			onError: (error) => {
				toastrError(error, errorText)
			},
			onSuccess() {
				refetch()
			},
		}
	)

	return useMemo(
		() => ({
			mutateAsync,
		}),
		[mutateAsync]
	)
}
