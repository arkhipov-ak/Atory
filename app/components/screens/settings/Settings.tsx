import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import React from 'react'

import Layout from '@/components/layout/Layout'
import { Heading } from '@/components/ui'

import Meta from '@/utils/Meta'

import styles from './Settings.module.scss'

export const options = [
	{ value: 'russian', label: 'Russian', locale: 'ru' },
	{ value: 'english', label: 'English', locale: 'en' },
]

const DynamicSelect = dynamic(
	() => import('@/components/ui/select/SelectItem'),
	{
		ssr: false,
	}
)

const Settings: FC = () => {
	const lang = Cookies.get('language')
	const [activeLang, setActiveLang] = useState(
		lang ? JSON.parse(lang) : options[0]
	)

	const { push } = useRouter()

	useEffect(() => {
		Cookies.set('language', JSON.stringify(activeLang))

		activeLang && push('/settings', undefined, { locale: activeLang.locale })
	}, [activeLang])

	return (
		<Meta title="Edit settings" description="Your profile">
			<Layout>
				<div className={styles.wrapper}>
					<div>
						<Heading title="Language" />
						<DynamicSelect
							options={options}
							defaultValue={activeLang}
							handleChange={setActiveLang}
							text={'Choose a language.'}
						/>
					</div>
				</div>
			</Layout>
		</Meta>
	)
}

export default Settings
