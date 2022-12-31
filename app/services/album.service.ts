import axios, { axiosClassic } from 'api/interceptors'
import { getAlbumUrl } from 'config/api.config'

import { IAlbum, IAlbumCreate } from '@/shared/types/track.types'

export const AlbumService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IAlbum>(getAlbumUrl(`/by-slug/${slug}`))
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IAlbum[]>(getAlbumUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
	async getMostPopular() {
		return axios.get<IAlbum[]>(getAlbumUrl('/most-popular'))
	},

	async create(data: IAlbumCreate) {
		return axios.post<string>(getAlbumUrl(''), data)
	},
}
