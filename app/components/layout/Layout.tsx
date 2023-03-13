import cn from 'clsx'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { usePalette } from 'react-palette'

import styles from './Layout.module.scss'
import MenuContainer from './Navigation/MenuContainer/MenuContainer'

interface ILayout {
  children: React.ReactNode
  haveGradient?: string
  showUser?: boolean
  poster?: string
}

const DynamicUser = dynamic(() => import('./User/User'), {
  ssr: false,
})

const Layout: FC<ILayout> = ({ children, haveGradient, poster, showUser = true }) => {
  const color = poster && usePalette(poster)

  const gradient = color && `linear-gradient(transparent, rgb(12, 12, 14)) ${color.data.vibrant}`

  return (
    <div className={styles.layout}>
      <MenuContainer />
      <div className={styles.center}>
        {haveGradient && <div className={cn(styles.gradient, styles[haveGradient])} />}
        {gradient && <div className={styles.gradient} style={{ background: gradient }} />}
        {showUser && (
          <div className={styles.header}>
            <DynamicUser />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Layout
