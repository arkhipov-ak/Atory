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
	createdAt: string
}
