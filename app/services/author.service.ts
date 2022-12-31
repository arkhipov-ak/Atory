import axios, { axiosClassic } from 'api/interceptors'
import { getAuthorUrl } from 'config/api.config'

import { IAuthor, IAuthorCreate } from '@/shared/types/track.types'

export const AuthorService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IAuthor>(getAuthorUrl(`/by-slug/${slug}`))
	},

	async getBySlugAlbums(slug: string) {
		return axiosClassic.get<IAuthor[]>(getAuthorUrl(`/by-slug/albums/${slug}`))
	},

	async create(data: IAuthorCreate) {
		return axios.post<string>(getAuthorUrl(''), data)
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IAuthor[]>(getAuthorUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
}
