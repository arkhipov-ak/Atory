import Link from 'next/link'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Heading, Logo } from '@/components/ui'

import t from '@/hooks/getLang'
import { useActions } from '@/hooks/useActions'

import Meta from '@/utils/Meta'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Login: FC = () => {
	useAuthRedirect()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})

	const { login } = useActions()

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		login(data)
		reset()
	}

	return (
		<Meta title="Login">
			<div className={styles.auth}>
				<Logo isBig />
				<Heading title="Login and listen music for free" />
				<form
					className={styles.authForm}
					autoComplete="off"
					onSubmit={handleSubmit(onSubmit)}
				>
					<AuthFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>

					<button type="submit">{t('Login')}</button>
					<p>
						{t(`Don't have an account?`)}{' '}
						<Link href="/signup">{t('SignUp')}</Link>
					</p>
				</form>
			</div>
		</Meta>
	)
}
export default Login
