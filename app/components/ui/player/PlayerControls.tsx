import { FC } from 'react'

import { ITrack } from '@/shared/types/track.types'

import { fmtMSS } from '@/utils/string/fmtMSS'

import MaterialIcon from '../MaterialIcon'

import styles from './Player.module.scss'
import usePlayer from './usePlayer'

const PlayerControls: FC<{ tracks: ITrack[] }> = ({ tracks }) => {
	const {
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
	} = usePlayer(tracks)

	const percentageDuration = duration
		? `${(trackProgress / duration) * 100}%`
		: '0%'

	const percentageVolume = duration ? `${trackVolume * 100}%` : '0%'

	const inputStyling = (percentage: string) =>
		`-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${percentage}, #fff), color-stop(${percentage}, #777))`

	return (
		<>
			<div className={styles.control}>
				<div>
					<button onClick={toPrevTrack}>
						<MaterialIcon name="MdSkipPrevious" />
					</button>
					<button onClick={handlePlayAudio}>
						{isPlaying ? (
							<MaterialIcon name="MdPause" />
						) : (
							<MaterialIcon name="MdPlayCircle" />
						)}
					</button>
					<button onClick={toNextTrack}>
						<MaterialIcon name="MdSkipNext" />
					</button>
				</div>
				<div>
					<span>
						{fmtMSS(Number((duration * (trackProgress / duration)).toFixed()))}
					</span>
					<input
						type="range"
						value={trackProgress}
						step="1"
						min="0"
						max={duration ? duration : `${duration}`}
						onChange={(e) => onScrub(+e.target.value)}
						onMouseUp={(e) => onScrubEnd(e)}
						onKeyUp={(e) => onScrubEnd(e)}
						style={{ background: inputStyling(percentageDuration) }}
					/>
					<span>{fmtMSS(duration)}</span>
				</div>
			</div>
			<div className={styles.volume}>
				<div>
					{trackVolume === 0 ? (
						<MaterialIcon name="MdVolumeMute" />
					) : trackVolume <= 0.75 ? (
						<MaterialIcon name="MdVolumeDown" />
					) : (
						trackVolume > 0.75 && <MaterialIcon name="MdVolumeUp" />
					)}
				</div>

				<input
					type="range"
					value={trackVolume}
					step="0.01"
					min="0"
					max="1"
					onChange={(e) => volumeChange(+e.target.value)}
					style={{ background: inputStyling(percentageVolume) }}
				/>
			</div>
		</>
	)
}
export default PlayerControls
