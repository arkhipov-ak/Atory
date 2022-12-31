import axios from 'api/interceptors'
import { getUserUrl } from 'config/api.config'

import { IPlaylist, ITrack } from '@/shared/types/track.types'
import { IUser, IUserUpdate } from '@/shared/types/user.types'

export const UserService = {
	async getFavorites() {
		return axios.get<ITrack[]>(getUserUrl('/profile/favorites'))
	},

	async toggleFavorite(trackId: string) {
		return axios.put<string>(getUserUrl('/profile/favorites'), { trackId })
	},

	async updateProfile(data: IUserUpdate) {
		return axios.put<string>(getUserUrl('/profile'), data)
	},

	async getPlaylists() {
		return axios.get<IPlaylist[]>(getUserUrl('/playlists'))
	},

	async getProfile(id: string) {
		return axios.get<IUser>(getUserUrl(`/profile/${id}`))
	},
}
