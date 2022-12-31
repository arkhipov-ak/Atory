import Playlists from '@/components/screens/playlists/Playlists'

import { NextPageAuth } from '@/shared/types/auth.types'

const PlaylistsPage: NextPageAuth = () => {
	return <Playlists />
}

PlaylistsPage.isOnlyUser = true

export default PlaylistsPage
