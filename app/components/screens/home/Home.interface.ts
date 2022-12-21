import { IAlbum, IAuthor, ITrack } from '@/shared/types/track.types'

export interface IHome {
	trendingTracks: ITrack[]
	newTracks: ITrack[]
	albums: IAlbum[]
	popularAlbums: IAlbum[]
	authors: IAuthor[]
	slides: IAuthor[]
}
