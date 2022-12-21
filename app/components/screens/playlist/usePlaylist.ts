import { getPlaylistUrl, getPlaylistsUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import t from '@/hooks/getLang'
import { useAuth } from '@/hooks/useAuth'

import { IPlaylist } from '@/shared/types/track.types'

import { PlaylistService } from '@/services/playlist.service'
import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

export const usePlaylist = (
	setIsOpen?: (arg: boolean) => void,
	id?: string
) => {
	const { query, push } = useRouter()
	const { user } = useAuth()

	const updateSuccessTitle = t('Update playlist')
	const updateSuccess = t('Update was successful')
	const updateError = t('Update profile')
	const queryDataError = t('Get playlist')
	const createError = t('Create playlist')
	const createSuccessTitle = t('Create playlist')
	const createSuccess = t('Create was successfully')

	const queryData = useQuery(
		'playlist list',
		() => UserService.getPlaylists(),
		{
			select: ({ data }) =>
				data.map((playlist) => ({
					...playlist,
					link: getPlaylistUrl(playlist._id),
				})),
			onError: (error) => {
				toastrError(error, queryDataError)
			},
			enabled: !!user,
		}
	)

	const {
		data: playlist,
		isLoading,
		refetch,
	} = useQuery(
		['playlist', query.id],
		() => PlaylistService.getById(String(query?.id)),
		{
			enabled: !!query.id && !!user,
			select: ({ data }) => data,
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		'create playlist',
		() => PlaylistService.create(),
		{
			onError: (error) => {
				toastrError(error, createError)
			},

			onSuccess({ data: _id }) {
				toastr.success(createSuccessTitle, createSuccess)
				push(getPlaylistUrl(`${_id}`))
				queryData.refetch()
			},
		}
	)

	const { mutateAsync } = useMutation(
		'update playlist',
		(data: IPlaylist) => PlaylistService.updatePlaylist(id || '', data),
		{
			onSuccess() {
				toastr.success(updateSuccessTitle, updateSuccess)
				refetch()
				queryData.refetch()
				setIsOpen && setIsOpen(false)
			},
			onError: (error) => {
				toastrError(error, updateError)
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete playlist',
		(playlistId: string) => PlaylistService.delete(playlistId),
		{
			onSuccess: () => {
				push(getPlaylistsUrl())
			},
		}
	)

	const onSubmit: SubmitHandler<IPlaylist> = async (data) => {
		await mutateAsync(data)
	}

	return useMemo(
		() => ({
			createAsync,
			queryData,
			playlist,
			isLoading,
			refetch,
			onSubmit,
			deleteAsync,
		}),
		[createAsync, queryData]
	)
}
