import { useRouter } from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'

import { getActivePlaylist, getActiveTrackIndex } from '@/shared/selectors/selectors'

import PlayerData from './Player'
import styles from './Player.module.scss'
import PlayerControls from './PlayerControls'

const PlayerContainer: FC = () => {
  const { pathname } = useRouter()

  const activeIndex = useSelector(getActiveTrackIndex)
  const tracks = useSelector(getActivePlaylist)
  if (!tracks) return null

  const track = tracks[activeIndex]

  if (pathname === '/login' || pathname === '/signup') {
    return null
  }

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
