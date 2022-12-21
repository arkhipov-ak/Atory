import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	getActiveTrackId,
	getActiveTrackIndex,
	getIsPlayingTrack,
} from '@/shared/selectors/selectors'
import { ITrack } from '@/shared/types/track.types'

import {
	setActiveId,
	setActiveIndex,
	setIsPlaying,
} from '@/store/music/music.slice'

const usePlayer = (tracks: ITrack[]) => {
	const dispatch = useDispatch()
	const volume = localStorage.getItem('volume')

	const activeIndex = useSelector(getActiveTrackIndex)
	const activeId = useSelector(getActiveTrackId)
	const isPlaying = useSelector(getIsPlayingTrack)
	const { trackUrl, duration } = tracks[activeIndex]

	const [trackProgress, setTrackProgress] = useState(0)
	const [trackVolume, setTrackVolume] = useState(volume ? +volume : 1)

	const audioRef = useRef<HTMLAudioElement>(new Audio(trackUrl))
	const intervalRef = useRef<number>(0)
	const isReady = useRef(false)

	const play = () => audioRef.current.play()

	const pause = () => audioRef.current.pause()

	useEffect(() => {
		return () => {
			pause()
			clearInterval(intervalRef.current)
		}
	}, [])

	useEffect(() => {
		if (isPlaying) {
			play()
			startTimer()
		} else {
			pause()
		}
	}, [isPlaying])

	useEffect(() => {
		pause()
		audioRef.current = new Audio(trackUrl)
		setTrackProgress(audioRef.current.currentTime)
		audioRef.current.volume = trackVolume
		localStorage.setItem('volume', String(audioRef.current.volume))

		if (isReady.current) {
			audioRef.current.paused && play()

			dispatch(setIsPlaying(true))
			startTimer()
		} else {
			isReady.current = true
		}
	}, [activeId, activeIndex])

	useEffect(() => {
		if (isPlaying) {
			play()
			startTimer()
		} else {
			pause()
		}
	}, [])

	const startTimer = () => {
		clearInterval(intervalRef.current)

		intervalRef.current = window.setInterval(() => {
			if (audioRef.current.ended) {
				toNextTrack()
			} else {
				setTrackProgress(audioRef.current.currentTime)
			}
		}, 1000)
	}

	const toNextTrack = () => {
		if (activeIndex < tracks.length - 1) {
			dispatch(setActiveIndex(activeIndex + 1))
			dispatch(setActiveId(tracks[activeIndex + 1]._id))
		} else {
			dispatch(setActiveIndex(0))
			dispatch(setActiveId(tracks[0]._id))
		}
	}

	const toPrevTrack = () => {
		if (activeIndex - 1 < 0) {
			dispatch(setActiveIndex(tracks.length - 1))
			dispatch(setActiveId(tracks[tracks.length - 1]._id))
		} else {
			dispatch(setActiveIndex(activeIndex - 1))
			dispatch(setActiveId(tracks[activeIndex - 1]._id))
		}
	}

	const onScrub = (value: number) => {
		clearInterval(intervalRef.current)
		setTrackProgress(value)
	}

	const volumeChange = (volume: number) => {
		audioRef.current.volume = volume
		localStorage.setItem('volume', String(volume))
		setTrackVolume(volume)
	}

	const onScrubEnd = (e: any) => {
		audioRef.current.currentTime = e.target.value
		if (!isPlaying) {
			setIsPlaying(true)
		}
		startTimer()
	}

	const handlePlayAudio = () => {
		dispatch(setIsPlaying(!isPlaying))
	}

	const value = useMemo(
		() => ({
			toPrevTrack,
			toNextTrack,
			isPlaying,
			duration,
			trackProgress,
			trackVolume,
			onScrub,
			volumeChange,
			onScrubEnd,
			handlePlayAudio,
		}),
		[isPlaying, activeIndex, trackProgress, trackVolume, activeId]
	)

	return value
}

export default usePlayer
