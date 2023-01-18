import { createSlice } from '@reduxjs/toolkit'

import { ITrack } from '@/shared/types/track.types'

import { getStoreLocal } from '@/utils/local-storage'

interface IState {
	activeIndex: number
	activeId: string | null
	isPlaying: boolean
	activePlaylist: ITrack[]
}

const initialState: IState = {
	activeIndex: getStoreLocal('activeTrackIndex'),
	activeId: getStoreLocal('activeTrackId'),
	activePlaylist: getStoreLocal('activePlaylist'),
	isPlaying: false,
}

export const musicSlice = createSlice({
	name: 'music',
	initialState,
	reducers: {
		setActiveIndex: (state, action) => {
			state.activeIndex = action.payload
			localStorage.setItem(
				'activeTrackIndex',
				JSON.stringify(state.activeIndex)
			)
		},
		setActiveId: (state, action) => {
			state.activeId = action.payload
			localStorage.setItem('activeTrackId', JSON.stringify(state.activeId))
		},
		setActivePlaylist: (state, action) => {
			state.activePlaylist = action.payload
			localStorage.setItem(
				'activePlaylist',
				JSON.stringify(state.activePlaylist)
			)
		},
		setIsPlaying: (state, action) => {
			state.isPlaying = action.payload
		},
	},
})

export const { setActiveIndex, setActiveId, setActivePlaylist, setIsPlaying } =
	musicSlice.actions

export default musicSlice.reducer
