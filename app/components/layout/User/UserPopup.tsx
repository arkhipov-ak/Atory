import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useRef, useState } from 'react'

import { MaterialIcon } from '@/components/ui'

import { clickOutside } from '@/hooks/clickOutside'
import t from '@/hooks/getLang'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import styles from './User.module.scss'

const UserPopup: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)
	const { user } = useAuth()

	const { logout } = useActions()

	clickOutside(menuRef, () => {
		setIsOpen(false)
	})

	return (
		<div className={styles.user} ref={menuRef}>
			<div className={styles.userWrapper} onClick={() => setIsOpen(!isOpen)}>
				<div>
					{user?.poster ? (
						<Image
							src={user.poster}
							width={37}
							height={37}
							draggable={false}
							alt="Avatar"
						/>
					) : (
						<MaterialIcon name="MdPersonOutline" />
					)}
				</div>
				<div>
					<p>{user?.name}</p>
					<span className={isOpen ? styles.active : ''}></span>
				</div>
			</div>
			<div className={cn(styles.popup, { '!hidden': !isOpen })}>
				<Link href={`/profile/${user?._id}`}>
					<p>{t('Profile')}</p>
					<MaterialIcon name="MdPeople" />
				</Link>
				<Link href="/settings">
					<p>{t('Settings')}</p>
					<MaterialIcon name="MdSettings" />
				</Link>
				<div onClick={logout}>
					<p>{t('Logout')}</p>
					<MaterialIcon name="MdLogout" />
				</div>
			</div>
		</div>
	)
}
export default UserPopup
