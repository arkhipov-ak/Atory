import { FC } from 'react'

import { usePlaylist } from '@/components/screens/playlist/usePlaylist'

import styles from '../../Menu.module.scss'

import PlaylistItem from './PlaylistItem'

const PlaylistsMenu: FC = () => {
  const { queryData } = usePlaylist()

  if (!queryData.data?.length) return null

  return (
    <div className={styles.submenu}>
      <ul>
        {queryData.data?.map((playlist, i) => (
          <PlaylistItem key={i} index={i} {...playlist} />
        ))}
      </ul>
    </div>
  )
}
export default PlaylistsMenu
