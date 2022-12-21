import { FC } from 'react'
import { useSelector } from 'react-redux'

import {
	getActivePlaylist,
	getActiveTrackIndex,
} from '@/shared/selectors/selectors'

import PlayerData from './Player'
import styles from './Player.module.scss'
import PlayerControls from './PlayerControls'

const PlayerContainer: FC = () => {
	const activeIndex = useSelector(getActiveTrackIndex)
	const tracks = useSelector(getActivePlaylist)
	if (!tracks) return null

	const track = tracks[activeIndex]

	return (
		<>
			<div className={styles.plug}></div>
			<div className={styles.playerWrapper}>
				<div className={styles.player}>
					<PlayerData {...track} />
					<PlayerControls tracks={tracks} />
				</div>
			</div>
		</>
	)
}
export default PlayerContainer
