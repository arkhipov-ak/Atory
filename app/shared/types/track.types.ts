export interface IPlaylist {
	_id: string
	name: string
	slug: string
	poster: string
	link: string
	author: IAuthor[]
	tracks: ITrack[]
}

export interface IAlbum {
	_id: string
	title: string
	slug: string
	poster: string
	link: string
	author: IAuthor[]
}

export interface IAlbumCreate {
	title: string
	slug: string
	poster: string
	author: IAuthor[]
}

export interface IAuthor {
	name: string
	_id: string
	title: string
	slug: string
	poster: string
	bigPoster: string
	link: string
	countTracks: number
	amountPlays: number
	albums: IAlbum[]
}

export interface IAuthorCreate {
	title: string
	slug: string
	poster: string
}

export interface ITrack {
	_id: string
	poster: string
	title: string
	slug: string
	duration: number
	trackUrl: string
	countPlays: number
	album: IAlbum[]
	author: IAuthor[]
}

export interface ITrackCreate {
	poster: string
	title: string
	duration: number
	trackUrl: string
	album?: IAlbum[]
	author: string[]
}
