import { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui'

import t from '@/hooks/getLang'

import Meta from '@/utils/Meta'

import styles from './404.module.scss'

const Error404: NextPage = () => {
	return (
		<Meta title="Page not found">
			<div className={styles.wrapper}>
				<h1>404</h1>
				<p>{t('Oops! Something wrong…')}</p>
				<p>{t('The page you were looking for does not exist')}</p>
				<Link href="/">
					<Button text="Go home" />
				</Link>
			</div>
		</Meta>
	)
}
export default Error404
