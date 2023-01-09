import { Playlists } from '@/components/screens'

import { NextPageAuth } from '@/shared/types/auth.types'

const PlaylistsPage: NextPageAuth = () => {
	return <Playlists />
}

PlaylistsPage.isOnlyUser = true

export default PlaylistsPage
