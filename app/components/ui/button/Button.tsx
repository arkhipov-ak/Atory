import { FC } from 'react'

import t from '@/hooks/getLang'

import style from './Button.module.scss'

interface IButton {
	text: string
	onClick?: (arg?: any) => void
	label: string
}

const Button: FC<IButton> = ({ text, onClick, label }) => {
	return (
		<button className={style.button} onClick={onClick} aria-label={label}>
			{t(text)}
		</button>
	)
}
export default Button
