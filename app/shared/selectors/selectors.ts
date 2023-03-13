import { RootState } from '@/store/store'

export const getActiveTrackId = (state: RootState) => state.music.activeId
export const getActiveTrackIndex = (state: RootState) => state.music.activeIndex
export const getActivePlaylist = (state: RootState) => state.music.activePlaylist
export const getIsPlayingTrack = (state: RootState) => state.music.isPlaying
