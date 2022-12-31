import axios, { axiosClassic } from 'api/interceptors'
import { getTrackUrl } from 'config/api.config'

import { ITrack, ITrackCreate } from '@/shared/types/track.types'

export const TrackService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<ITrack[]>(getTrackUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getPopularTracks() {
		const { data: tracks } = await axios.get<ITrack[]>(
			getTrackUrl('/most-popular')
		)
		return tracks
	},

	async getNewsTracks() {
		const { data: tracks } = await axios.get<ITrack[]>(getTrackUrl('/most-new'))
		return tracks
	},

	async getByAuthor(authorId: string) {
		return axiosClassic.get<ITrack[]>(getTrackUrl(`/by-author/${authorId}`))
	},

	async getByAlbum(albumIds: string[]) {
		return axiosClassic.post<ITrack[]>(getTrackUrl(`/by-album`), {
			albumIds,
		})
	},

	async create(data: ITrackCreate) {
		return axios.post<string>(getTrackUrl(''), data)
	},

	async updateCountOpened(_id: string) {
		return axiosClassic.put<string>(getTrackUrl('/update-count-opened'), {
			_id,
		})
	},
}
