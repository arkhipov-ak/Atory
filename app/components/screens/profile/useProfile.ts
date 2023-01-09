import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

import { t } from '@/hooks/getLang'
import { useActions } from '@/hooks/useActions'

import { IUserUpdate } from '@/shared/types/user.types'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

export const useProfile = (setIsOpen?: (arg: boolean) => void) => {
	const updateError = t('Update profile')
	const { query } = useRouter()
	const { checkAuth } = useActions()

	const {
		isLoading,
		data: profile,
		refetch,
	} = useQuery('get profile', () => UserService.getProfile(String(query.id)), {
		select: ({ data }) => data,
		enabled: !!query.id,
	})

	const { mutateAsync } = useMutation(
		'update profile',
		(data: IUserUpdate) => UserService.updateProfile(data),
		{
			onSuccess() {
				refetch()
				checkAuth()
				setIsOpen && setIsOpen(false)
			},
			onError: (error) => {
				toastrError(error, updateError)
			},
		}
	)

	const onSubmit: SubmitHandler<IUserUpdate> = async (data) => {
		await mutateAsync(data)
	}

	return {
		isLoading,
		profile,
		onSubmit,
	}
}
