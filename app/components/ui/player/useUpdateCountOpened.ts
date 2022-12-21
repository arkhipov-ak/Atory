import { useEffect } from 'react'
import { useMutation } from 'react-query'

import { TrackService } from '@/services/track.service'

export const useUpdateCountOpened = async (slug: string) => {
	const { mutateAsync } = useMutation('update count opened', () =>
		TrackService.updateCountOpened(slug)
	)

	useEffect(() => {
		mutateAsync()
	}, [slug])
}
