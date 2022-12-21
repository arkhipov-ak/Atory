import { FC } from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'

import { Field } from '@/components/ui'

import t from '@/hooks/getLang'

import { validEmail } from '@/shared/regex'

import { IAuthInput } from './auth.interface'

interface IAuthFields {
	register: UseFormRegister<IAuthInput>
	formState: FormState<FieldValues>
	isPasswordRequired?: boolean
	isRegister?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
	isRegister = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: true,
					pattern: {
						value: validEmail,
						message: t('Please enter your email address'),
					},
				})}
				text="Your e-mail address"
				placeholder="Enter your email address"
				error={errors.email}
			/>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: true,
								minLength: {
									value: 6,
									message: t('Min length should more 6 symbols'),
								},
						  }
						: {}
				)}
				text="Create a password"
				placeholder="Enter a password"
				type="password"
				error={errors.password}
			/>
			{isRegister && (
				<Field
					{...register('name', {
						required: true,
					})}
					text="Write your name"
					placeholder="Enter a name"
					error={errors.name}
				/>
			)}
		</>
	)
}

export default AuthFields
