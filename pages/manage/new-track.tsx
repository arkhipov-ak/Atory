import NewTrack from '@/components/screens/admin/newTrack/NewTrack'

import { NextPageAuth } from '@/shared/types/auth.types'

const NewTrackPage: NextPageAuth = () => {
	return <NewTrack />
}

NewTrackPage.isOnlyAdmin = true

export default NewTrackPage
