import axios from 'api/interceptors'
import { getPlaylistUrl } from 'config/api.config'

import { IPlaylist } from '@/shared/types/track.types'

export const PlaylistService = {
  async getAll(searchTerm?: string) {
    return axios.get<IPlaylist[]>(getPlaylistUrl(''), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    })
  },

  async create() {
    return axios.post<string>(getPlaylistUrl(''))
  },

  async updatePlaylistTracks(_id: string, trackId: string) {
    return axios.put<string>(getPlaylistUrl(`/tracks-update/${_id}`), {
      trackId: trackId,
    })
  },

  async updatePlaylist(id: string, data: IPlaylist) {
    return axios.put<string>(getPlaylistUrl(`/update/${id}`), data)
  },

  async delete(_id: string) {
    return axios.delete<string>(getPlaylistUrl(`/${_id}`))
  },

  async getById(_id: string) {
    return axios.get<IPlaylist>(getPlaylistUrl(`/${_id}`))
  },
}
