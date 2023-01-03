import cn from 'clsx'
import { Twirl as Hamburger } from 'hamburger-react'
import dynamic from 'next/dynamic'
import { FC, useRef, useState } from 'react'

import { usePlaylist } from '@/components/screens/playlist/usePlaylist'
import { Logo } from '@/components/ui'

import { clickOutside } from '@/hooks/clickOutside'
import { useAuth } from '@/hooks/useAuth'

import styles from '../Menu.module.scss'
import { navMenu } from '../menu.data'

import Playlists from './Playlists/PlaylistsMenu'

const DynamicMenu = dynamic(() => import('../Menu'), {
	ssr: false,
})

const DynamicAuthMenu = dynamic(() => import('./AuthMenu'), {
	ssr: false,
})

const MenuContainer: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)

	const { user } = useAuth()
	const { createAsync } = usePlaylist()

	clickOutside(menuRef, () => {
		setIsOpen(false)
	})

	return (
		<>
			<div
				className={cn(styles.menu, { [styles.active]: isOpen })}
				ref={menuRef}
			>
				<Logo />
				<ul className={styles.ul}>
					<DynamicMenu menu={navMenu} />
					<DynamicAuthMenu handleData={createAsync} />
				</ul>
				{user && <Playlists />}
			</div>
			<div className={styles.wrapper}>
				<Hamburger
					size={22}
					color="#858586"
					toggled={isOpen}
					toggle={setIsOpen}
				/>
			</div>
			<div className={cn(styles.wrapperBg, { [styles.active]: isOpen })} />
		</>
	)
}
export default MenuContainer
