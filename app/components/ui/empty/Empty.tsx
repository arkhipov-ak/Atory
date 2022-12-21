import Link from 'next/link'
import { FC } from 'react'

import t from '@/hooks/getLang'

import styles from './Empty.module.scss'

interface IEmpty {
	title: string
	subtitle: string
	link?: string
	handleData?: () => void
	text?: string
}

const Empty: FC<IEmpty> = ({ title, subtitle, link, handleData, text }) => {
	return (
		<div className={styles.emptyFavorite}>
			<h1>{t(title)}</h1>
			<p>{t(subtitle)}</p>
			{link && text && <Link href={link}>{t(text)}</Link>}
			{handleData && text && <button onClick={handleData}>{t(text)}</button>}
		</div>
	)
}
export default Empty
