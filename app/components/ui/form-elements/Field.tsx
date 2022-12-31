import cn from 'clsx'
import { forwardRef } from 'react'

import t from '@/hooks/getLang'

import { IField } from './form.interface'
import styles from './form.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
	({ text, placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={styles.field} style={style}>
				<label>
					<span>{text && t(text)}</span>
					<input
						ref={ref}
						type={type}
						placeholder={t(placeholder)}
						autoComplete="off"
						{...rest}
						className={cn({ [styles.fieldError]: error?.message })}
					/>
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

export default Field
