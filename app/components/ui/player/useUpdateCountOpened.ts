import { useEffect } from 'react'
import { useMutation } from 'react-query'

import { TrackService } from '@/services/track.service'

export const useUpdateCountOpened = async (_id: string) => {
  const { mutateAsync } = useMutation('update count opened', () =>
    TrackService.updateCountOpened(_id),
  )

  useEffect(() => {
    mutateAsync()
  }, [_id])
}
