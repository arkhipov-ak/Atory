import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Heading, Logo } from '@/components/ui'

import t from '@/hooks/getLang'
import { useActions } from '@/hooks/useActions'

import Meta from '@/utils/Meta'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const SignUp = () => {
	useAuthRedirect()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		setValue,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})

	setValue('errorText', t('User already exists'))
	setValue('errorTitle', t('Error'))

	const { register } = useActions()

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		register(data)
		reset()
	}

	return (
		<Meta title="SignUp">
			<div className={styles.auth}>
				<Logo isBig />
				<Heading title="Register and listen music for free" />
				<form
					className={styles.authForm}
					autoComplete="off"
					onSubmit={handleSubmit(onSubmit)}
				>
					<AuthFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
						isRegister
					/>
					<button type="submit" aria-label='SignUp'>{t('SignUp')}</button>
					<p>
						{t('Already have an account?')}
						<Link href="/login">{t('Login')}</Link>
					</p>
				</form>
			</div>
		</Meta>
	)
}
export default SignUp
