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

const DynamicSelect = dynamic(
	() => import('@/components/ui/select/SelectItem'),
	{
		ssr: false,
	}
)

const Settings: FC = () => {
	const options = [
		{ value: 'russian', label: t('Russian'), locale: 'ru' },
		{ value: 'english', label: t('English'), locale: 'en' },
		{ value: 'french', label: t('French'), locale: 'fr' },
		{ value: 'italian', label: t('Italian'), locale: 'it' },
		{ value: 'german', label: t('German'), locale: 'de' },
		{ value: 'ukrainian', label: t('Ukrainian'), locale: 'uk' },
		{ value: 'turkish', label: t('Turkish'), locale: 'tr' },
	]

	const lang = Cookies.get('language')
	const [activeLang, setActiveLang] = useState(
		lang ? JSON.parse(lang) : options[0]
	)

	const { push } = useRouter()
	const { user } = useAuth()

	useEffect(() => {
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
							isTranslate
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
