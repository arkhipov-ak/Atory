import cn from 'clsx'
import dynamic from 'next/dynamic'
import { FC } from 'react'

import styles from './Layout.module.scss'
import MenuContainer from './Navigation/MenuContainer/MenuContainer'

interface ILayout {
	children: React.ReactNode
	haveGradient?: string
	showUser?: boolean
}

const DynamicUser = dynamic(() => import('./User/User'), {
	ssr: false,
})

const Layout: FC<ILayout> = ({ children, haveGradient, showUser = true }) => {
	return (
		<div className={styles.layout}>
			<MenuContainer />
			<div className={styles.center}>
				{haveGradient && (
					<div className={cn(styles.gradient, styles[haveGradient])}></div>
				)}
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
