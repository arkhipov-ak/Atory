import { IUser } from '@/shared/types/user.types'

export interface IUserState {
	name: string
	poster: string | null
	isAdmin: boolean
	_id: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IAuthUser {
	email: string
	password: string
	name: string
	errorText: string
	errorTitle: string
}

export interface IAuthResponse extends ITokens {
	user: IUser & {
		isAdmin: boolean
	}
}
