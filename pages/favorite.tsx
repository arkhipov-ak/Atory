import Favorite from '@/components/screens/favorites/Favorites'

import { NextPageAuth } from '@/shared/types/auth.types'

const FavoritePage: NextPageAuth = () => {
	return <Favorite />
}

FavoritePage.isOnlyUser = true

export default FavoritePage
