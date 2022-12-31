export interface IActive {
	value: string
	label: string
	id: string
}

export interface IData {
	titleAuthor: string
	titleAlbum: string
	authorId?: string[]
	albumId: string
	slugAuthor: string
	slugAlbum: string
	posterAuthor: string
	posterAlbum: string
	duration: number
	poster: string
	title: string
	trackUrl: string
	name: string
}
