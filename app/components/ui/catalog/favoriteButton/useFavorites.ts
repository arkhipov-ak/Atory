import { useQuery } from 'react-query'

import { useAuth } from '@/hooks/useAuth'

import { UserService } from '@/services/user.service'

const useFavorites = () => {
	const { user } = useAuth()
	const {
		isLoading,
		data: favoriteTracks,
		refetch,
	} = useQuery('favorite tracks', () => UserService.getFavorites(), {
		select: ({ data }) => data,
		enabled: !!user,
	})

	return { isLoading, favoriteTracks, refetch }
}

export default useFavorites
