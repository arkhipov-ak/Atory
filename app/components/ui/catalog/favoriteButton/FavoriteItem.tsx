import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import FavoriteButton from './FavoriteButton'

const FavoriteItem: FC<{ trackId: string }> = ({ trackId }) => {
  const { user } = useAuth()

  return <>{user && <FavoriteButton trackId={trackId} />}</>
}
export default FavoriteItem
