import { FC } from 'react'

import { t } from '@/hooks/getLang'

import styles from './Heading.module.scss'

interface IHeading {
	title: string
}

const Heading: FC<IHeading> = ({ title }) => {
	return <h1 className={styles.title}>{t(title)}</h1>
}
export default Heading
