import { Favorites } from '@/components/screens'

import { NextPageAuth } from '@/shared/types/auth.types'

const FavoritePage: NextPageAuth = () => {
	return <Favorites />
}

FavoritePage.isOnlyUser = true

export default FavoritePage
