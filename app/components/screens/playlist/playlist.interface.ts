import { IPlaylist } from '@/shared/types/track.types'

export interface IPlaylistEdit extends Omit<IPlaylist, '_id'> {}
