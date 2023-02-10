import Link from 'next/link'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Heading, Logo } from '@/components/ui'

import { t } from '@/hooks/getLang'
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
		setValue,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onSubmit',
	})

	const { login } = useActions()

	setValue('errorText', t('Incorrect email address or password entered'))
	setValue('errorTitle', t('Error'))

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
					<Button text="Login" label="Login" />
					<p>
						{t(`Don't have an account?`)}
						<Link href="/signup">{t('SignUp')}</Link>
					</p>
				</form>
			</div>
		</Meta>
	)
}
export default Login
