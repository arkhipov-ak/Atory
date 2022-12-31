import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'

import {
	IAlbumCreate,
	IAuthorCreate,
	ITrackCreate,
} from '@/shared/types/track.types'

import { AlbumService } from '@/services/album.service'
import { AuthorService } from '@/services/author.service'
import { TrackService } from '@/services/track.service'

import { IData } from './newTrack.interface'

export const useNewTrack = () => {
	const { push } = useRouter()

	const { mutateAsync: mutateAsyncAuthor } = useMutation(
		'create author',
		(data: IAuthorCreate) => AuthorService.create(data)
	)

	const { mutateAsync: mutateAsyncAlbum } = useMutation(
		'create album',
		(data: IAlbumCreate) => AlbumService.create(data)
	)

	const { mutateAsync: mutateAsyncTrack } = useMutation(
		'create track',
		(data: ITrackCreate) => TrackService.create(data),
		{
			onSuccess: () => {
				push('/')
			},
		}
	)

	const { data: authors } = useQuery(
		'get author list',
		() => AuthorService.getAll(),
		{
			select: ({ data }) =>
				data.map((author) => {
					return {
						value: author.title,
						label: author.title,
						id: author._id,
					}
				}),
		}
	)

	const { data: albums } = useQuery(
		'get album list',
		() => AlbumService.getAll(),
		{
			select: ({ data }) =>
				data.map((album) => {
					return {
						value: album.title,
						label: album.title,
						id: album._id,
					}
				}),
		}
	)

	const onSubmit = async (data: IData) => {
		let authorId = null
		let albumId = null

		if (!data.authorId) {
			const { data: authorData }: any = await mutateAsyncAuthor({
				title: data.titleAuthor,
				slug: data.slugAuthor,
				poster: data.posterAuthor,
			})
			authorId = [authorData.author?._id]
		} else authorId = [...data.authorId]

		if (!data.albumId) {
			const { data: albumData }: any = await mutateAsyncAlbum({
				title: data.titleAlbum,
				slug: data.slugAlbum,
				poster: data.posterAlbum,
				author: [...authorId],
			})
			albumId = albumData._id
		} else albumId = data.albumId

		mutateAsyncTrack({
			author: authorId,
			album: [albumId],
			duration: +data.duration,
			poster: data.poster,
			title: data.title,
			trackUrl: data.trackUrl,
		})
	}

	return { onSubmit, authors, albums }
}
