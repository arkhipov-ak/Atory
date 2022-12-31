import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from 'api/api.helpers'

import { AuthService } from '@/services/auth/auth.service'

import { toastrErrorT } from '@/utils/toastr-error'

import { IAuthResponse, IAuthUser } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IAuthUser>(
	'auth/register',
	async ({ email, password, name, errorText, errorTitle }, thunkAPI) => {
		try {
			const response = await AuthService.register(email, password, name)
			return response.data
		} catch (error) {
			console.log(errorText, errorTitle)
			toastrErrorT(errorText, errorTitle)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IAuthUser>(
	'auth/login',
	async ({ email, password, errorText, errorTitle }, thunkAPI) => {
		try {
			const response = await AuthService.login(email, password)
			return response.data
		} catch (error) {
			toastrErrorT(errorText, errorTitle)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkAPI) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				thunkAPI.dispatch(logout())
			}
			return thunkAPI.rejectWithValue(error)
		}
	}
)
