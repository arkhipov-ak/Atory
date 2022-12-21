import { IPlaylist } from './track.types'

export interface IUser {
	_id: string
	email: string
	password: string
	poster: string
	name: string
	createdAt: string
	isAdmin: boolean
	playlists: IPlaylist[]
}
