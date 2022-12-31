import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Layout from '@/components/layout/Layout'
import { Button, Field, Heading } from '@/components/ui'

import t from '@/hooks/getLang'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/Meta'

import { IAuthInput } from '../auth/auth.interface'
import { useProfile } from '../profile/useProfile'

import styles from './Settings.module.scss'

const options = [
	{ value: 'russian', label: 'Russian', locale: 'ru' },
	{ value: 'english', label: 'English', locale: 'en' },
	{ value: 'french', label: 'French', locale: 'fr' },
	{ value: 'italian', label: 'Italian', locale: 'it' },
	{ value: 'german', label: 'German', locale: 'de' },
	{ value: 'ukrainian', label: 'Ukrainian', locale: 'uk' },
	{ value: 'turkish', label: 'Turkish', locale: 'tr' },
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
	const { user } = useAuth()

	useEffect(() => {
		console.log(activeLang.locale)
		Cookies.set('language', JSON.stringify(activeLang))

		activeLang && push('/settings', undefined, { locale: activeLang.locale })
	}, [activeLang])

	const {
		register: register,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})

	const { onSubmit: submitData } = useProfile()

	const handleData: SubmitHandler<IAuthInput> = (data) => {
		submitData(data)
		reset()
	}

	return (
		<Meta title="Edit settings" description="Your profile">
			<Layout>
				<div className={styles.wrapper}>
					{user && (
						<div>
							<Heading title="Change password" />
							<form onSubmit={handleSubmit(handleData)} autoComplete="off">
								<Field
									{...register('password', {
										required: true,
										minLength: {
											value: 6,
											message: t('Min length should more 6 symbols'),
										},
									})}
									placeholder="Enter a password"
									type="password"
									error={formState.errors.password}
								/>
								<Button text="Change" />
							</form>
						</div>
					)}
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
