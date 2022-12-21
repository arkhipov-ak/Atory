import { SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { IUser } from '@/shared/types/user.types'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

export const useProfile = (setIsOpen?: (arg: boolean) => void) => {
	const {
		isLoading,
		data: profile,
		refetch,
	} = useQuery('get profile', () => UserService.getProfile(), {
		select: ({ data }) => data,
	})

	const { mutateAsync } = useMutation(
		'update profile',
		(data: IUser) => UserService.updateProfile(data),
		{
			onSuccess() {
				toastr.success('Update profile', 'update was successful')
				refetch()
				setIsOpen && setIsOpen(false)
			},
			onError: (error) => {
				toastrError(error, 'Update profile')
			},
		}
	)

	const onSubmit: SubmitHandler<IUser> = async (data) => {
		await mutateAsync(data)
	}

	return {
		isLoading,
		profile,
		onSubmit,
	}
}
